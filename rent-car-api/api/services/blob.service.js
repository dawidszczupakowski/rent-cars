const knex = require("../../db/knex");

async function getBlob(id) {
    return await knex("blob").select("blob").where("id", id);
}

module.exports = {
    getBlob
}