import mongoose from "mongoose";

const vitalsSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patients",
      required: true,
      index: true
    },

    recordedBy: {
      type: String,
      enum: ["manual", "wearable", "device", "doctor"],
      default: "manual"
    },

    heartRate: {
      type: Number,
      required: true,
      min: 30,
      max: 220
    },

    bloodPressure: {
      systolic: {
        type: Number,
        required: true,
        min: 70,
        max: 250
      },
      diastolic: {
        type: Number,
        required: true,
        min: 40,
        max: 150
      }
    },

    spo2: {
      type: Number,
      required: true,
      min: 50,
      max: 100
    },

    respiratoryRate: {
      type: Number,
      min: 5,
      max: 60
    },

    bodyTemperature: {
      type: Number,
      min: 30,
      max: 45
    },

    bloodSugar: {
      type: Number
    },

    bmi: {
      type: Number
    },

    sleepHours: {
      type: Number,
      min: 0,
      max: 24
    },

    physicalActivity: {
      steps: {
        type: Number
      },
      caloriesBurned: {
        type: Number
      }
    },

    medicationTaken: {
      type: Boolean,
      default: true
    },

    symptoms: {
      chestPain: { type: Boolean, default: false },
      dizziness: { type: Boolean, default: false },
      fatigue: { type: Boolean, default: false },
      shortnessOfBreath: { type: Boolean, default: false }
    },

    location: {
      lat: Number,
      lng: Number
    },

    deviceInfo: {
      deviceType: String,
      manufacturer: String
    },

    recordedAt: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  { timestamps: true }
);

const Vitals = mongoose.model("Vitals", vitalsSchema);

export default Vitals;