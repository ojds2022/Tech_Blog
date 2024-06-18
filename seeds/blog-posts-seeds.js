const { BlogPosts } = require('../models');

const blogPostsData = [
    {
        blog_header: 'Object-Relational Mapping',
        blog_content: `I have really loved learning about ORMs. It's really simplified the way I create queries in SQL!`
    },
    {
        blog_header: 'Authentication vs. Authorization',
        blog_content: 'There is a difference between authentication and authorization. Authentication means confirming your own identity, whereas authorization means being allowed access to the system.'
    },
    {
        blog_header: 'Why MVC is so important',
        blog_content: 'MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.'
    }
];

const seedBlogPosts = async () => await BlogPosts.bulkCreate(blogPostsData);

module.exports = seedBlogPosts;