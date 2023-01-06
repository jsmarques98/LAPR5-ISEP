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
  
  const planningSchema = {
    // compare with the approach followed in repos and services
    name: 'planningSchema',
    schema: '../persistence/schemas/planningSchema',
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

  const packagingSchema = {
    // compare with the approach followed in repos and services
    name: 'packagingSchema',
    schema: '../persistence/schemas/packagingSchema',
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

  const packagingController = {
    name: config.controllers.packaging.name,
    path: config.controllers.packaging.path
  }
  
  const planningController = {
    name: config.controllers.planning.name,
    path: config.controllers.planning.path
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

  const packagingRepo = {
    name: config.repos.packaging.name,
    path: config.repos.packaging.path
  }

  const planningRepo = {
    name: config.repos.planning.name,
    path: config.repos.planning.path
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

  const packagingService = {
    name: config.services.packaging.name,
    path: config.services.packaging.path
  }
  
  const planningService = {
    name: config.services.planning.name,
    path: config.services.planning.path
  }



  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      truckSchema,
      sectionSchema,
      packagingSchema,
      planningSchema,
    ],
    controllers: [
      roleController,
      truckController,
      sectionController,
      packagingController,
      planningController
    ],
    repos: [
      roleRepo,
      userRepo,
      truckRepo,
      sectionRepo,
      packagingRepo,
      planningRepo
    ],
    services: [
      roleService,
      truckService,
      sectionService,
      packagingService,
      planningService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
