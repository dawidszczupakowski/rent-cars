const knex = require("knex");

const connectKnex = knex({
    client: "sqlite3",
    connection: {
        filename: "rent-cars.sqlite3"
    }
});

module.exports = connectKnex;