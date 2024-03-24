const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { DEFAULT_MISSION } = require('../constants/defaults');

// GET mission list
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
      console.error('ERROR in missions/list GET:', err);
      res.sendStatus(500);
    });
});

// GET user missions
router.get('/:user_id', async (req, res) => {
  const user_id = +req.params.user_id;
  const queryArgs = [user_id];
  const queryArgsDefaultMission = [DEFAULT_MISSION];
  const queryExistingUser = `SELECT * from "missions" WHERE "user_id" = $1;`;

  try {
    const userResults = (await pool.query(queryExistingUser, queryArgs)).rows;
    console.log('Existing User: ', userResults, userResults.length);

    let missionID;
    let equationID;

    if (userResults.length === 0) {
      // create new user row in missions table
      // get mission id for 'Meeting Engagement'
      const queryDefaultMission = `SELECT "id" from "mission_types" WHERE "mission" = $1;`;
      console.log('Mission:', queryArgsDefaultMission);
      missionID = (
        await pool.query(queryDefaultMission, queryArgsDefaultMission)
      ).rows[0].id;
      console.log('Default Mission ID:', missionID);
      // get id from equation_coefficients table
      const queryEquation = `SELECT "id" from "equation_coefficients" 
        WHERE "red_mission" = $1 AND "blue_mission" = $2;`;
      const queryEquationArgs = [DEFAULT_MISSION, DEFAULT_MISSION];
      equationID = (await pool.query(queryEquation, queryEquationArgs)).rows[0]
        .id;
      console.log('Equation ID:', equationID);
      // Create new row
      const queryAddNew = `INSERT INTO "missions" ("user_id", "blue_mission_id", "red_mission_id", "equation_id")
        VALUES ($1, $2, $3, $4);`;
      const queryAddNewArgs = [user_id, missionID, missionID, equationID];
      console.log(queryAddNewArgs);
      await pool.query(queryAddNew, queryAddNewArgs);
      console.log('New row added');
    }
    console.log('Getting Mission Data Row!');
    const queryText = `SELECT "blue_mission_id", "red_mission_id", "equation_id" FROM "missions" 
      WHERE "user_id" = $1;`;
    const missionResponse = await pool.query(queryText, queryArgs);
    res.send(missionResponse.rows);
  } catch (err) {
    console.error('ERROR in missions/:id GET', err);
    res.sendStatus(500);
  }
});

// update mission
// PUT user missions
router.put('/update', async (req, res) => {
  const user_id = req.body.user_id;
  const blue_mission_id = req.body.blue_mission_id;
  const red_mission_id = req.body.red_mission_id;

  console.log('req.body:', req.body, `\nblue mission id: ${blue_mission_id}`);
  try {
    // get mission ids
    const missionIDQuery = `SELECT "mission" from "mission_types" WHERE "id" = $1;`;
    // get id from equation_coefficients table
    const blue_mission = (await pool.query(missionIDQuery, [blue_mission_id]))
      .rows[0].mission;

    const red_mission = (await pool.query(missionIDQuery, [red_mission_id]))
      .rows[0].mission;

    console.log('Blue Mission:', blue_mission, '\nRed Mission:', red_mission);
    const equationQuery = `SELECT "id" from "equation_coefficients"
        WHERE "red_mission" = $1 AND "blue_mission" = $2;`;
    const equationQueryArgs = [red_mission, blue_mission];
    const equationID = (await pool.query(equationQuery, equationQueryArgs))
      .rows[0].id;
    console.log('Equation ID:', equationID);
    // Update Mission Row
    const updateRowQuery = `UPDATE "missions" SET "blue_mission_id" = $1,
        "red_mission_id" = $2, "equation_id" = $3
        WHERE "user_id" = $4;`;
    const updateRowQueryArgs = [
      blue_mission_id,
      red_mission_id,
      equationID,
      user_id,
    ];
    console.log(updateRowQueryArgs);
    await pool.query(updateRowQuery, updateRowQueryArgs);
    console.log('Row Updated');

    res.sendStatus(201);
  } catch (err) {
    console.error('ERROR in missions/update PUT:', err);
    res.sendStatus(500);
  }
});

module.exports = router;
