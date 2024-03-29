// These are the routes for the apprentice type user

import { ApprenticeController } from "../../../controllers/users/index.js";
import { apprenticeService } from "../../../services/users/index.js";

/**
 * @swagger
 * tags:
 *   name: Apprentice
 *   description: Apprentice management
 */

// Model def

/**
 * @swagger
 * components:
 *   schemas:
 *     Apprentice:
 *       type: object
 *       required:
 *         - name
 *         - emailAddress
 *         - phoneNumber
 *         - address
 *         - county
 *         - eircode
 *         - trade
 *         - institution
 *         - yearOfGraduation
 *       properties:
 *         name:
 *           type: string
 *         emailAddress:
 *           type: string
 *           format: email
 *         phoneNumber:
 *           type: string
 *         address:
 *           type: string
 *         county:
 *           type: string
 *         eircode:
 *           type: string
 *         trade:
 *           type: string
 *         institution:
 *           type: string
 *         yearOfGraduation:
 *           type: string
 */

class ApprenticeRoutes {
  constructor(router) {
    this.router = router;
    this.apprenticeController = new ApprenticeController(apprenticeService);
    this.setRoutes();
  }

  setRoutes() {
    /**
     * @swagger
     * /api/user/apprentice:
     *   get:
     *     summary: Get all apprentices
     *     tags: [Apprentice]
     *     responses:
     *       200:
     *         description: List of all apprentices
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Apprentice'
     */
    this.router.get("/", this.apprenticeController.getAllApprentices);

    /**
     * @swagger
     * /api/user/apprentice/{id}:
     *   get:
     *     summary: Get a single apprentice by ID
     *     tags: [Apprentice]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The apprentice ID
     *     responses:
     *       200:
     *         description: An apprentice object
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Apprentice'
     *       404:
     *         description: Apprentice not found
     */
    this.router.get("/:id", this.apprenticeController.getApprenticeById);

    /**
     * @swagger
     * /api/user/apprentice:
     *   post:
     *     summary: Create a new apprentice
     *     tags: [Apprentice]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Apprentice'
     *     responses:
     *       201:
     *         description: Apprentice created
     */
    this.router.post("/", this.apprenticeController.createApprentice);

    /**
     * @swagger
     * /api/user/apprentice/{id}:
     *   put:
     *     summary: Update an apprentice by ID
     *     tags: [Apprentice]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The apprentice ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Apprentice'
     *     responses:
     *       200:
     *         description: Apprentice updated
     *       404:
     *         description: Apprentice not found
     */
    this.router.put("/:id", this.apprenticeController.updateApprenticeById);

    /**
     * @swagger
     * /api/user/apprentice/{id}:
     *   delete:
     *     summary: Delete an apprentice by ID
     *     tags: [Apprentice]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The apprentice ID
     *     responses:
     *       200:
     *         description: Apprentice deleted
     *       404:
     *         description: Apprentice not found
     */
    this.router.delete("/:id", this.apprenticeController.deleteApprenticeById);
  }

  getRoutes() {
    return this.router;
  }
}

export default ApprenticeRoutes;
