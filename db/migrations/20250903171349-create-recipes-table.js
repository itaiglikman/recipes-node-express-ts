'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /** types intellisense:
* @param {import('sequelize').QueryInterface} queryInterface
* @param {typeof import('sequelize')} Sequelize
*/
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('recipes', {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: Sequelize.literal('(UUID())'),
                unique: true,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
            },
            ingredients: {
                type: Sequelize.JSON, // json array - the valid way to store array in mysql
                allowNull: false,
                defaultValue: [],
            },
            instructions: {
                type: Sequelize.JSON, // json array - the valid way to store array in mysql
                allowNull: false,
                defaultValue: [],
            },
            cookingTime: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            servings: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            difficulty: {
                type: Sequelize.ENUM('easy', 'medium', 'hard'),
                allowNull: false,
                defaultValue: 'easy',
            },
            imageURL: {
                type: Sequelize.STRING,
            },
            isPublic: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                // get updates when parents are changed:
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                type: Sequelize.DATE,
            },
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('recipes');
    }
};
