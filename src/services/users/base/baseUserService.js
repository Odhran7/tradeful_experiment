// This is the base service for the user that all the user services will inherit from 

class BaseUserService {
    constructor(model) {
        this.model = model;
    }

    // Create a new user
    async create (data) {
        try {
            return await this.model.create(data);
        } catch (error) {
            throw new Error(`Failed to create a new user. Details: ${error.message || error}`);
        }
    }

    // Get a user by id
    async getById(id) {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw new Error(`Failed to get a user by id. Details: ${error.message || error}`);
        }
    }

    // Update a user by id
    async updateById(id, data) {
        try {
            console.log("data: " + data);
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            throw new Error(`Failed to update a user by id. Details: ${error.message || error}`);
        }
    }

    // Delete a user by id
    async deleteById(id) {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Failed to delete a user by id. Details: ${error.message || error}`);
        }
    }

    // Get user by county
    async getByCounty(county) {
        try {
            return await this.model.find({ county });
        } catch (error) {
            throw new Error(`Failed to get a user by county. Details: ${error.message || error}`);
        }
    }

    // Get a list of all users
    async getAllUsers() {
        try {
            return this.model.find();
        } catch (error) {
            throw new Error(`Failed to get all users. Details: ${error.message || error}`);
        }
    }
}

export default BaseUserService;