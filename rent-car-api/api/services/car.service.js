const knex = require("../../db/knex");

async function createCar(userGuid, car) {
    const user = await knex("admin").select("id").where("guid", userGuid);
    if (user.length) {
        return knex("pojazdy").insert(car);
    }
    return {
        status: "error"
    };
}

function getCar(id) {
    return knex("pojazdy").select("*").where("id", id);
}

function getAllCar() {
    return knex("pojazdy").select("*");
}

async function updateCar(id, userGuid, car) {
    const user = await knex("admin").select("id").where("guid", userGuid);
    if (user.length) {
        return knex("pojazdy").where("id", car.id).update(car);
    }
    return {
        status: "error"
    };
}

module.exports = {
    createCar,
    getCar,
    updateCar,
    getAllCar
};
