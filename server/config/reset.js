const pool = require('./database');
require('./dotenv');

const createStocksTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS stocks;

        CREATE TABLE IF NOT EXISTS stocks (
            id SERIAL PRIMARY KEY,
            ticker VARCHAR(10) UNIQUE NOT NULL,
            name VARCHAR(100) NOT NULL,
            sector VARCHAR(50),
            price VARCHAR(20)
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log('🎉 stocks table created successfully');
    } catch (err) {
        console.error('⚠️ error creating stocks table', err);
    }
};

const seedStocksTable = async () => {
    await createStocksTable();

    const stockData = [
        ['AAPL', 'Apple Inc.', 'Tech', '$180'],
        ['TSLA', 'Tesla', 'Automotive', '$240'],
        ['MSFT', 'Microsoft', 'Software', '$400'],
        ['V', 'Visa', 'Finance', '$260'],
        ['KO', 'Coca-Cola', 'Consumer Goods', '$60']
    ];

    const insertQuery = 'INSERT INTO stocks (ticker, name, sector, price) VALUES ($1, $2, $3, $4)';

    try {
        for (const stock of stockData) {
            await pool.query(insertQuery, stock);
            console.log(`✅ ${stock[0]} added`);
        }
    } catch (err) {
        console.error('⚠️ error seeding table', err);
    }
};

seedStocksTable();