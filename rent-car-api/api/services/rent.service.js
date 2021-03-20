const knex = require("../../db/knex");
const tenantService = require("./tenants.service");
const carService = require("./car.service");

async function addRent(carId, rent) {
    const car = await knex("pojazdy").select("id").where("id", carId);
    if (car.length) {
        rent.rentDetails.idPojazdu = parseInt(carId, 10);
        const tenantId = await tenantService.addTenant(rent.tenant);
        rent.rentDetails.najemcaId = tenantId[0];
        return knex("wypozyczone").insert(rent.rentDetails);
    }
    return {
        status: "error",
        message: "Wskazany pojazd nie istnieje"
    };
}

async function getRent(id, userGuid) {
    const user = await knex("admin").select("id").where("guid", userGuid);
    if (user.length) {
        const wypozyczone = await knex("wypozyczone").select("*").where("id", id);
        const tenant = await tenantService.getTenant(wypozyczone[0].najemcaId);
        const car = await carService.getCar(wypozyczone[0].idPojazdu);
        return {
            wypozyczone: wypozyczone[0],
            tenant: tenant[0],
            car: car[0]
        };
    }
    return {
        status: "error"
    };
}

async function getAllRent(userGuid) {
    const user = await knex("admin").select("id").where("guid", userGuid);
    if (user.length) {
        let response = [];
        const wypozyczone = await knex("wypozyczone").select("*");
        wypozyczone.forEach(async element => {
            const tenant = await tenantService.getTenant(element.najemcaId);
            const car = await carService.getCar(element.idPojazdu);
            response.push({
                wypozyczone: element,
                tenant: tenant[0],
                car: car[0]
            });
        });
        return {
            response
        };
    }
    return {
        status: "error"
    };
}

async function updateRent(id, userGuid, tenant) {
    const user = await knex("admin").select("id").where("guid", userGuid);
    if (user.length) {
        return knex("wypozyczone").where("id", id).update(tenant);
    }
    return {
        status: "error"
    };
}

module.exports = {
    addRent,
    getRent,
    getAllRent,
    updateRent
};