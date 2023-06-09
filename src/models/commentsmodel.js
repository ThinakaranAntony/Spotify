const { Model } = require('objection');
const knex = require('../../config/dbconfig');
Model.knex(knex);

class Comments extends Model {
    static get tableName() {
        return 'comments';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
            }
        }
    }
}
module.exports = Comments;