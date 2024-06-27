const { Users } = require('../models');
const bcrypt = require('bcrypt');

const userData = [
    {
        first_name: 'John',
        last_name: 'Doe',
        email_address: 'jdoe@hotmail.com',
        username: 'jdoe@hotmail.com',
        password: 'helloWorld', // Replace with actual password
    },
    {
        first_name: 'Michael',
        last_name: 'Jordan',
        email_address: 'mj@hotmail.com',
        username: 'mj@hotmail.com',
        password: 'helloWorld', // Replace with actual password
    },
];

const seedUsers = async () => {
    try {
        const hashedUsers = await Promise.all(userData.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return { ...user, password: hashedPassword };
        }));

        await Users.bulkCreate(hashedUsers);
        console.log('Users seeded successfully');
    } catch (error) {
        console.error('Error seeding users:', error);
    }
};

module.exports = seedUsers;