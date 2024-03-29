// This is the export file for the user routes

import express from "express";
import ApprenticeRoutes from "./apprentice/apprenticeRoutes.js";
import TradespersonRoutes from "./tradesperson/tradespersonRoutes.js";
import HomeownerRoutes from "./homeowner/homeownerRoutes.js";

class UserRoutes {
  constructor(router) {
    this.router = router;
    this.initializeRoutes();
  }

  initializeRoutes() {
    const tradespersonRoutes = new TradespersonRoutes(express.Router()).getRoutes();
    const homeownerRoutes = new HomeownerRoutes(express.Router()).getRoutes();
    const apprenticeRoutes = new ApprenticeRoutes(express.Router()).getRoutes();
    this.router.use("/user/apprentice", apprenticeRoutes);
    this.router.use("/user/tradesperson", tradespersonRoutes);
    this.router.use("/user/homeowner", homeownerRoutes);
  }

  getRoutes() {
    return this.router;
  }
}

export default UserRoutes;
