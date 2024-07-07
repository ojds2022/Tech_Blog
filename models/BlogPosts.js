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
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'user_id',
            },
        },
        username: {
            type: DataTypes.STRING,
            references: {
               model: 'Users',
               key: 'username', 
            }
        }
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