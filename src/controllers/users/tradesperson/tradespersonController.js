// This is the controller for the tradesperson user

class TradespersonController {
  constructor(tradespersonService) {
    this.tradespersonService = tradespersonService;
    this.createTradesperson = this.createTradesperson.bind(this);
    this.getTradespersonById = this.getTradespersonById.bind(this);
    this.updateTradespersonById = this.updateTradespersonById.bind(this);
    this.deleteTradespersonById = this.deleteTradespersonById.bind(this);
    this.validateTradespersonData = this.validateTradespersonData.bind(this);
  }

  async createTradesperson(req, res, next) {
    try {
      const validationErrors = this.validateTradespersonData(req.body);
      if (validationErrors.length > 0)
        return res.status(400).json({ errors: validationErrors });
      const tradesperson = await this.tradespersonService.create(req.body);
      return res.status(201).json(tradesperson);
    } catch (error) {
      next(error);
    }
  }

  async getTradespersonById(req, res, next) {
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
  }

  async updateTradespersonById(req, res, next) {
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
  }

  async deleteTradespersonById(req, res, next) {
    try {
      const tradesperson = await this.tradespersonService.getById(req.params.id)
      if (!tradesperson)
        return res.status(404).json({ error: "Tradesperson not found" });
      const deletedTradesperson = await this.tradespersonService.deleteById(
        req.params.id
      );
      return res
        .status(200)
        .json({ message: "Tradesperson deleted successfully", tradesperson: deletedTradesperson});
    } catch (error) {
      next(error);
    }
  }

  validateTradespersonData = (data) => {
    const errors = [];

    if (!data.name || typeof data.name !== "string")
      errors.push("Name is required and must be a string");
    if (!data.emailAddress || typeof data.emailAddress !== "string")
      errors.push("Email is required and must be a string");
    if (!data.phoneNumber || typeof data.phoneNumber !== "string")
      errors.push("Phone number is required and must be a string");
    if (!data.address || typeof data.address !== "string")
      errors.push("Address is required and must be a string");
    if (!data.county || typeof data.county !== "string")
      errors.push("County is required and must be a string");
    if (!data.eircode || typeof data.eircode !== "string")
      errors.push("Eircode is required and must be a string");
    if (!data.trade || typeof data.trade !== "string")
      errors.push("Trade is required and must be a string");

    return errors;
  }
}

export default TradespersonController;
