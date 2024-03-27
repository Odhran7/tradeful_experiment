// This is the model for the homeowner

import mongoose from "mongoose";

const homeownerSchema = new mongoose.Schema({
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
        const count = await this.model("Homeowner").countDocuments;
        return count === 0;
      },
      message: "Email already exists in the database",
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
        const count = await this.model("Homeowner").countDocuments;
        return count === 0;
      },
      message: "Phone number already exists in the database",
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
    length: [6, "Eircode must be 6 characters long"],
  },
  serviceRequired: {
    type: String,
    required: [true, "Service required is required"],
  },
});

const homeowner = mongoose.model("Homeowner", homeownerSchema);

export default homeowner;
