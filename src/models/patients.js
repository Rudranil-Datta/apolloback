import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const patientSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },

    age: {
      type: Number,
      required: true,
      min: 0,
      max: 120
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true
    },

    phone: {
      type: String,
      required: true,
      unique: true
    },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true
    },

    address: {
      type: String,
      trim: true
    },

    emergencyContacts: [
      {
        name: { type: String, required: true },
        relation: { type: String },
        phone: { type: String, required: true }
      }
    ],

    medicalHistory: {
      diabetes: { type: Boolean, default: false },
      asthma: { type: Boolean, default: false },
      heartDisease: { type: Boolean, default: false },
      allergies: { type: String }
    },

    lastKnownLocation: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  { timestamps: true }
);

patientSchema.pre('save', function (next) {
  
    if (!this.isModified("password")) return next();

    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        user.password = hash;
        console.log(user)
        next();
    });
});

patientSchema.methods.isPasswordCorrect = async function (enteredPassword) {
    const user = this;
    return await bcrypt.compare(enteredPassword, user.password);
}

patientSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            userId: this._id
        },
        process.env.REFRESH_TOKEN_KEY
        ,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        });
}

patientSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            userId: this._id,
            email: this.email,
            username: this.username,
            name: this.name
        },
        process.env.ACCESS_TOKEN_KEY
        ,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        });
}


const patients = mongoose.model("patients", patientSchema);
export default patients;
