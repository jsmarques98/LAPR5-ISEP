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
  databaseURL: process.env.MONGODB_URI || "mongodb://mongoadmin:37d07434c42748d928f9ae9c@vsgate-s1.dei.isep.ipp.pt:10470/admin?authMechanism=DEFAULT",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  
  planningAPIBestRoutesURL: "http://localhost:8000/bestRoute",
  planningAPIHeuristicTimeURL: "http://localhost:8000/heuristicTime",
  planningAPIHeuristicMassURL: "http://localhost:8000/heuristicMass",
  loadTruckURL: "http://localhost:8000/loadTruck",
  loadDeliveryURL: "http://localhost:8000/loadDelivery",
  loadSectionURL: "http://localhost:8000/loadSection",
  loadWarehouseURL: "http://localhost:8000/loadWarehouse",
  eliminarDadosURL: "http://localhost:8000/deleteDados",
  planningAPIHeuristicTimeAndMassURL: "http://localhost:8000/heuristicTimeAndMass",
  warehousesAPIWarehouseManagementURL:"https://localhost:5001/api/Warehouses/",
  deliveriesAPIWarehouseManagementURL:"https://localhost:5001/api/Deliveries/",
  
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
    },
    planning: {
      name: "PlanningController",
      path: "../controllers/planningController"
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
    },
    planning: {
      name: "PlanningService",
      path: "../services/planningService"
    }
  },
};
