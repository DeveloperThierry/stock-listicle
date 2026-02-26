const express = require('express');
const app = express();
const path = require('path');
const PORT = 3001;

const stocks = [
    { ticker: 'AAPL', name: 'Apple Inc.', sector: 'Tech', price: '$180' },
    { ticker: 'TSLA', name: 'Tesla', sector: 'Automotive', price: '$240' },
    { ticker: 'MSFT', name: 'Microsoft', sector: 'Software', price: '$400' },
    { ticker: 'V', name: 'Visa', sector: 'Finance', price: '$260' },
    { ticker: 'KO', name: 'Coca-Cola', sector: 'Consumer Goods', price: '$60' }
];

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/api/stocks', (req, res) => {
    res.json(stocks);
});

app.get('/stock/:ticker', (req, res) => {
    const requestedTicker = req.params.ticker.toUpperCase();
    const stock = stocks.find(s => s.ticker === requestedTicker);
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
});

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
    console.log(`Finance Server running at http://localhost:${PORT}`);
});