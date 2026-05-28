const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resomeRoutes');
const aiRoutes = require('./routes/aiRoutes');
const historyRoutes = require('./routes/historyRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const atsRoutes = require('./routes/atsRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "*",
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/ats', atsRoutes);


app.get('/', (req, res) => {
  res.send('SmartPrep AI backend running!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server Running on port ${process.env.PORT}`);
});