// This is the base service for the user that all the user services will inherit from 

class BaseUserService {
    constructor(model) {
        this.model = model;
    }

    // Create a new user
    async create(data) {
        try {
            return await this.model.create(data);
        } catch {
            throw new Error("Error creating a new user (baseService)");
        }
    }

    // Get a user by id
    async getById(id) {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw new Error("Error getting user by id (baseService)");
        }
    }

    // Update a user by id
    async updateById(id, data) {
        try {
            return await this.model.findByIdAndUpdate(id, data);
        } catch (error) {
            throw new Error("Error updating user by id (baseService)");
        }
    }

    // Delete a user by id
    async deletebyId(id) {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw new Error("Error deleting user by id (baseService)");
        }
    }

    // Get user by county
    async getByCounty(county) {
        try {
            return await this.model.find({ county });
        } catch (error) {
            throw new Error("Error getting user by county (baseService)");
        }
    }

    // Get a list of all users
    async getAllUsers() {
        try {
            return this.model.find();
        } catch (error) {
            throw new Error("Error getting all users (baseService)");
        }
    }
}

export default BaseUserService;