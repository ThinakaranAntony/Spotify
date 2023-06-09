const { Model } = require('objection');
const knex = require('../../config/dbconfig');
Model.knex(knex);

class Users extends Model {
    static get tableName() {
        return 'users';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                username: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
            }
        }
    }
}
module.exports = Users;