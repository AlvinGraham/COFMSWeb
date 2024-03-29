const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET blue forces by user
router.get('/blue/:id', (req, res) => {
  // GET route code here
  console.log('Getting Blue Forces for user id:', req.params.id);
  const queryText = `SELECT "blue_forces".id AS "id", "unit_id", 
    "units"."type" AS "type",  "quantity", "strength", 
    "units".country_code AS "country_code", "fe" FROM "blue_forces"
    JOIN "units" ON "blue_forces"."unit_id" = "units"."id"
    WHERE "blue_forces".user_id = $1 ORDER BY "blue_forces"."id"`;
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
  const queryText = `SELECT "red_forces".id AS "id", "unit_id", 
  "units"."type" AS "type",  "quantity", "strength", 
  "units".country_code AS "country_code", "fe" FROM "red_forces"
  JOIN "units" ON "red_forces"."unit_id" = "units"."id"
  WHERE "red_forces".user_id = $1 ORDER BY "red_forces"."id";`;
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

// PUT Routes
// PUT update to force row
router.put('/update', (req, res) => {
  const id = req.body.id;
  const strength = req.body.strength;
  const qty = req.body.qty;
  const affiliation = req.body.affiliation;
  const queryText = `UPDATE "${affiliation}_forces" SET "strength" = $1, 
  "quantity" = $2 WHERE id = $3;`;
  const queryArgs = [strength, qty, id];
  pool
    .query(queryText, queryArgs)
    .then((result) => {
      console.log(`Updated ${affiliation} row ID:`, id);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(`ERROR in ${affiliation} PUT:`, err);
      res.sendStatus(500);
    });
});

// DELETE force row
//blue
router.delete('/delete_blue/:id', (req, res) => {
  const id = req.params.id;

  const queryText = `DELETE FROM "blue_forces" WHERE "id" = $1`;
  const queryArgs = [id];
  pool
    .query(queryText, queryArgs)
    .then((result) => {
      console.log('Deleted Blue row ID:', id);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('ERROR /delete_blue/:id DELETE:', err);
      res.sendStatus(500);
    });
});

//red
router.delete('/delete_red/:id', (req, res) => {
  const id = req.params.id;

  const queryText = `DELETE FROM "red_forces" WHERE "id" = $1`;
  const queryArgs = [id];
  pool
    .query(queryText, queryArgs)
    .then((result) => {
      console.log('Deleted Red row ID:', id);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('ERROR /delete_red/:id DELETE:', err);
      res.sendStatus(500);
    });
});

// POST Routes
// POST insert new force to row
router.post('/', (req, res) => {
  const id = req.body.id;
  const user_id = req.body.user_id;
  const affiliation = req.body.affiliation;
  const queryText = `INSERT INTO "${affiliation}_forces" ("unit_id", "user_id")
    VALUES ($1, $2);`;
  const queryArgs = [id, user_id];
  pool
    .query(queryText, queryArgs)
    .then((result) => {
      console.log(
        `Inserted unit ID:${id} into ${affiliation} for user ${user_id}`
      );
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(`ERROR in ${affiliation} POST:`, err);
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
