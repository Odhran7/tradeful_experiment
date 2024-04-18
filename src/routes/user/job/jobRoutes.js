// These are the routes for the job

import { JobController } from "../../../controllers/users/index.js";
import {
  jobService,
  tradespersonService,
  homeownerService,
} from "../../../services/users/index.js";
import validateObjectId from "../../../middleware/validateObjectId.js";

/**
 * @swagger
 * tags:
 *   name: Job
 *   description: Job management
 */

// Model def
/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - homeowner
 *         - jobTitle
 *         - jobDescription
 *         - jobCreationDate
 *         - jobStartTime
 *         - jobEndTime
 *         - jobStartDate
 *         - jobEndDate
 *         - jobLocation
 *         - jobStatus
 *         - jobQuote
 *         - jobUrgency
 *         - serviceNeeded
 *       properties:
 *         homeowner:
 *           type: string
 *           format: uuid
 *           description: "Reference ID to the homeowner"
 *         tradesperson:
 *           type: string
 *           format: uuid
 *           description: "Reference ID to the tradesperson (optional)"
 *         jobTitle:
 *           type: string
 *           maxLength: 15
 *           description: "Title of the job"
 *         jobDescription:
 *           type: string
 *           maxLength: 500
 *           description: "Detailed description of the job"
 *         jobCreationDate:
 *           type: string
 *           format: date-time
 *           description: "Timestamp when the job was created"
 *         jobStartTime:
 *           type: string
 *           pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9]$"
 *           description: "Start time of the job in HH:MM format"
 *         jobEndTime:
 *           type: string
 *           pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9]$"
 *           description: "End time of the job in HH:MM format"
 *         jobStartDate:
 *           type: string
 *           format: date
 *           description: "Start date of the job"
 *         jobEndDate:
 *           type: string
 *           format: date
 *           description: "End date of the job"
 *         jobLocation:
 *           type: string
 *           description: "Location of the job"
 *         jobStatus:
 *           type: string
 *           enum: [pending, accepted, completed, cancelled]
 *           description: "Current status of the job"
 *         jobQuote:
 *           type: number
 *           description: "Financial quote for the job"
 *         jobUrgency:
 *           type: string
 *           enum: [urgent, semi-urgent, not urgent]
 *           description: "Urgency level of the job"
 *         serviceNeeded:
 *           type: string
 *           enum: [plumbing, electrical, carpentry, gardening, cleaning, other]
 *           description: "Type of service required for the job"
 */

class JobRoutes {
  constructor(router) {
    this.router = router;
    this.JobController = new JobController(
      jobService,
      tradespersonService,
      homeownerService
    );
    this.setRoutes();
  }

  setRoutes() {
    /**
     * @swagger
     * /api/user/jobs/:
     *   get:
     *     summary: Retrieve all jobs
     *     tags: [Jobs]
     *     responses:
     *       200:
     *         description: List of all jobs
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Job'
     *       404:
     *         description: No jobs found
     */
    this.router.get("/", this.JobController.getAllJobs);
    /**
     * @swagger
     * /api/user/jobs/{id}:
     *   get:
     *     summary: Retrieve a job by its ID
     *     tags: [Jobs]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Unique ID of the job to retrieve
     *     responses:
     *       200:
     *         description: Details of the job
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Job'
     *       404:
     *         description: Job not found
     */
    this.router.get("/:id", validateObjectId, this.JobController.getJobById);
    /**
     * @swagger
     * /api/user/jobs/:
     *   post:
     *     summary: Create a new job
     *     tags: [Jobs]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Job'
     *           example:
     *             homeowner: "5f2b18a30485ac761a77a3be"
     *             jobTitle: "Fix leaking pipe"
     *             jobDescription: "Leaking pipe in the kitchen needs to be fixed."
     *             jobStartTime: "09:00"
     *             jobEndTime: "11:00"
     *             jobStartDate: "2024-04-20"
     *             jobEndDate: "2024-06-20"
     *             jobLocation: "123 Maple Street"
     *             jobStatus: "pending"
     *             jobQuote: 200
     *             jobUrgency: "urgent"
     *             serviceNeeded: "plumbing"
     *     responses:
     *       201:
     *         description: Job created successfully
     *       400:
     *         description: Validation error with input data
     */
    this.router.post("/", this.JobController.createJob);
    /**
     * @swagger
     * /api/user/jobs/{id}:
     *   put:
     *     summary: Update a job by its ID
     *     tags: [Jobs]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Unique ID of the job to update
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Job'
     *           example:
     *             jobDescription: "Extended work required on the pipe."
     *             jobEndTime: "14:00"
     *             jobQuote: 250
     *     responses:
     *       200:
     *         description: Job updated successfully
     *       400:
     *         description: Validation error with input data
     *       404:
     *         description: Job not found
     */
    this.router.put("/:id", validateObjectId, this.JobController.updateJobById);
    /**
     * @swagger
     * /api/user/jobs/{id}:
     *   delete:
     *     summary: Delete a job by its ID
     *     tags: [Jobs]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Unique ID of the job to delete
     *     responses:
     *       200:
     *         description: Job deleted successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Job deleted successfully"
     *       404:
     *         description: Job not found
     */
    this.router.delete(
      "/:id",
      validateObjectId,
      this.JobController.deleteJobById
    );
    /**
     * @swagger
     * /api/user/jobs/homeowner/{id}:
     *   get:
     *     summary: Retrieve all jobs by a homeowner's ID
     *     tags: [Jobs]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Unique ID of the homeowner to retrieve jobs for
     *     responses:
     *       200:
     *         description: List of jobs for the homeowner retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Job'
     *       404:
     *         description: Homeowner not found or no jobs found for this homeowner
     */
    this.router.get(
      "/homeowner/:id",
      validateObjectId,
      this.JobController.getJobsByHomeownerId
    );

    /**
     * @swagger
     * /api/user/jobs/tradesperson/{id}:
     *   get:
     *     summary: Retrieve all jobs by a tradesperson's ID
     *     tags: [Jobs]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Unique ID of the tradesperson to retrieve jobs for
     *     responses:
     *       200:
     *         description: List of jobs for the tradesperson retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Job'
     *       404:
     *         description: Tradesperson not found or no jobs found for this tradesperson
     */
    this.router.get(
      "/tradesperson/:id",
      validateObjectId,
      this.JobController.getJobsByTradespersonId
    );
    /**
     * @swagger
     * /api/user/jobs/status/{status}:
     *   get:
     *     summary: Retrieve jobs by status
     *     tags: [Jobs]
     *     parameters:
     *       - in: path
     *         name: status
     *         required: true
     *         schema:
     *           type: string
     *           enum: [pending, accepted, completed, cancelled]
     *         description: Status of the jobs to retrieve
     *     responses:
     *       200:
     *         description: List of jobs filtered by status retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Job'
     *       404:
     *         description: No jobs found for this status
     */
    this.router.get("/status/:status", this.JobController.getJobsByStatus);
    /**
     * @swagger
     * /api/user/jobs/service/{service}:
     *   get:
     *     summary: Retrieve jobs by service type
     *     tags: [Jobs]
     *     parameters:
     *       - in: path
     *         name: service
     *         required: true
     *         schema:
     *           type: string
     *           enum: [plumbing, electrical, carpentry, gardening, cleaning, other]
     *         description: Type of service to filter jobs
     *     responses:
     *       200:
     *         description: List of jobs filtered by service type retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Job'
     *       404:
     *         description: No jobs found for this service type
     */
    this.router.get("/service/:service", this.JobController.getJobsByService);
    /**
     * @swagger
     * /api/user/jobs/urgency/{urgency}:
     *   get:
     *     summary: Retrieve jobs by urgency level
     *     tags: [Jobs]
     *     parameters:
     *       - in: path
     *         name: urgency
     *         required: true
     *         schema:
     *           type: string
     *           enum: [urgent, semi-urgent, not urgent]
     *         description: Urgency level of the jobs to retrieve
     *     responses:
     *       200:
     *         description: List of jobs filtered by urgency level retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Job'
     *       404:
     *         description: No jobs found for this urgency level
     */
    this.router.get("/urgency/:urgency", this.JobController.getJobsByUrgency);
    /**
     * @swagger
     * /api/user/jobs/quote/{id}:
     *   put:
     *     summary: Update the quote of a job by its ID
     *     tags: [Jobs]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Unique ID of the job to update the quote
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               jobQuote:
     *                 type: number
     *                 description: New quote amount for the job
     *     responses:
     *       200:
     *         description: Job quote updated successfully
     *       404:
     *         description: Job not found
     */
    this.router.put(
      "/quote/:id",
      validateObjectId,
      this.JobController.updateJobQuote
    );
    /**
     * @swagger
     * /api/user/jobs/accept/{id}:
     *   put:
     *     summary: Accept a job by its ID
     *     tags: [Jobs]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Unique ID of the job to accept
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               tradespersonId:
     *                 type: string
     *                 format: uuid
     *                 description: ID of the tradesperson accepting the job
     *     responses:
     *       200:
     *         description: Job accepted successfully
     *       404:
     *         description: Job or tradesperson not found
     */
    this.router.put(
      "/accept/:id",
      validateObjectId,
      this.JobController.acceptJob
    );
  }

  getRoutes() {
    return this.router;
  }
}

export default JobRoutes;
