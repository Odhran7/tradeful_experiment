    // This is the services file for the apprentice type user

    import BaseUserService from "../base/baseUserService.js";

    class ApprenticeService extends BaseUserService {
        constructor(model) {
            super(model);
        }

        // Get apprentice by trade
        async getApprenticeByTrade(trade) {
            try {
                return await this.model.find({ trade });
            } catch (error) {
                throw new Error("Error getting apprentice by trade (apprenticeService)");
            }
        }

        // Get apprentices by year of graduation
        async getApprenticeByYearOfGraduation(yearOfGraduation) {
            try {
                return await this.model.find({ yearOfGraduation});
            } catch (error) {
                throw new Error("Error getting apprentice by year of graduation (apprenticeService)")
            }
        }
    }

    export default ApprenticeService;