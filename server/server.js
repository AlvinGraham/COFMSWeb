const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const forcesRouter = require('./routes/forces.router');
const unitsRouter = require('./routes/units.router');
const missionsRouter = require('./routes/missions.router');

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/forces', forcesRouter);
app.use('/api/units', unitsRouter);
app.use('/api/missions', missionsRouter);

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
