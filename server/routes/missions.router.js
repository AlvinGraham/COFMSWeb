const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET units
router.get('/list', (req, res) => {
  // GET route code here
  console.log('Getting Missions');
  const queryText = `SELECT * FROM "mission_types" ORDER BY "id";`;

  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('ERROR in UNITS GET:', err);
      res.sendStatus(500);
    });
});

module.exports = router;
