module.exports = (sequelize, DataTypes) => sequelize.define(
    'order_goods',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        order_id: { type: DataTypes.INTEGER, allowNull: false },
        goods_id: { type: DataTypes.INTEGER, allowNull: false },
        single_price: { type: DataTypes.FLOAT, allowNull: false },
        count: { type: DataTypes.INTEGER, allowNull: false },
        created_at: { type: DataTypes.DATE },
        updated_at: { type: DataTypes.DATE }
    },
    {
        tableName: 'order_goods'
    }
)