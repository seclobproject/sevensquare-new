import bcrypt from 'bcryptjs';

const users = [
    {
        sponser: null,
        name: 'Super Admin',
        email: 'seclobclt@gmail.com',
        phone: 9876543230,
        address: "Cyberpark, Calicut",
        packageChosen: null,
        password: bcrypt.hashSync('pass123', 10),
        isAdmin: true,
        isSuperAdmin: true,
        ownSponserId: "7hhmKA1",
        screenshot: null,
        referenceNo: null,
        earning: 0,
        unrealisedSalary: 0,
        unrealisedEarning: [],
        pinsLeft: 1,
        transactions: [],
        bankDetails: {},
        userStatus: "approved",
        children: [],
    },
]

export default users;