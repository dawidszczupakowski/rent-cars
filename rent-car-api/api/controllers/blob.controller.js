const db = require("../services/blob.service");

function blobController(app) {
    app.get("/blob/:blobId", async (req, res) => {
        const result = await db.getBlob(req.params.blobId);
        res.status(200).json({ result: result[0] })
    });
}

module.exports = {
    blobController
}
