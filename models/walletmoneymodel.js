const { Model } = require('objection');
const knex = require('../config/dbconfig');
Model.knex(knex);

class Walletmoney extends Model {
    static get tableName() {
        return 'walletmoney';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                Wallets: { type: 'integer' },

            }
        }
    }
}
module.exports = Walletmoney;