const SequelizeMock = require('sequelize-mock');

// Create a new instance of SequelizeMock
const DBConnectionMock = new SequelizeMock();

// Mock the models
const AdminMock = DBConnectionMock.define('Admin', {
    email: 'admin@example.com',
    password: 'hashedpassword',
});

// Mock methods for Admin
AdminMock.$create = jest.fn().mockImplementation((data) => {
    return Promise.resolve({ ...data, id: 1 });
});
AdminMock.$findOne = jest.fn().mockImplementation(({ where }) => {
    if (where.email === 'admin@example.com') {
        return Promise.resolve({ email: 'admin@example.com', password: 'hashedpassword' });
    }
    return Promise.resolve(null);
});
AdminMock.$update = jest.fn().mockImplementation(() => {
    return Promise.resolve([1]); // Simulate one row affected
});
AdminMock.$destroy = jest.fn().mockImplementation(() => {
    return Promise.resolve(1); // Simulate one row deleted
});

// Mock the Agency model
const AgencyMock = DBConnectionMock.define('Agency', {
    agencyName: 'Test Agency',
    email: 'agency@example.com',
    contactNumber: '1234567890',
    agencyAddress: '123 Test St',
    password: 'hashedpassword',
});

// Mock methods for Agency
AgencyMock.$create = jest.fn().mockImplementation((data) => {
    return Promise.resolve({ ...data, id: 1 });
});
AgencyMock.$findOne = jest.fn().mockImplementation(({ where }) => {
    if (where.email === 'agency@example.com') {
        return Promise.resolve({ agencyName: 'Test Agency' });
    }
    return Promise.resolve(null);
});
AgencyMock.$update = jest.fn().mockImplementation(() => {
    return Promise.resolve([1]); // Simulate one row affected
});
AgencyMock.$destroy = jest.fn().mockImplementation(() => {
    return Promise.resolve(1); // Simulate one row deleted
});

// Mock the Customer model
const CustomerMock = DBConnectionMock.define('Customer', {
    name: 'John Doe',
    username: 'johndoe',
    email: 'customer@example.com',
    contactNumber: '0987654321',
    password: 'hashedpassword',
    gender: 'Male',
});

// Mock methods for Customer
CustomerMock.$create = jest.fn().mockImplementation((data) => {
    return Promise.resolve({ ...data, id: 1 });
});
CustomerMock.$findOne = jest.fn().mockImplementation(({ where }) => {
    if (where.email === 'customer@example.com') {
        return Promise.resolve({ name: 'John Doe' });
    }
    return Promise.resolve(null);
});
CustomerMock.$update = jest.fn().mockImplementation(() => {
    return Promise.resolve([1]); // Simulate one row affected
});
CustomerMock.$destroy = jest.fn().mockImplementation(() => {
    return Promise.resolve(1); // Simulate one row deleted
});

// Mock the Package model
const PackageMock = DBConnectionMock.define('Package', {
    name: 'Adventure Package',
    description: 'An exciting adventure package.',
    price: 299.99,
    duration: '5 days',
});

// Mock methods for Package
PackageMock.$create = jest.fn().mockImplementation((data) => {
    return Promise.resolve({ ...data, id: 1 });
});
PackageMock.$findOne = jest.fn().mockImplementation(({ where }) => {
    if (where.name === 'Adventure Package') {
        return Promise.resolve({ name: 'Adventure Package' });
    }
    return Promise.resolve(null);
});
PackageMock.$update = jest.fn().mockImplementation(() => {
    return Promise.resolve([1]); // Simulate one row affected
});
PackageMock.$destroy = jest.fn().mockImplementation(() => {
    return Promise.resolve(1); // Simulate one row deleted
});

// Mock the CRUD operations
describe('Mock CRUD Operations', () => {
    test('Create Admin', async () => {
        const admin = await AdminMock.$create({ email: 'admin@example.com', password: 'hashedpassword' });
        expect(admin.email).toBe('admin@example.com');
    });

    test('Read Admin', async () => {
        const admin = await AdminMock.$findOne({ where: { email: 'admin@example.com' } });
        expect(admin.email).toBe('admin@example.com');
    });

    test('Update Admin', async () => {
        const admin = await AdminMock.$update({ password: 'newhashedpassword' }, { where: { email: 'admin@example.com' } });
        expect(admin[0]).toBe(1); // Sequelize returns the number of affected rows
    });

    test('Delete Admin', async () => {
        const admin = await AdminMock.$destroy({ where: { email: 'admin@example.com' } });
        expect(admin).toBe(1); // Sequelize returns the number of deleted rows
    });

    test('Create Agency', async () => {
        const agency = await AgencyMock.$create({ agencyName: 'Test Agency', email: 'agency@example.com', contactNumber: '1234567890', agencyAddress: '123 Test St', password: 'hashedpassword' });
        expect(agency.agencyName).toBe('Test Agency');
    });

    test('Read Agency', async () => {
        const agency = await AgencyMock.$findOne({ where: { email: 'agency@example.com' } });
        expect(agency.agencyName).toBe('Test Agency');
    });

    test('Update Agency', async () => {
        const agency = await AgencyMock.$update({ agencyName: 'Updated Agency' }, { where: { email: 'agency@example.com' } });
        expect(agency[0]).toBe(1); // Sequelize returns the number of affected rows
    });

    test('Delete Agency', async () => {
        const agency = await AgencyMock.$destroy({ where: { email: 'agency@example.com' } });
        expect(agency).toBe(1); // Sequelize returns the number of deleted rows
    });

    test('Create Customer', async () => {
        const customer = await CustomerMock.$create({ name: 'John Doe', username: 'johndoe', email: 'customer@example.com', contactNumber: '0987654321', password: 'hashedpassword', gender: 'Male' });
        expect(customer.name).toBe('John Doe');
    });

    test('Read Customer', async () => {
        const customer = await CustomerMock.$findOne({ where: { email: 'customer@example.com' } });
        expect(customer.name).toBe('John Doe');
    });

    test('Update Customer', async () => {
        const customer = await CustomerMock.$update({ name: 'Jane Doe' }, { where: { email: 'customer@example.com' } });
        expect(customer[0]).toBe(1); // Sequelize returns the number of affected rows
    });

    test('Delete Customer', async () => {
        const customer = await CustomerMock.$destroy({ where: { email: 'customer@example.com' } });
        expect(customer).toBe(1); // Sequelize returns the number of deleted rows
    });

    test('Create Package', async () => {
        const pkg = await PackageMock.$create({ name: 'Adventure Package', description: 'An exciting adventure package.', price: 299.99, duration: '5 days' });
        expect(pkg.name).toBe('Adventure Package');
    });

    test('Read Package', async () => {
        const pkg = await PackageMock.$findOne({ where: { name: 'Adventure Package' } });
        expect(pkg.name).toBe('Adventure Package');
    });

    test('Update Package', async () => {
        const pkg = await PackageMock.$update({ price: 349.99 }, { where: { name: 'Adventure Package' } });
        expect(pkg[0]).toBe(1); // Sequelize returns the number of affected rows
    });

    test('Delete Package', async () => {
        const pkg = await PackageMock.$destroy({ where: { name: 'Adventure Package' } });
        expect(pkg).toBe(1); // Sequelize returns the number of deleted rows
    });
});