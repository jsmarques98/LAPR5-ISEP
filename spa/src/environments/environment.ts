// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  logisticsAPI:"http://10.9.23.214:3000/api/",

  logisticsAPILogin:"auth/ssosignin",
  logisticsAPILogout:"auth/logout",

  logisticsAPIPackagings:"packagings/",

  logisticsAPIPlanningBestRoute:"plannings/bestRoute",
  logisticsAPIPlanningHeuristicMass:"plannings/routeHeuristicMass",
  logisticsAPIPlanningHeuristicTime:"plannings/routeHeuristicTime",
  logisticsAPIPlanningHeuristicTimeAndMass:"plannings/routeHeuristicTimeAndMass",

  logisticsAPIPSections:"sections/",

  logisticsAPIPTrucks:"trucks/",


  warehouseManagementAPI: "http://10.9.23.22:5000/api/",

  warehouseManagementAPIDeliveries: "deliveries/",
  
  warehouseManagementAPIWarehouses: "warehouses/",

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
