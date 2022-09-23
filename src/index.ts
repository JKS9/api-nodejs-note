import app from './app';
import connectDB from './config/connect';
import 'dotenv/config';

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('🚀 Listening on ' + PORT + '🚀');
  connectDB();
});
