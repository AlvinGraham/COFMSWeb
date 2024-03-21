const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET blue forces by user
router.get('/blue/:id', (req, res) => {
  // GET route code here
  console.log('Getting Blue Forces for user id:', req.params.id);
  const queryText = `SELECT "unit_id", "units"."type" AS "type",  "quantity", "strength", "units".country_code AS "country_code" FROM "blue_forces"
  JOIN "units" ON "blue_forces"."unit_id" = "units"."id"
  WHERE "blue_forces".user_id = $1;`;
  const queryArgs = [req.params.id];
  pool
    .query(queryText, queryArgs)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('ERROR in /blue:id GET:', err);
      res.sendStatus(500);
    });
});

// GET red forces by user
router.get('/red/:id', (req, res) => {
  // GET route code here
  console.log('Getting red Forces for user id:', req.params.id);
  const queryText = `SELECT "unit_id", "units"."type" AS "type",  "quantity", "strength", "units".country_code AS "country_code" FROM "red_forces"
  JOIN "units" ON "red_forces"."unit_id" = "units"."id"
  WHERE "red_forces".user_id = $1;`;
  const queryArgs = [req.params.id];
  pool
    .query(queryText, queryArgs)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('ERROR in /blue:id GET:', err);
      res.sendStatus(500);
    });
});

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
