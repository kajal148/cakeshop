import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Kajal Varma',
        email: 'kajal@example.com',
        password: bcrypt.hashSync('12345', 10), //generally we should use the password asynchronously method
        isAdmin: true
    },
    {
        name: 'Jake Peralta',
        email: 'jake@example.com',
        password: bcrypt.hashSync('12345', 10)
    },
    {
        name: 'Amy Santiago',
        email: 'amy@example.com',
        password: bcrypt.hashSync('12345', 10)
    }
]


export default users;