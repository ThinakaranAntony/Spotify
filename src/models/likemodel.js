const { Model } = require('objection');
const knex = require('../../config/dbconfig');
Model.knex(knex);

class Like extends Model {
    static get tableName() {
        return 'like';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                songid: { type: 'integer' },
                userid: { type: 'integer' }
            }
        }
    }
}
module.exports = Like;

