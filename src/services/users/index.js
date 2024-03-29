// This is the export file for the users service 

import ApprenticeService from "./apprentice/apprenticeService.js";
import HomeownerService from "./homeowner/homeownerService.js";
import TradespersonService from "./tradesperson/tradespersonService.js";
import models from "../../models/index.js";

const { apprentice, homeowner, tradesperson } = models;
const tradespersonService = new TradespersonService(tradesperson);
const homeownerService = new HomeownerService(homeowner);
const apprenticeService = new ApprenticeService(apprentice);

export { apprenticeService, homeownerService, tradespersonService };