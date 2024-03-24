const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET results
router.get('/:user_id', async (req, res) => {
  // calculate and return blue_total_fe, red_total_fe, blue_losses, red_losses,
  //  blue_ratio, and red_ratio
  const user_id = +req.params.user_id;
  console.log('Calculating results for user id:', user_id);

  try {
    // Load Required data
    const blueForceListQuery = `SELECT "quantity", "strength", "units".fe, 
    ("quantity" * "strength" * "units".fe / 100) AS "product" 
    FROM "blue_forces" 
    JOIN "units" ON "blue_forces".unit_id = "units".id
    WHERE "blue_forces".user_id = $1;`;
    const redForceListQuery = `SELECT "quantity", "strength", "units".fe, 
    ("quantity" * "strength" * "units".fe / 100) AS "product" 
    FROM "red_forces" 
    JOIN "units" ON "red_forces".unit_id = "units".id
    WHERE "red_forces".user_id = $1;`;
    const blueForceList = (await pool.query(blueForceListQuery, [user_id]))
      .rows;
    const redForceList = (await pool.query(redForceListQuery, [user_id])).rows;
    // calculate total fe
    let blue_total_fe = 0;
    let red_total_fe = 0;
    blueForceList.forEach((row) => (blue_total_fe += row.product));
    redForceList.forEach((row) => (red_total_fe += row.product));
    console.log('blue_total_fe:', blue_total_fe, 'red_total_fe:', red_total_fe);
    // calculate ratios
    const blue_ratio = red_total_fe === 0 ? NaN : blue_total_fe / red_total_fe;
    const red_ratio = blue_total_fe === 0 ? NaN : red_total_fe / blue_total_fe;
    console.log('blue_ratio:', blue_ratio, 'red_ratio:', red_ratio);
    // calculate losses
    const coeffsQueryText = `SELECT "base", "exponent" FROM "equation_coefficients"
    JOIN "missions" ON "missions".equation_id = "equation_coefficients".id 
    WHERE "user_id" = $1;`;
    const coeffs = (await pool.query(coeffsQueryText, [user_id])).rows[0];
    const base = coeffs.base;
    const exp = coeffs.exponent;

    const blue_losses = base * (blue_total_fe / red_total_fe) ** -exp * 100;
    const red_losses =
      ((base * 1) / (blue_total_fe / red_total_fe) ** -exp) * 100;

    console.log('base:', base, 'exp:', exp);
    console.log('blue losses:', blue_losses, 'red_losses:', red_losses);

    const results = {
      blue_total_fe,
      red_total_fe,
      blue_ratio,
      red_ratio,
      blue_losses,
      red_losses,
    };
    res.send(results);
  } catch (err) {
    console.error('ERROR in /results/:user_id GET:', err);
    res.sendStatus(500);
  }
});

module.exports = router;
