const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class BlogPosts extends Model {}

BlogPosts.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        blog_header: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        blog_content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'BlogPosts',
    }
);

module.exports = BlogPosts;