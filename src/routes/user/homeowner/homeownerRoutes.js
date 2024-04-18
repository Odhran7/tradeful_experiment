// These are the routes for the homeowner type user

import { HomeownerController } from "../../../controllers/users/index.js";
import { homeownerService } from "../../../services/users/index.js";
import validateObjectId from "../../../middleware/validateObjectId.js";

/**
 * @swagger
 * tags:
 *   name: Homeowner
 *   description: Homeowner management
 */


// Model def
/**
 * @swagger
 * components:
 *   schemas:
 *     Homeowner:
 *       type: object
 *       required:
 *         - name
 *         - emailAddress
 *         - phoneNumber
 *         - address
 *         - county
 *         - eircode
 *         - serviceRequired
 *       properties:
 *         name:
 *           type: string
 *         emailAddress:
 *           type: string
 *           format: email
 *           description: "Email address of the homeowner"
 *         phoneNumber:
 *           type: string
 *           description: "Phone number of the homeowner"
 *         address:
 *           type: string
 *           description: "Address of the homeowner"
 *         county:
 *           type: string
 *           description: "County where the homeowner resides"
 *         eircode:
 *           type: string
 *           description: "Eircode of the homeowner's address"
 *         serviceRequired:
 *           type: string
 *           description: "Type of service the homeowner requires"
 */

class HomeownerRoutes {
    constructor(router) {
        this.router = router;
        this.homeownerController = new HomeownerController(homeownerService);
        this.setRoutes();
    }

    setRoutes() {
        /**
         * @swagger
         * /api/user/homeowner:
         *   post:
         *     summary: Create a new homeowner
         *     tags: [Homeowner]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - name
         *               - emailAddress
         *               - phoneNumber
         *               - address
         *               - county
         *               - eircode
         *               - serviceRequired
         *             properties:
         *               name:
         *                 type: string
         *               emailAddress:
         *                 type: string
         *               phoneNumber:
         *                 type: string
         *               address:
         *                 type: string
         *               county:
         *                 type: string
         *               eircode:
         *                 type: string
         *               serviceRequired:
         *                 type: string
         *     responses:
         *       201:
         *         description: Homeowner created
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Homeowner'
         *       400:
         *         description: Invalid input data
         */
        this.router.post("/", this.homeownerController.createHomeowner);

        /**
         * @swagger
         * /api/user/homeowner/{id}:
         *   get:
         *     summary: Get a homeowner by ID
         *     tags: [Homeowner]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: The homeowner ID
         *     responses:
         *       200:
         *         description: Homeowner found
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Homeowner'
         *       404:
         *         description: Homeowner not found
         */
        this.router.get("/:id", validateObjectId, this.homeownerController.getHomeownerById);

        /**
         * @swagger
         * /api/user/homeowner/{id}:
         *   put:
         *     summary: Update a homeowner by ID
         *     tags: [Homeowner]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: The homeowner ID
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/Homeowner'
         *     responses:
         *       200:
         *         description: Homeowner updated
         *       400:
         *         description: Invalid input data
         *       404:
         *         description: Homeowner not found
         */
        this.router.put("/:id", validateObjectId, this.homeownerController.updateHomeownerById);

        /**
         * @swagger
         * /api/user/homeowner/{id}:
         *   delete:
         *     summary: Delete a homeowner by ID
         *     tags: [Homeowner]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: The homeowner ID
         *     responses:
         *       200:
         *         description: Homeowner deleted successfully
         *       404:
         *         description: Homeowner not found
         */
        this.router.delete("/:id", validateObjectId, this.homeownerController.deleteHomeownerById);
    }

    getRoutes() {
        return this.router;
    }
}

export default HomeownerRoutes;
