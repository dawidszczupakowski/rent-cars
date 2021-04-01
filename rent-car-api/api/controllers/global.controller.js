const carsController = require("./car.controller");
const rentController = require("./rent.controller");
const adminController = require("./admin.controller");
const tenantsController = require("./tenants.controller");
const blobController = require("./blob.controller");

function setEndpoints(app) {
    carsController.carsController(app);
    rentController.rentController(app);
    adminController.adminController(app);
    tenantsController.tenantsController(app);
    blobController.blobController(app);
}

module.exports = {
    setEndpoints
};
