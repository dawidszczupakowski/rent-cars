const knex = require("../db/knex");

function createCar(car) {
    return knex("cars").insert(car);
}

function getCar(id) {
    return knex("cars").select("*").where("id", id);
}

function getAllCar() {
    return knex("cars").select("*");
}

function updateCar(id, car) {
    return knex("cars").where("id", id).update(car);
}

module.exports = {
    createCar,
    getCar,
    updateCar,
    getAllCar
};
