const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const BlogPosts = require('./BlogPosts');
const Users = require('./Users');

// one user can be associated with many blog posts by user_id
Users.hasMany(BlogPosts, { foreignKey: 'user_id' });
// one user can be associated with many blog posts by username
Users.hasMany(BlogPosts, { foreignKey: 'username' });
// Each blog post belongs to a user by user_id
BlogPosts.belongsTo(Users, { foreignKey: 'user_id' });
//Each blog post belongs to a user by username
BlogPosts.belongsTo(Users, { foreignKey: 'username' });

module.exports = {
    sequelize,
    Sequelize,
    BlogPosts,
    Users
};