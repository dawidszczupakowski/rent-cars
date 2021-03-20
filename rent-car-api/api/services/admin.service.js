const knex = require("../../db/knex");
const { v4: uuidv4 } = require('uuid');

async function createAdmin(userGuid, admin) {
    const user = await knex("admin").select("id").where("guid", userGuid);
    const userExist = await knex("admin").select("id").where("login", admin.login);
    if (!!userExist[0]) {
        return {
            status: "error",
            message: "Użytkownik o podanym loginie istnieje"
        }
    }

    admin.guid = await uuidv4();
    if (user.length) {
        return knex("admin").insert(admin);
    }
    return {
        status: "error"
    };
}

async function login(userCredential) {
    const user = await knex("admin").where("login", userCredential.login).andWhere("haslo", userCredential.haslo).select("*");
    if (user.length) {
        return {
            guid: user[0].guid,
            status: "success"
        }
    }
    return {
        status: "error"
    };
}

async function logout(guid) {
    const user = await knex("admin").select("*").where("guid", guid);
    console.log(user);
    if (user.length) {
        user[0].guid = await uuidv4();
        await knex("admin").update(user[0]);
        return {
            status: "success"
        }
    }
    return {
        status: "error"
    };
}

module.exports = {
    createAdmin,
    login,
    logout
};