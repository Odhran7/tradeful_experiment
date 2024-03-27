// This is the export file for the users service 

import ApprenticeService from "./apprentice/apprenticeService";
import HomeownerServices from "./homeowner/homeownerService";
import TradespersonService from "./tradesperson/tradespersonService";
import models from "../../models/index.js";

const { Apprentice, Homeowner, Tradesperson } = models;

const apprenticeService = new ApprenticeService(Apprentice);
const homeownerService = new HomeownerServices(Homeowner);
const tradespersonService = new TradespersonService(Tradesperson);

export { apprenticeService, homeownerService, tradespersonService };