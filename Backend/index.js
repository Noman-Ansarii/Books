import express from "express";
import axios from 'axios'
import cors from 'cors'
const app = express();

app.use(cors());

app.get('/api/books', async (req, res) => {
    try {
        const response = await axios.get('https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json');
        const books = response.data;
        res.json(books);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({error: 'Failed to fetch data'});
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})