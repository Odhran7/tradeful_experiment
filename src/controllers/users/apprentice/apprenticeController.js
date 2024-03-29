// This is the controller file for apprentices

class ApprenticeController {

    constructor(apprenticeService) {
        this.apprenticeService = apprenticeService;
        this.createApprentice = this.createApprentice.bind(this);
        this.getApprenticeById = this.getApprenticeById.bind(this);
        this.updateApprenticeById = this.updateApprenticeById.bind(this);
        this.deleteApprenticeById = this.deleteApprenticeById.bind(this);
        this.getAllApprentices = this.getAllApprentices.bind(this);
        this.validateApprenticeData = this.validateApprenticeData.bind(this);
    }

    // Create an apprentice
    async createApprentice(req, res, next) {
        try {
            const validationErrors = this.validateApprenticeData(req.body)
            if (validationErrors.length > 0) return res.status(400).json({ errors: validationErrors });
            const apprentice = await this.apprenticeService.create(req.body);
            return res.status(201).json(apprentice);
        } catch (error) {
            next(error)
        }
    }

    // Get an apprentice by id
    async getApprenticeById(req, res, next) {
        try {
            const apprentice = await this.apprenticeService.getById(req.params.id);
            if (!apprentice) return res.status(404).json({ error: "Apprentice not found" });
            return res.status(200).json(apprentice);
        } catch (error) {
            next(error);
        }
    }

    // Update an apprentice by id (in full)
    async updateApprenticeById(req, res, next) {
        try {
            const validationErrors = this.validateApprenticeData(req.body);
            if (validationErrors.length > 0) return res.status(400).json({ errors: validationErrors });
            const apprentice = await this.apprenticeService.updateById(req.params.id, req.body);
            if (!apprentice) return res.status(404).json({ error: "Apprentice not found" });
            return res.status(200).json(apprentice);
        } catch (error) {
            next(error);
        }
    }

    // Delete an apprentice by id
    async deleteApprenticeById(req, res, next) {
        try {
            const apprentice = await this.apprenticeService.getById(req.params.id);
            if (!apprentice) return res.status(404).json({ error: "Apprentice not found" });
            const deletedApprentice = await this.apprenticeService.deleteById(req.params.id);
            return res.status(200).json({ message: "Apprentice deleted successfully", apprentice: deletedApprentice });
        } catch (error) {
            next(error);
        }
    }

    async getAllApprentices(req, res, next) {   
        try {
            const apprentices = await this.apprenticeService.getAll();
            return res.status(200).json(apprentices);
        } catch (error) {
            next(error)
        }
    }

    // Private method to validate the data passed from the body to create an apprentice
    validateApprenticeData = (data) => {
        const errors = [];

        if (!data.name || typeof data.name !== "string") errors.push("Name is required and must be a string");
        if (!data.emailAddress || typeof data.emailAddress !== "string") errors.push("Email is required and must be a string");
        if (!data.phoneNumber || typeof data.phoneNumber !== "string") errors.push("Phone number is required and must be a string");
        if (!data.address || typeof data.address !== "string") errors.push("Address is required and must be a string");
        if (!data.county || typeof data.county !== "string") errors.push("County is required and must be a string");
        if (!data.eircode || typeof data.eircode !== "string") errors.push("Eircode is required and must be a string");
        if (!data.trade || typeof data.trade !== "string") errors.push("Trade is required and must be a string");
        if (!data.institution || typeof data.institution !== "string") errors.push("Institution is required and must be a string");
        if (!data.yearOfGraduation || typeof data.yearOfGraduation !== "string") errors.push("Year of graduation is required and must be a string");
        else {
            const year = parseInt(data.yearOfGraduation);
            const currentYear = new Date().getFullYear();
            if (isNaN(year) || year < currentYear) errors.push("Year of graduation must be a valid year in the future");
        }
        return errors;
    }
    
}

export default ApprenticeController;