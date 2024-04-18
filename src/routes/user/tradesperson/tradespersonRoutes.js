// These are the routes for the tradesperson type user

import { TradespersonController } from "../../../controllers/users/index.js";
import { tradespersonService } from "../../../services/users/index.js";
import validateObjectId
 from "../../../middleware/validateObjectId.js";
/**
 * @swagger
 * tags:
 *   name: Tradesperson
 *   description: Management of tradespeople
 */

// Model def
/**
 * @swagger
 * components:
 *   schemas:
 *     Tradesperson:
 *       type: object
 *       required:
 *         - name
 *         - emailAddress
 *         - phoneNumber
 *         - address
 *         - county
 *         - eircode
 *         - trade
 *       properties:
 *         name:
 *           type: string
 *         emailAddress:
 *           type: string
 *           format: email
 *           description: "Email address of the tradesperson"
 *         phoneNumber:
 *           type: string
 *           description: "Phone number of the tradesperson"
 *         address:
 *           type: string
 *           description: "Address of the tradesperson"
 *         county:
 *           type: string
 *           description: "County where the tradesperson resides"
 *         eircode:
 *           type: string
 *           description: "Eircode of the tradesperson's address"
 *         trade:
 *           type: string
 *           description: "Trade specialization of the tradesperson"
 */

class TradespersonRoutes {
    constructor(router) {
        this.router = router;
        this.tradespersonController = new TradespersonController(tradespersonService);
        this.setRoutes();
    }

    setRoutes() {
        /**
         * @swagger
         * /api/user/tradesperson:
         *   post:
         *     summary: Create a new tradesperson
         *     tags: [Tradesperson]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/Tradesperson'
         *     responses:
         *       201:
         *         description: Tradesperson created successfully
         *       400:
         *         description: Validation error
         */
        this.router.post('/', this.tradespersonController.createTradesperson);

        /**
         * @swagger
         * /api/user/tradesperson/{id}:
         *   get:
         *     summary: Get a tradesperson by their ID
         *     tags: [Tradesperson]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: Tradesperson retrieved successfully
         *       404:
         *         description: Tradesperson not found
         */
        this.router.get('/:id', validateObjectId, this.tradespersonController.getTradespersonById);

        /**
         * @swagger
         * /api/user/tradesperson/{id}:
         *   put:
         *     summary: Update a tradesperson by their ID
         *     tags: [Tradesperson]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/Tradesperson'
         *     responses:
         *       200:
         *         description: Tradesperson updated successfully
         *       400:
         *         description: Validation error
         *       404:
         *         description: Tradesperson not found
         */
        this.router.put('/:id',validateObjectId, this.tradespersonController.updateTradespersonById);

        /**
         * @swagger
         * /api/user/tradesperson/{id}:
         *   delete:
         *     summary: Delete a tradesperson by their ID
         *     tags: [Tradesperson]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: Tradesperson deleted successfully
         *       404:
         *         description: Tradesperson not found
         */
        this.router.delete('/:id', validateObjectId, this.tradespersonController.deleteTradespersonById);
    }

    getRoutes() {
        return this.router;
    }
}

export default TradespersonRoutes;
