const db = require("../services/rent.service");

function rentController(app) {
    app.post("/rent", async (req, res) => {
        const result = await db.addRent(req.body);
        res.status(200).json({ result: result[0] })
    });
    
    app.get("/rent/:id/:userGuid", async (req, res) => {
        const result = await db.getRent(req.params.id, req.params.userGuid);
        if (result.status === "error") {
            res.status(401).json({ result });
        } else {
            res.status(200).json({ result });
        }
    });
    
    app.get("/rent/:userGuid", async (req, res) => {
        const result = await db.getAllRent(req.params.userGuid);
        if (result.status === "error") {
            res.status(401).json({ result });
        } else {
            res.status(200).json({ result });
        }
    });
    
    app.post("/rent/:userGuid", async (req, res) => {
        const result = await db.updateRent(req.body.id, req.params.userGuid, req.body);
        if (result.status === "error") {
            res.status(401).json({ result });
        } else {
            res.status(200).json({ result });
        }
    });

    app.get("/getAllRentInfo/:userGuid", async (req, res) => {
        const result = await db.getAllRentedInfo(req.params.userGuid);
        if (result.status === "error") {
            res.status(401).json({ result });
        } else {
            res.status(200).json({ result });
        }
    });
}
 module.exports = {
     rentController
 }