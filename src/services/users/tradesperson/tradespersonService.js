// This is the service file for the tradesperson type user

import BaseUserService from "../base/baseUserService.js";

class TradespersonService extends BaseUserService {
    constructor(model) {
        super(model);
    }

    // Get tradesperson by trade
    async getTradespersonByTrade(trade) {
        try {
            return await this.model.find({ trade });
        } catch (error) {
            throw new Error("Error getting tradesperson by trade (tradespersonService)");
        }
    }
}

export default TradespersonService;