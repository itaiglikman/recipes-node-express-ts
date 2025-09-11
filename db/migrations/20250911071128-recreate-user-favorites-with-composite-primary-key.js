'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /** types intellisense:
* @param {import('sequelize').QueryInterface} queryInterface
* @param {typeof import('sequelize')} Sequelize
*/
    async up(queryInterface, Sequelize) {
        await queryInterface.dropTable('user_favorites');

        await queryInterface.createTable('user_favorites', {
            userId: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            recipeId: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'recipes',
                    key: 'id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        })
    },

    /** types intellisense:
* @param {import('sequelize').QueryInterface} queryInterface
* @param {typeof import('sequelize')} Sequelize
*/
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('user_favorites');

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
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        }, {
            indexes: [
                {
                    unique: true,
                    fields: ['userId', 'recipeId']
                }
            ]
        });
    }
};
