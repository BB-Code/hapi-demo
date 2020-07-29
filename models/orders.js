module.exports = (sequelize, DataTypes) => sequelize.define(
    'orders',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        payment_status: {
            type: DataTypes.ENUM('0', '1'), // 0 未支付 1 支付
            defaultValue: '0'
        },
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE
    },
    {
        tableName: 'orders'
    }
);

