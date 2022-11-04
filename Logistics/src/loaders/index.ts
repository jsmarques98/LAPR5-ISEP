import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';


export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  const truckSchema = {
    // compare with the approach followed in repos and services
    name: 'truckSchema',
    schema: '../persistence/schemas/truckSchema',
  };

  const sectionSchema = {
    // compare with the approach followed in repos and services
    name: 'sectionSchema',
    schema: '../persistence/schemas/sectionSchema',
  };

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  const truckController = {
    name: config.controllers.truck.name,
    path: config.controllers.truck.path
  }

  const sectionController = {
    name: config.controllers.section.name,
    path: config.controllers.section.path
  }

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const truckRepo = {
    name: config.repos.truck.name,
    path: config.repos.truck.path
  }

  const sectionRepo = {
    name: config.repos.section.name,
    path: config.repos.section.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  const truckService = {
    name: config.services.truck.name,
    path: config.services.truck.path
  }

  const sectionService = {
    name: config.services.section.name,
    path: config.services.section.path
  }



  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      truckSchema,
      sectionSchema
    ],
    controllers: [
      roleController,
      truckController,
      sectionController
    ],
    repos: [
      roleRepo,
      userRepo,
      truckRepo,
      sectionRepo
    ],
    services: [
      roleService,
      truckService,
      sectionService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
