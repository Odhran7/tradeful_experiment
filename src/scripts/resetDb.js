// This is a script that resets the db for develpment purposes

import models from '../models/index.js';
import mongoose from 'mongoose';
import config from '../config/index.js';

const { apprentice, homeowner, tradesperson, job } = models;

const resetDb = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      config.logger.info('Connected to database');
      
      await apprentice.deleteMany();
      await tradesperson.deleteMany();
      await homeowner.deleteMany();
      await job.deleteMany();

      config.logger.info('Database reset');
    } catch (error) {
      config.logger.error('Error resetting database: ' + error.message);
      throw error;
    } finally {
      mongoose.connection.close();
    }
  };
  
  resetDb();