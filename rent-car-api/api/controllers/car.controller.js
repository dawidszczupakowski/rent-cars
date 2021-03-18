const db = require("../../services/car.service");

function carsController(app) {
    app.post("/cars", async (req, res) => {
        const result = await db.createCar(req.body);
        res.status(200).json({ id: result[0] })
    });
    
    app.get("/cars:id", async (req, res) => {
        const result = await db.getCar(req.params.id);
        res.status(200).json({ result })
    });
    
    app.get("/cars", async (req, res) => {
        const result = await db.getAllCar();
        res.status(200).json({ result })
    });
    
    app.put("/cars", async (req, res) => {
        const result = await db.updateCar(req.body.id, req.body);
        res.status(200).json({ result })
    });
}
 module.exports = {
     carsController
 }