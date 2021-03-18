const carsController = require("./car.controller");

function setEndpoints(app) {
    carsController.carsController(app);
}

module.exports = {
    setEndpoints
};
