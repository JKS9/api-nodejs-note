import app from './app';
import connectDB from './config/connect';
import 'dotenv/config';

const PORT: number | string = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log('🚀 Listening on ' + PORT + '🚀');
  connectDB();
});
