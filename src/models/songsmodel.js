const { Model } = require('objection');
const knex = require('../../config/dbconfig');
Model.knex(knex);

class Songs extends Model {
    static get tableName() {
        return 'songs';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                songname: { type: 'string' },
                moviename: { type: 'string' },
                music: { type: 'string' },
                lyrics: { type: 'string' },
                singername: { type: 'string' },
                songtype: { type: 'string' },
            }
        }
    }
}
module.exports = Songs;

