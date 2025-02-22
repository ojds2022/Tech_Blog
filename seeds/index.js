const sequelize = require('../config/connection');
const seedUsers = require('./users-seeds');
const seedBlogPosts = require('./blog-posts-seeds');

const seedAll = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('\n----- DATABASE SYNCED -----\n');
        await seedUsers();
        console.log('\n----- USERS SEEDED -----\n');
        await seedBlogPosts();
        console.log('\n----- BLOG POSTS SEEDED -----\n');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAll();