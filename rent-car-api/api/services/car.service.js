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

async function getCar(id) {
    const car = await knex("pojazdy").select("*").where("id", id);
    const blob = await knex("blob").select("blob").where("id", car[0].blobId);
    car[0].blob = blob[0].blob;
    return car;
}

async function getAllCar() {
    const cars = await knex("pojazdy").select("*");
    for (const car of cars) {
        const blob = await knex("blob").select("blob").where("id", car.blobId);
        car.blob = blob[0].blob;
    }
    return cars;
}

async function updateCar(id, userGuid, car) {
    const user = await knex("admin").select("id").where("guid", userGuid);
    if (user.length) {
        return knex("pojazdy").update(car).where("id", car.id);
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