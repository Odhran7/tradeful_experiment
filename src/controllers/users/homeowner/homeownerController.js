// This is the controller file for the homeowner

import { homeownerService } from "../../../services/users/index.js";

class HomeownerController {
    async createHomeowner(req, res, next) {
        try {
            const validationErrors = this.#validateHomeownerData(req.body)
            if (validationErrors.length > 0) return res.status(400).json({ errors: validationErrors });
            const homeowner = await homeownerService.create(req.body);
            return res.status(201).json(homeowner);
        } catch (error) {
            next(error);
        }
    }

    async getHomeownerById(req, res, next) {
        try {
            const homeowner = await homeownerService.getById(req.params.id);
            if (!homeowner) return res.status(404).json({ error: "Homeowner not found" });
            return res.status(200).json(homeowner);
        } catch (error) {
            next(error);
        }
    }

    async updateHomeownerById(req, res, error) {
        try {
            const validationErrors = this.#validateHomeownerData(req.body);
            if (validationErrors.length > 0) return res.status(400).json({ errors: validationErrors });
            const homeowner = await homeownerService.updateById(req.params.id, req.body);
            if (!homeowner) return res.status(404).json({ error: "Homeowner not found" });
            return res.status(200).json(homeowner);
        } catch (error) {
            next(error);
        }
    }

    async deleteHomeownerById(req, res, error) {
        try {
            const homeowner = await homeownerService.deleteById(req.params.id);
            if (!homeowner) return res.status(404).json({ error: "Homeowner not found" });
            return res.status(200).json({ message: "Homeowner deleted successfully" });
        } catch (error) {
            next(error);
        }
    }   

    #validateHomeownerData(data) {
        const errors = [];

        if (!data.name || typeof data.name !== "string") errors.push("Name is required and must be a string");
        if (!data.email || typeof data.email !== "string") errors.push("Email is required and must be a string");
        if (!data.phoneNumber || typeof data.phoneNumber !== "string") errors.push("Phone number is required and must be a string");
        if (!data.address || typeof data.address !== "string") errors.push("Address is required and must be a string");
        if (!data.county || typeof data.county !== "string") errors.push("County is required and must be a string");
        if (!data.eircode || typeof data.eircode !== "string") errors.push("Eircode is required and must be a string");
        if (!data.serviceRequired || typeof data.serviceRequired !== "string") errors.push("Service required is required and must be a string");

        return errors;
    }
}

export default HomeownerController;