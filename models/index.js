const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const BlogPosts = require('./BlogPosts');
const Users = require('./Users');

module.exports = {
    sequelize,
    Sequelize,
    BlogPosts,
    Users
};