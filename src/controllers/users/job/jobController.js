// This is the controller file for the job model

class JobController {
  constructor(jobService, tradespersonService, homeownerService) {
    this.jobService = jobService;
    this.tradespersonService = tradespersonService;
    this.homeownerService = homeownerService;
  }

  // Creates a job
  createJob = async (req, res, next) => {
    try {
      const homeownerId = req.body.homeowner;
      const homeowner = await this.homeownerService.getById(homeownerId);
      if (!homeowner)
        return res.status(404).json({ error: "Homeowner not found" });
      const validationErrors = this.validateJobData(req.body);
      if (validationErrors.length > 0)
        return res.status(400).json({ errors: validationErrors });
      const job = await this.jobService.create(req.body);
      return res.status(201).json(job);
    } catch (error) {
      next(error);
    }
  };

  // Get a job by id
  getJobById = async (req, res, next) => {
    try {
      const job = await this.jobService.getById(req.params.id);
      if (!job) return res.status(404).json({ error: "Job not found" });
      return res.status(200).json(job);
    } catch (error) {
      next(error);
    }
  };

  // Update a job
  updateJobById = async (req, res, next) => {
    try {
      const oldJob = await this.jobService.getById(req.params.id);
      if (!oldJob) return res.status(404).json({ error: "Job not found" });
      const updatedData = { ...oldJob.toObject(), ...req.body };
      console.log(updatedData);
      const validationErrors = this.validateJobData(updatedData, true);
      if (validationErrors.length > 0)
        return res.status(400).json({ errors: validationErrors });
      const job = await this.jobService.updateById(req.params.id, updatedData);
      if (!job) return res.status(404).json({ error: "Job not found" });
      return res.status(200).json(job);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  // Delete a job
  deleteJobById = async (req, res, next) => {
    try {
      const job = await this.jobService.getById(req.params.id);
      if (!job) return res.status(404).json({ error: "Job not found" });
      const deletedJob = await this.jobService.deleteById(req.params.id);
      return res
        .status(200)
        .json({ message: "Job deleted successfully", job: deletedJob });
    } catch (error) {
      next(error);
    }
  };

  // Accept a job
  acceptJob = async (req, res, next) => {
    try {
      const job = await this.jobService.getById(req.params.id);
      if (!job) return res.status(404).json({ error: "Job not found" });
      const tradesperson = await this.tradespersonService.getById(
        req.body.tradespersonId
      );
      if (!tradesperson)
        return res.status(404).json({ error: "Tradesperson not found" });
      const acceptedJob = await this.jobService.acceptJob(
        req.params.id,
        req.body.tradespersonId
      );
      return res.status(200).json(acceptedJob);
    } catch (error) {
      next(error);
    }
  };
  // Get jobs by tradesperson
  getJobsByTradespersonId = async (req, res, next) => {
    try {
      const tradesperson = await this.tradespersonService.getById(
        req.params.id
      );
      if (!tradesperson)
        return res.status(404).json({ error: "Tradesperson not found" });
      const jobs = await this.jobService.getJobByTradespersonId(req.params.id);
      return res.status(200).json(jobs);
    } catch (error) {
      next(error);
    }
  };
  // Get jobs for homeowner
  getJobsByHomeownerId = async (req, res, next) => {
    try {
      const homeowner = await this.homeownerService.getById(req.params.id);
      if (!homeowner)
        return res.status(404).json({ error: "Homeowner not found" });
      const jobs = await this.jobService.getJobsByHomeownerId(req.params.id);
      return res.status(200).json(jobs);
    } catch (error) {
      next(error);
    }
  };
  // Get top x jobs that are pending
  getTopPendingJobs = async (req, res, next) => {
    try {
      const jobs = await this.jobService.getTopPendingJobs(req.params.x);
      if (!jobs) return res.status(404).json({ error: "Jobs not found" });
      return res.status(200).json(jobs);
    } catch (error) {
      next(error);
    }
  };
  // Get jobs by status type
  getJobsByStatus = async (req, res, next) => {
    try {
      const jobs = await this.jobService.getJobsByStatus(req.params.jobStatus);
      if (!jobs) return res.status(404).json({ error: "Jobs not found" });
      return res.status(200).json(jobs);
    } catch (error) {
      next(error);
    }
  };
  // Get job by service type
  getJobsByService = async (req, res, next) => {
    try {
      const jobs = await this.jobService.getJobsByService(
        req.params.serviceNeeded
      );
      if (!jobs) return res.status(404).json({ error: "Jobs not found" });
      return res.status(200).json(jobs);
    } catch (error) {
      next(error);
    }
  };
  // Update job quote
  updateJobQuote = async (req, res, next) => {
    try {
      const job = await this.jobService.getById(req.params.id);
      if (!job) return res.status(404).json({ error: "Job not found" });
      const updatedJob = await this.jobService.updateJobQuote(
        req.params.id,
        req.body.jobQuote
      );
      return res.status(200).json(updatedJob);
    } catch (error) {
      next(error);
    }
  };

  // Get jobs by urgency
  getJobsByUrgency = async (req, res, next) => {
    try {
      const jobs = await this.jobService.getJobsByUrgency(req.params.urgency);
      if (!jobs) return res.status(404).json({ error: "Jobs not found" });
      return res.status(200).json(jobs);
    } catch (error) {
      next(error);
    }
  };

  // Get all jobs
  getAllJobs = async (req, res, next) => {
    try {
      const jobs = await this.jobService.getAll();
      if (!jobs) return res.status(404).json({ error: "Jobs not found" });
      return res.status(200).json(jobs);
    } catch (error) {
      next(error);
    }
  };

  // Validate job data
  validateJobData = (jobData, isMongoDoc = false) => {
    const errors = [];
    const checkString = (value, field, maxLength) => {
      if (!value || typeof value !== "string")
        errors.push(`${field} is required and must be a string`);
      else if (maxLength && value.length > maxLength)
        errors.push(`${field} must be less than ${maxLength} characters`);
    };
    if (!isMongoDoc) {
      checkString(jobData.homeowner, "Homeowner");
      checkString(jobData.jobTitle, "Job title", 25);
      checkString(jobData.jobDescription, "Job description", 500);
      checkString(jobData.jobLocation, "Job location");
    }

    const checkTimeFormat = (time, field) => {
      if (!time || typeof time !== "string")
        errors.push(`${field} is required and must be a string`);
      else if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time))
        errors.push(`Invalid ${field} format 0:00 - 23:59`);
    };

    const checkTime = (startTime, endTime) => {
      if (startTime && endTime) {
        const [startHour, startMinute] = startTime.split(":");
        const [endHour, endMinute] = endTime.split(":");
        if (startHour > endHour)
          errors.push("End time must be greater than start time");
        else if (startHour === endHour && startMinute >= endMinute)
          errors.push("End time must be greater than start time");
      }
    };

    checkTimeFormat(jobData.jobStartTime, "start time");
    checkTimeFormat(jobData.jobEndTime, "end time");
    checkTime(jobData.jobStartTime, jobData.jobEndTime);

    const checkDateFormat = (date, field) => {
      if (!date || typeof date !== "string")
        errors.push(`${field} is required and must be a date`);
      else if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(date))
        errors.push(`Invalid ${field} format yyyy-mm-dd`);
    };

    const checkDate = (startDate, endDate, errors, isMongoDoc = false) => {
      const formatDate = (date) => {
        if (date instanceof Date) {
          return date.toISOString().split("T")[0];
        }
        return date;
      };

      if (startDate && endDate) {
        startDate = formatDate(startDate);
        endDate = formatDate(endDate);

        let startYear, startMonth, startDay, endYear, endMonth, endDay;
        [startYear, startMonth, startDay] = startDate.split("-");
        [endYear, endMonth, endDay] = endDate.split("-");

        const start = new Date(startYear, startMonth - 1, startDay);
        const end = new Date(endYear, endMonth - 1, endDay);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (start < today) errors.push("Start date must be in the future.");
        if (end < today) errors.push("End date must be in the future.");
        if (start > end)
          errors.push("End date must be greater than start date.");
      } else {
        errors.push("Both start and end dates are required.");
      }
    };
    if (!isMongoDoc) {
      checkDateFormat(jobData.jobStartDate, "start date");
      checkDateFormat(jobData.jobEndDate, "end date");
    }

    checkDate(jobData.jobStartDate, jobData.jobEndDate, errors);

    if (jobData.jobQuote == null || !Number.isInteger(jobData.jobQuote))
      errors.push("Job quote is required and must be an integer");
    if (jobData.jobQuote < 0)
      errors.push("Job quote must be a positive number");

    const checkEnum = (value, validValues, field) => {
      if (!value || typeof value !== "string")
        errors.push(`${field} is required and must be a string`);
      else if (!validValues.includes(value))
        errors.push(
          `Invalid ${field}. Must be either ${validValues.join(", ")}`
        );
    };

    checkEnum(
      jobData.jobStatus,
      ["pending", "accepted", "completed", "cancelled"],
      "job status"
    );
    checkEnum(
      jobData.jobUrgency,
      ["not urgent", "semi-urgent", "urgent"],
      "job urgency"
    );
    checkEnum(
      jobData.serviceNeeded,
      ["plumbing", "electrical", "carpentry", "gardening", "cleaning", "other"],
      "service needed"
    );

    return errors;
  };
}

export default JobController;
