import express from 'express';
import helmet from 'helmet';

import root from './routes/root';
import AuthenticationAccessToken from './middleware/authentication/authenticationAccessToken';
import NotFound from './middleware/notFound';

const app = express();

// Apply most middleware first
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(helmet());

// Apply routes before error handling
app.use('/api/', AuthenticationAccessToken);
app.use('/', root);

// Apply error handling last
app.use(NotFound);

export default app;
