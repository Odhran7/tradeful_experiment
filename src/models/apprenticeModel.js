// This is the model for the apprentice

import mongoose from "mongoose";

const apprenticeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  emailAddress: {
    type: String,
    required: [true, "Email is required"],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    validation: {
      validator: async function (emailAddress) {
        const count = await this.model("Apprentice").countDocuments({
          emailAddress,
        });
        return count === 0;
      },
    },
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    match: [
      /^\d{10}$/,
      "Please fill a valid phone number with 10 digits. We only accept Irish phone numbers.",
    ],
    validation: {
      validator: async function (phoneNumber) {
        const count = await this.model("Apprentice").countDocuments({
          phoneNumber,
        });
        return count === 0;
      },
    },
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  county: {
    type: String,
    required: [true, "County is required"],
  },
  eircode: {
    type: String,
    required: [true, "Eircode is required"],
  },
  trade: {
    type: String,
    required: [true, "Trade is required"],
  },
  institution: {
    type: String,
    required: [true, "Institution is required"],
  },
  yearOfGraduation: {
    type: String,
    required: [true, "Year of graduation is required"],
  },
});

const apprentice = mongoose.model("Apprentice", apprenticeSchema);

export default apprentice;
