const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const { ADMIN_KEYS } = require('../constants/admin.keys');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', async (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const admin = req.body.admin;

  // check for existing user name
  usersQuery = `SELECT "name" FROM "users" WHERE "name" = $1;`;
  // console.log('admin:', admin);

  try {
    // validate adminKey Entry for creation of admin users
    if (admin === 'true') {
      // console.log('adminKey:', req.body.adminKey);
      if (!req.body.adminKey) {
        console.log('No Admin Key provided!');
        console.log('User registration failed: ');
        res.sendStatus(511);
        return;
      }
      let adminKeyAuth = false;
      for (const adminKey of ADMIN_KEYS) {
        if (adminKey === req.body.adminKey) {
          adminKeyAuth = true;
          break;
        }
      }
      if (!adminKeyAuth) {
        console.log('Unauthorized Admin Key provided!');
        console.log('User registration failed: ');
        res.sendStatus(511);
        return;
      }
    }

    // Check for Duplicate Usernames
    const userList = await pool.query(usersQuery, [req.body.username]);
    console.log('username:', userList.rows, 'length:', userList.rows.length);

    if (userList.rows.length === 0) {
      const queryText = `INSERT INTO "users" (name, password, admin)
      VALUES ($1, $2, $3) RETURNING id`;
      pool
        .query(queryText, [username, password, admin])
        .then(() => res.sendStatus(201));
    } else {
      console.log('username already exists:', req.body.username);
      res.send('User Name Already Exists');
      return;
    }
  } catch (err) {
    console.log('User registration failed: ', err);
    res.sendStatus(500);
  }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
