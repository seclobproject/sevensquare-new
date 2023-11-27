import bcrypt from 'bcryptjs';

const users = [
    {
        sponser: null,
        name: 'test-admin',
        email: 'test@gmail.com',
        phone: 9876543230,
        address: "Cyberpark, Calicut",
        packageChosen: null,
        password: bcrypt.hashSync('1234', 10),
        isAdmin: true,
        isSuperAdmin: true,
        ownSponserId: "7hhmKA1",
        screenshot: null,
        referenceNo: null,
        earning: 0,
        unrealisedSalary: 0,
        unrealisedEarning: [],
        pinsLeft: 0,
        transactions: [],
        userStatus: "approved",
        children: [],
    },
]

export default users;