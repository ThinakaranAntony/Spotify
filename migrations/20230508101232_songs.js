/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("songs", table => {
        table.increments("id").primary();
        table.string("songname");
        table.string("moviename");
        table.string("music");
        table.string("lyrics");
        table.string("singername");
        table.string("songtype");
        table.string("Artist")
        table.integer("Likes")

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("songs");
};
