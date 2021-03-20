const db = require("../services/tenants.service");

function tenantsController(app) {
    app.post("/tenants", async (req, res) => {
        const result = await db.addTenant(req.body);
        res.status(200).json({ id: result[0] })
    });
}

module.exports = {
    tenantsController
}