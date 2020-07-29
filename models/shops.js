module.exports = (sequelize, DataTypes) => sequelize.define(
    'shops',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        thumb_url: DataTypes.STRING
    },
    {
        tableName: 'shops'
    }
);