// This is the controller file for apprentices

import validator from "validator";

class ApprenticeController {
  constructor(apprenticeService) {
    this.apprenticeService = apprenticeService;
  }

  // Create an apprentice
  createApprentice = async (req, res, next) => {
    try {
      const validationErrors = this.validateApprenticeData(req.body);
      if (validationErrors.length > 0)
        return res.status(400).json({ errors: validationErrors });
      const apprentice = await this.apprenticeService.create(req.body);
      return res.status(201).json(apprentice);
    } catch (error) {
      next(error);
    }
  };

  // Get an apprentice by id
  getApprenticeById = async (req, res, next) => {
    try {
      const apprentice = await this.apprenticeService.getById(req.params.id);
      if (!apprentice)
        return res.status(404).json({ error: "Apprentice not found" });
      return res.status(200).json(apprentice);
    } catch (error) {
      next(error);
    }
  };

  // Update an apprentice by id (in full)
  updateApprenticeById = async (req, res, next) => {
    try {
      const validationErrors = this.validateApprenticeData(req.body);
      if (validationErrors.length > 0)
        return res.status(400).json({ errors: validationErrors });
      const apprentice = await this.apprenticeService.updateById(
        req.params.id,
        req.body
      );
      if (!apprentice)
        return res.status(404).json({ error: "Apprentice not found" });
      return res.status(200).json(apprentice);
    } catch (error) {
      next(error);
    }
  };

  // Delete an apprentice by id
  deleteApprenticeById = async (req, res, next) => {
    try {
      const apprentice = await this.apprenticeService.getById(req.params.id);
      if (!apprentice)
        return res.status(404).json({ error: "Apprentice not found" });
      const deletedApprentice = await this.apprenticeService.deleteById(
        req.params.id
      );
      return res.status(200).json({
        message: "Apprentice deleted successfully",
        apprentice: deletedApprentice,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllApprentices = async (req, res, next) => {
    try {
      const apprentices = await this.apprenticeService.getAll();
      return res.status(200).json(apprentices);
    } catch (error) {
      next(error);
    }
  };

  // Private method to validate the data passed from the body to create an apprentice
  validateApprenticeData = (data) => {
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
    checkString(data.trade, "Trade");
    checkString(data.institution, "Institution");
    checkString(data.yearOfGraduation, "Year of graduation");
    checkEmail(data.emailAddress);

    return errors;
  };
}

export default ApprenticeController;
