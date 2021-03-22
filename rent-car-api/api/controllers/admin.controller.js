const db = require("../services/admin.service");

function adminController(app) {
    app.post("/admin/:userGuid", async (req, res) => {
        const result = await db.createAdmin(req.params.userGuid, req.body);
        if (result.status === "error") {
            res.status(401).json({ result });
        } else {
            res.status(200).json({ result });
        }
    });

    app.post("/login", async (req, res) => {
        const result = await db.login(req.body);
        res.status(200).json({ result })
    });

    app.get("/logout/:guid", async (req, res) => {
        const result = await db.logout(req.params.guid);
        res.status(200).json({ result })
    });
}

module.exports = {
    adminController
};