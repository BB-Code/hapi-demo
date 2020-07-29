'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        user_id: {
          type: Sequelize.STRING,
          allowNull: false
        },
        payment_status: {
          type: Sequelize.ENUM('0', '1'), // 0 未支付 1 支付
          defaultValue: '0'
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('orders');
  }
};
