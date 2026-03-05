import mongoose from "mongoose";

const riskLogSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patients",
      required: true,
      index: true
    },

    vitalsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vitals",
      required: true
    },

    modelUsed: {
      type: String,
      enum: ["logistic_regression", "random_forest", "lstm"],
      default: "random_forest"
    },

    riskScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },

    emergencyProbability: {
      type: Number,
      required: true,
      min: 0,
      max: 1
    },

    confidenceScore: {
      type: Number,
      min: 0,
      max: 1
    },

    anomalyDetected: {
      type: Boolean,
      default: false
    },

    severityLevel: {
      type: String,
      enum: ["Low", "Moderate", "High", "Critical"],
      default: "Low"
    },

    predictedEventWindow: {
      type: String,
      enum: ["12h", "24h", "48h", "7d"],
      default: "24h"
    },

    vitalsSnapshot: {
      heartRate: Number,
      systolicBP: Number,
      diastolicBP: Number,
      spo2: Number,
      bloodSugar: Number,
      bodyTemperature: Number,
      respiratoryRate: Number
    },

    notes: {
      type: String
    },

    predictionTimestamp: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

riskLogSchema.index({ patientId: 1, predictionTimestamp: -1 });

riskLogSchema.pre("save", function (next) {
  if (this.riskScore >= 85) this.severityLevel = "Critical";
  else if (this.riskScore >= 70) this.severityLevel = "High";
  else if (this.riskScore >= 40) this.severityLevel = "Moderate";
  else this.severityLevel = "Low";

  next();
});

riskLogSchema.statics.calculateSeverity = function (riskScore) {
  if (riskScore >= 85) return "Critical";
  if (riskScore >= 70) return "High";
  if (riskScore >= 40) return "Moderate";
  return "Low";
};

riskLogSchema.statics.getLatestRisk = async function (patientId) {
  return await this.findOne({ patientId }).sort({ predictionTimestamp: -1 });
};

riskLogSchema.statics.getRiskHistory = async function (patientId, limit = 30) {
  return await this.find({ patientId })
    .sort({ predictionTimestamp: -1 })
    .limit(limit);
};

const RiskLog = mongoose.model("RiskLog", riskLogSchema);

export default RiskLog;