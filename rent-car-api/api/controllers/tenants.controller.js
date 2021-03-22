const db = require("../services/tenants.service");

function tenantsController(app) {
    app.post("/tenants", async (req, res) => {
        const result = await db.addTenant(req.body);
        res.status(200).json({ id: result[0] })
    });

    app.get("/tenants/:userGuid", async (req, res) => {
        const result = await db.getAllTenant(req.params.userGuid);
        if (result.status === "error") {
            res.status(401).json({ result });
        } else {
            res.status(200).json({ result });
        }
    });

    app.get("/tenants/:tenantId/:userGuid", async (req, res) => {
        const result = await db.getTenant(req.params.tenantId, req.params.userGuid);
        if (result.status === "error") {
            res.status(401).json({ result });
        } else {
            res.status(200).json({ result });
        }
    });
}

module.exports = {
    tenantsController
}