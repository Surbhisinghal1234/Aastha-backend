
import express from 'express'; 
import cors from 'cors'; 
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(); 

const app = express();

app.use(express.json());
app.use(cors({
  origin: '*',
}));

app.use(express.urlencoded({ extended: true }));

const connectToMongoDB = async () => {
  const username = process.env.MONGO_USERNAME;
  const password = encodeURIComponent(process.env.MONGO_PASSWORD);

  try {
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@cluster0.3j0ywmp.mongodb.net/myDatabase?retryWrites=true&w=majority`
    );
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error', error);
  }
};

connectToMongoDB();

//routes
import jobRoutes from './routes/JobRoutes.js';

app.use('/api/jobs', jobRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

