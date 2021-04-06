const knex = require("../../db/knex");
const tenantService = require("./tenants.service");
const carService = require("./car.service");

async function addRent(rent) {
    if (rent.car.id) {
        const tenantId = await tenantService.addTenant(rent.tenant);
        rent.rentDetails.najemcaId = tenantId[0];
        await knex("pojazdy").update(rent.car).where("id", rent.car.id);
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

async function updateRent(userGuid, rent) {
    const user = await knex("admin").select("id").where("guid", userGuid);
    if (user.length) {
        return knex("wypozyczone").where("id", rent.id).update(rent);
    }
    return {
        status: "error"
    };
}

async function getAllRentedInfo(userGuid) {
    const user = await knex("admin").select("id").where("guid", userGuid);

    if (user.length) {
        return await knex.select(knex.ref('wypozyczone.id').as('wypozyczenieId'), 'wypozyczone.*', 'pojazdy.*', 'najemcy.*').from("wypozyczone").join('pojazdy', {
            'pojazdy.id': 'wypozyczone.idPojazdu'
        }).join('najemcy', {
            'najemcy.id': 'wypozyczone.najemcaId'
        });
    }
    return {
        status: "error"
    };
}

module.exports = {
    addRent,
    getRent,
    getAllRent,
    updateRent,
    getAllRentedInfo
};