// This is the controller file for the homeowner

import validator from "validator";

class HomeownerController {
  constructor(homeownerService) {
    this.homeownerService = homeownerService;
  }

  createHomeowner = async (req, res, next) => {
    try {
      const validationErrors = this.validateHomeownerData(req.body);
      if (validationErrors.length > 0)
        return res.status(400).json({ errors: validationErrors });
      const homeowner = await this.homeownerService.create(req.body);
      return res.status(201).json(homeowner);
    } catch (error) {
      next(error);
    }
  }

  getHomeownerById = async (req, res, next) => {
    try {
      const homeowner = await this.homeownerService.getById(req.params.id);
      if (!homeowner)
        return res.status(404).json({ error: "Homeowner not found" });
      return res.status(200).json(homeowner);
    } catch (error) {
      next(error);
    }
  }

  updateHomeownerById = async (req, res, next) => {
    try {
      const validationErrors = this.validateHomeownerData(req.body);
      if (validationErrors.length > 0)
        return res.status(400).json({ errors: validationErrors });
      const homeowner = await this.homeownerService.updateById(
        req.params.id,
        req.body
      );
      if (!homeowner)
        return res.status(404).json({ error: "Homeowner not found" });
      return res.status(200).json(homeowner);
    } catch (error) {
      next(error);
    }
  }

  deleteHomeownerById = async (req, res, next) => {
    try {
      const homeowner = await this.homeownerService.getById(req.params.id);
      if (!homeowner)
        return res.status(404).json({ error: "Homeowner not found" });
      const deletedhomeowner = await this.homeownerService.deleteById(
        req.params.id
      );
      return res.status(200).json({
        message: "Homeowner deleted successfully",
        homeowner: deletedhomeowner,
      });
    } catch (error) {
      next(error);
    }
  }

  validateHomeownerData = (data) => {
    const errors = [];
    const checkString = (value, field, maxLength) => {
      if (!value || typeof value !== "string")
        errors.push(`${field} is required and must be a string`);
      else if (maxLength && value.length > maxLength)
        errors.push(`${field} must be less than ${maxLength} characters`);
    };

    const checkEmail = (emailAddress) => {
      if (
        !emailAddress ||
        typeof emailAddress !== "string" ||
        !validator.isEmail(emailAddress)
      ) {
        errors.push("Please fill a valid email address");
      }
    };

    checkString(data.name, "Name");
    checkString(data.emailAddress, "Email");
    checkString(data.phoneNumber, "Phone number", 10);
    checkString(data.address, "Address");
    checkString(data.county, "County");
    checkString(data.eircode, "Eircode", 7);
    checkString(data.serviceRequired, "Service required");
    checkEmail(data.emailAddress);

    return errors;
  };
}

export default HomeownerController;
