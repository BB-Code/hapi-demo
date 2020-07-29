'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order_goods', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      order_id: { type: Sequelize.INTEGER, allowNull: false },
      goods_id: { type: Sequelize.INTEGER, allowNull: false },
      single_price: { type: Sequelize.FLOAT, allowNull: false },
      count: { type: Sequelize.INTEGER, allowNull: false },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('order_goods');
  }
};
