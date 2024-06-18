const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const BlogPosts = require('./BlogPosts');

module.exports = {
    sequelize,
    Sequelize,
    BlogPosts
};