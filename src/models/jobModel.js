// This is the model for the job schema

import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  homeowner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Homeowner",
    required: [true, "Homeowner is required"],
  },
  tradesperson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tradesperson",
  },
  jobTitle: {
    type: String,
    required: [true, "Job title is required"],
    maxlength: [25, "Job title must be less than 15 characters"],
  },
  jobDescription: {
    type: String,
    required: [true, "Job description is required"],
    maxLength: [500, "Job description must be less than 500 characters"],
  },
  jobCreationDate: {
    type: Date,
    default: Date.now,
  },
  jobStartTime: {
    type: String,
    required: [true, "Job time is required"],
    validation: {
      validator: function (time) {
        const isValidFormat = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
        if (!isValidFormat) {
          return false;
        }
        const [hours, minutes] = time.split(":").map(Number);
        return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
      },
      message: "Invalid time format 0:00 - 23:59",
    },
  },
  jobEndTime: {
    type: String,
    required: [true, "Job time is required"],
    validation: {
      validator: function (time) {
        const isValidFormat = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
        if (!isValidFormat) {
          return false;
        }
        const [hours, minutes] = time.split(":").map(Number);
        return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
      },
      message: "Invalid time format 0:00 - 23:59",
    },
  },
  jobStartDate: {
    type: Date,
    required: [true, "Job start date is required"],
    validation: {
      validator: function (jobStartDate) {
        return (
          new Date(jobStartDate.toDateString()) >=
          new Date(new Date().toDateString())
        );
      },
      message: "Job start date must be in the future",
    },
  },
  jobEndDate: {
    type: Date,
    required: [true, "Job end date is required"],
    validation: {
      validator: function (jobStartDate) {
        return (
          new Date(jobStartDate.toDateString()) >=
          new Date(new Date().toDateString())
        );
      },
      message: "Job end date must be in the future",
    },
  },
  jobLocation: {
    type: String,
    required: [true, "Job location is required"],
  },
  jobStatus: {
    type: String,
    enum: ["pending", "accepted", "completed", "cancelled"],
    default: "pending",
  },
  jobQuote: {
    type: Number,
    required: [true, "Job quote is required"],
  },
  jobUrgency: {
    type: String,
    enum: ["urgent", "semi-urgent", "not urgent"],
    default: "not urgent",
  },
  serviceNeeded: {
    type: String,
    enum: [
      "plumbing",
      "electrical",
      "carpentry",
      "gardening",
      "cleaning",
      "other",
    ],
    default: "other",
    required: [true, "Service needed is required"],
  },
});

const job = mongoose.model("Job", jobSchema);
export default job;
