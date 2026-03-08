const express = require('express');
const app = express();
const path = require('path');
const PORT = 3001;
const pool = require('./config/database'); 
require('./config/dotenv');

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

app.get('/api/stocks', async (req, res) => {
    const search = req.query.search;
    try {
        let result;
        if (search){
            result = await pool.query(
                "SELECT * FROM stocks WHERE ticker ILIKE $1 OR name ILIKE $1", 
                [`%${search}%`]
            );
        }
        else {
            result = await pool.query('SELECT * FROM stocks ORDER BY ticker ASC');
        }
        res.json(result.rows); 
    } catch (err) {
        console.error("❌ Error fetching stocks:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/stock/:ticker', async (req, res) => {
    try{
        const requestedTicker = req.params.ticker.toUpperCase();
        const result = await pool.query('SELECT * FROM stocks WHERE ticker = $1', [requestedTicker]);
        const stock = result.rows[0];
        const numericPrice = parseFloat(stock.price.replace('$', ''));
        const priceColor = numericPrice > 200 ? '#388e3c' : '#d32f2f';
        if (stock) {
            res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css">
                    <title>${stock.name} | Details</title>
                </head>
                <body class="container">
                    <nav><a href="/">← Back to Watchlist</a></nav>
                    <article>
                        <header>
                            <h1>${stock.name} (${stock.ticker})</h1>
                        </header>
                        <p><strong>Sector:</strong> ${stock.sector}</p>
                        <p style="color: ${priceColor};"><strong>Current Price:</strong> ${stock.price}</p>
                        <footer>
                            <p>Detailed analysis for ${stock.name} is currently available.</p>
                        </footer>
                    </article>
                </body>
                </html>
            `);
        } else {
            res.status(404).send('<h1>Stock not found in our database.</h1>');
        }
    }
    catch(err){
        console.error("❌ Error fetching stock detail:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../views', '404.html'));
});

app.listen(PORT, () => {
    console.log(`Finance Server running at http://localhost:${PORT}`);
});