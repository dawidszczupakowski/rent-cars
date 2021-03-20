const knex = require("knex");

const connectKnex = knex({
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
        filename: "rent-cars.sqlite3"
    }
});

module.exports = connectKnex;