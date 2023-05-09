/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("users", table => {
        table.increments("id").primary();
        table.string("username");
        table.string("password");
        table.string("email");
        table.string("role"); 
        table.integer("wallet").defaultTo(0)
        table.string("usertype").defaultTo("Non Premium User")       
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("users");
};
