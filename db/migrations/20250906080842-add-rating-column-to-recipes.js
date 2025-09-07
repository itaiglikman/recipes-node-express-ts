'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /** types intellisense:
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {typeof import('sequelize')} Sequelize
 */
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('recipes', 'rating', {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0
        });
    },

    /** types intellisense:
    * @param {import('sequelize').QueryInterface} queryInterface
    * @param {typeof import('sequelize')} Sequelize
    */
    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('recipes', 'rating');
    }
};
