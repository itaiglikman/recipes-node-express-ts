'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /** types intellisense:
* @param {import('sequelize').QueryInterface} queryInterface
* @param {typeof import('sequelize')} Sequelize
*/
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user_favorites', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            recipeId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'recipes',
                    key: 'id'
                }
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        }, { 
            // unique bond so the foreign keys combination can happen only once
            // check how it works
            indexes: [
                {
                    unique: true,
                    fields: ['userId', 'recipeId']
                }
            ]
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('user_favorites');
    }
};
