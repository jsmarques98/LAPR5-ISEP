import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3000,

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || "mongodb://localhost:27017/test",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  
  warehousesAPIWarehouseManagementURL: "https://localhost:5001/api/warehouses/",
  deliveriesAPIWarehouseManagementURL: "https://localhost:5001/api/deliveries/",

  
  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    role: {
      name: "RoleController",
      path: "../controllers/roleController"
    },
    truck: {
      name: "TruckController",
      path: "../controllers/truckController"
    },
    section: {
      name: "SectionController",
      path: "../controllers/sectionController"
    },
    packaging: {
      name: "PackagingController",
      path: "../controllers/packagingController"
    }
  },

  repos: {
    role: {
      name: "RoleRepo",
      path: "../repos/roleRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    },
    truck: {
      name: "TruckRepo",
      path: "../repos/truckRepo"
    },
    section: {
      name: "SectionRepo",
      path: "../repos/sectionRepo"
    },
    packaging: {
      name: "PackagingRepo",
      path: "../repos/packagingRepo"
    }
  },

  services: {
    role: {
      name: "RoleService",
      path: "../services/roleService"
    },
    truck: {
      name: "TruckService",
      path: "../services/truckService"
    },
    section: {
      name: "SectionService",
      path: "../services/sectionService"
    },
    packaging: {
      name: "PackagingService",
      path: "../services/packagingService"
    }
  },
};
