const knex = require("../../db/knex");

async function addTenant(tenant) {
    let tenantExist = false;
    if (tenant.pesel) {
        tenantExist = await knex("najemcy").select("*").where({
            pesel: tenant.pesel,
            numerDowoduOsobistego: tenant.numerDowoduOsobistego
        });
    } else {
        tenantExist = await knex("najemcy").select("*").where({
            nip: tenant.nip,
            numerDowoduOsobistego: tenant.numerDowoduOsobistego
        });
    }
    if (tenantExist.length) {
        return [tenantExist[0].id];
    }
    return knex("najemcy").insert(tenant);
}

async function getTenant(tenantId) {
    return knex("najemcy").select("*").where("id", tenantId);
}

module.exports = {
    addTenant,
    getTenant
}