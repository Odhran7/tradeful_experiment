// This is the service file for the homeowner type user

import BaseUserService from "../base/baseUserService.js";

class HomeownerService extends BaseUserService {
    
    constructor(model) {
        super(model);
    }

    // Get homeowners by service required
    async getHomeownerByService(serviceRequired) {
        try {
            return await this.model.find({ serviceRequired });
        } catch (error) {
            throw new Error("Error getting homeowner by service (homeownerService)");
        }
    }
}

export default HomeownerService;