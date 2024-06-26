const { Users } = require('../models');

const userData = [
    {
        first_name: 'John',
        last_name: 'Doe',
        email_address: 'jdoe@hotmail.com',
        username: 'jdoe@hotmail.com',
        password: '12345',
    },
    {
        first_name: 'Michael',
        last_name: 'Jordan',
        email_address: 'mj@hotmail.com',
        username: 'mj@hotmail.com',
        password: '54321',
    },
];

const seedUsers = async () => await Users.bulkCreate(userData);

module.exports = seedUsers;