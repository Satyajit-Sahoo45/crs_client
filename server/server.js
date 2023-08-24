const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const { notFound } = require('./middleware/errorMiddleware')

dotenv.config()
connectDB()
const app = express()

app.use(express.json()) // to accept JSON data

app.use('/api/user', userRoutes);

app.use(notFound)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server running on port : ${PORT}`);
})