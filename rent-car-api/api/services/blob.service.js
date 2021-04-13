const knex = require("../../db/knex");

async function getBlob(id) {
    return await knex("blob").select("blob").where("id", id);
}

async function uploadFiles(blob) {
    if (blob.id) {
        return await knex("blob").update(blob).where("id", blob.id);
    }
    return await knex("blob").insert(blob);
}

module.exports = {
    getBlob,
    uploadFiles
}