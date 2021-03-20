const carsController = require("./car.controller");
const rentController = require("./rent.controller");
const adminController = require("./admin.controller");
const tenantsController = require("./tenants.controller");

function setEndpoints(app) {
    carsController.carsController(app);
    rentController.rentController(app);
    adminController.adminController(app);
    tenantsController.tenantsController(app);
}

module.exports = {
    setEndpoints
};
