// This is the controller for the tradesperson user

import validator from "validator";

class TradespersonController {
  constructor(tradespersonService) {
    this.tradespersonService = tradespersonService;
  }

  createTradesperson = async (req, res, next) => {
    try {
      const validationErrors = this.validateTradespersonData(req.body);
      if (validationErrors.length > 0)
        return res.status(400).json({ errors: validationErrors });
      const tradesperson = await this.tradespersonService.create(req.body);
      return res.status(201).json(tradesperson);
    } catch (error) {
      next(error);
    }
  };

  getTradespersonById = async (req, res, next) => {
    try {
      const tradesperson = await this.tradespersonService.getById(
        req.params.id
      );
      if (!tradesperson)
        return res.status(404).json({ error: "Tradesperson not found" });
      return res.status(200).json(tradesperson);
    } catch (error) {
      next(error);
    }
  };

  updateTradespersonById = async (req, res, next) => {
    try {
      const validationErrors = this.validateTradespersonData(req.body);
      if (validationErrors.length > 0)
        return res.status(400).json({ errors: validationErrors });
      const tradesperson = await this.tradespersonService.updateById(
        req.params.id,
        req.body
      );
      if (!tradesperson)
        return res.status(404).json({ error: "Tradesperson not found" });
      return res.status(200).json(tradesperson);
    } catch (error) {
      next(error);
    }
  };

  deleteTradespersonById = async (req, res, next) => {
    try {
      const tradesperson = await this.tradespersonService.getById(
        req.params.id
      );
      if (!tradesperson)
        return res.status(404).json({ error: "Tradesperson not found" });
      const deletedTradesperson = await this.tradespersonService.deleteById(
        req.params.id
      );
      return res
        .status(200)
        .json({
          message: "Tradesperson deleted successfully",
          tradesperson: deletedTradesperson,
        });
    } catch (error) {
      next(error);
    }
  };

  validateTradespersonData = (data) => {
    const errors = [];
    const checkString = (value, field, maxLength) => {
      if (!value || typeof value !== "string")
        errors.push(`${field} is required and must be a string`);
      else if (maxLength && value.length > maxLength)
        errors.push(`${field} must be less than ${maxLength} characters`);
    };

    const checkEmail = (emailAddress) => {
      if (!emailAddress || typeof emailAddress !== 'string' || !validator.isEmail(emailAddress)) {
        errors.push("Please fill a valid email address");
      }
    };
    

    checkString(data.name, "Name");
    checkString(data.emailAddress, "Email Address");
    checkString(data.phoneNumber, "Phone Number", 10);
    checkString(data.address, "Address");
    checkString(data.county, "County");
    checkString(data.eircode, "Eircode", 7);
    checkString(data.trade, "Trade");

    checkEmail(data.emailAddress);

    return errors;
  };
}

export default TradespersonController;
