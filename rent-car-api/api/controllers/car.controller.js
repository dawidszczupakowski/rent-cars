const db = require("../services/car.service");

function carsController(app) {
    app.post("/cars/:userGuid", async (req, res) => {
        const result = await db.createCar(req.params.userGuid, req.body);
        res.status(200).json({ result })
    });
    
    app.get("/cars/:id", async (req, res) => {
        const result = await db.getCar(req.params.id);
        res.status(200).json({ result: result[0] })
    });
    
    app.get("/cars", async (req, res) => {
        const result = await db.getAllCar();
        res.status(200).json({ result })
    });
    
    app.post("/updateCar/:userGuid", async (req, res) => {
        const result = await db.updateCar(req.body.id, req.params.userGuid, req.body);
        res.status(200).json({ result })
    });
}
 module.exports = {
     carsController
 }