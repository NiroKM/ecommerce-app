import bcrpt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrpt.hashSync('123456',10),
        isAdmin: true
    },
    {
        name: 'John Doe',
        email: 'jphn@example.com',
        password: bcrpt.hashSync('123456',10),
    },
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: bcrpt.hashSync('123456',10),
    }
]

export default users;