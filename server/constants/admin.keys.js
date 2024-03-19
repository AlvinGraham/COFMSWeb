require('dotenv').config();

const ADMIN_KEYS = process.env.ADMIN_KEYS.split(',') || [];

module.exports = {
  ADMIN_KEYS,
};
