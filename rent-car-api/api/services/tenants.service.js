const knex = require("../../db/knex");

async function addTenant(tenant) {
    let tenantExist = false;
    if (tenant.pesel) {
        tenantExist = await knex("najemcy").select("*").where({
            "pesel": tenant.pesel,
            "numerDowoduOsobistego": tenant.numerDowoduOsobistego
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

async function getTenant(tenantId, userGuid) {
    const user = await knex("admin").select("id").where("guid", userGuid);
    if (user.length) {
        return knex("najemcy").select("*").where("id", tenantId);
    }
    return {
        status: "error"
    }
}

async function getAllTenant(userGuid) {
    const user = await knex("admin").select("id").where("guid", userGuid);
    if (user.length) {
        return knex("najemcy").select("*");
    }
    return {
        status: "error"
    }
}

async function editTenant(tenant, userGuid) {
    const user = await knex("admin").select("id").where("guid", userGuid);
    if (user.length) {
        return knex("najemcy").update(tenant).where('id', tenant.id);
    }
    return {
        status: "error"
    }
}

module.exports = {
    addTenant,
    getTenant,
    getAllTenant,
    editTenant
}