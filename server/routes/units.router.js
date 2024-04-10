const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET units
router.get('/', (req, res) => {
  // GET route code here
  console.log('Getting All Units');
  const queryText = `SELECT * FROM "units" ORDER BY "id";`;

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

// delete unit
router.delete('/:id', (req, res) => {
  // GET route code here
  console.log('Getting All Units');
  const queryText = `DELETE FROM "units" WHERE "id" = $1;`;
  const queryArgs = [req.params.id];

  pool
    .query(queryText, queryArgs)
    .then((result) => {
      console.log('Deleted Row with ID:', req.params.id);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('ERROR in UNITS DELETE/:id:', err);
      res.sendStatus(500);
    });
});

// Add Unit
router.post('/', (req, res) => {
  console.log('Adding unit to DB', req.body);
  const queryText = `INSERT INTO "units" ("type", "fe", "country_code", "affiliation")
  VALUES ($1, $2, $3, $4);`;
  const queryArgs = [
    req.body.type,
    +req.body.fe,
    req.body.country_code,
    req.body.affiliation,
  ];

  pool
    .query(queryText, queryArgs)
    .then((result) => {
      console.log(`Unit ${req.body.type} successfully written to DB`);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('ERROR in UNITS POST:', err);
      res.sendStatus(500);
    });
});

// Edit Unit
router.put('/', (req, res) => {
  console.log('Editing unit in DB', req.body);
  const queryText = `UPDATE "units" 
  SET "type" = $1, "fe" = $2, "country_code" = $3, "affiliation" = $4
  WHERE "id" = $5;`;
  const queryArgs = [
    req.body.type,
    +req.body.fe,
    req.body.country_code,
    req.body.affiliation,
    req.body.id,
  ];

  pool
    .query(queryText, queryArgs)
    .then((result) => {
      console.log(`Unit ${req.body.type} successfully updated in DB`);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('ERROR in UNITS PUT:', err);
      res.sendStatus(500);
    });
});

// GET countries
router.get('/countries', (req, res) => {
  console.log('Getting Countries');
  const queryText = `SELECT * FROM "countries" ORDER BY "id";`;

  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('ERROR in COUNTRIES GET:', err);
      res.sendStatus(500);
    });
});

module.exports = router;
