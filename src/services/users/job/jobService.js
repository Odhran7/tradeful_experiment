// This is the service file for the job
import config from "../../../config/index.js";
import BaseUserService from "../base/baseUserService.js";

class JobService extends BaseUserService {
  constructor(model) {
    super(model);
  }

  // Accept a job
  async acceptJob(jobId, tradespersonId) {
    try {
      return await this.model.findByIdAndUpdate(
        jobId,
        { tradesperson: tradespersonId, jobStatus: "accepted" },
        { new: true }
      );
    } catch (error) {
      throw new Error("Error accepting job (jobService)");
    }
  }

  // Get jobs by tradesperson
  async getJobByTradespersonId(tradespersonId) {
    try {
      return await this.model.find({ tradesperson: tradespersonId });
    } catch (error) {
      throw new Error("Error getting job by tradesperson (jobService)");
    }
  }

  // Get jobs for homeowner
  async getJobsByHomeownerId(homeownerId) {
    try {
      return await this.model.find({ homeowner: homeownerId });
    } catch (error) {
      throw new Error("Error getting job by homeowner (jobService)");
    }
  }

  // Get top x jobs that are pending
  async getTopPendingJobs(x) {
    try {
      return await this.model.find({ jobStatus: "pending" }).limit(x);
    } catch (error) {
      throw new Error("Error getting top pending jobs (jobService)");
    }
  }

  // Get jobs by status type
  async getJobsByStatus(jobStatus) {
    try {
      return await this.model.find({ jobStatus });
    } catch (error) {
      throw new Error("Error getting job by status (jobService)");
    }
  }

  // Get job by service type
  async getJobsByService(serviceNeeded) {
    try {
      return await this.model.find({ serviceNeeded });
    } catch (error) {
      throw new Error("Error getting job by service (jobService)");
    }
  }

  // Update job quote
  async updateJobQuote(jobId, quote) {
    try {
      return await this.model.findByIdAndUpdate(
        jobId,
        { jobQuote: quote },
        { new: true }
      );
    } catch (error) {
      throw new Error("Error updating job quote (jobService)");
    }
  }

  // Update job status
  async updateJobStatus(jobId, status) {
    try {
      return await this.model.findByIdAndUpdate(
        jobId,
        { jobStatus: status },
        { new: true }
      );
    } catch (error) {
      throw new Error("Error updating job status (jobService)");
    }
  }
}

export default JobService;