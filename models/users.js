module.exports = (sequelize, DataTypes) => sequelize.define(
    'users',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nick_name: DataTypes.STRING,
        avatar_url: DataTypes.STRING,
        gender: DataTypes.INTEGER,
        open_id: DataTypes.STRING,
        session_key: DataTypes.STRING,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE
    },
    {
        tableName: 'users'
    }
);