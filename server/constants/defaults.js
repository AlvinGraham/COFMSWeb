require('dotenv').config();

const DEFAULT_MISSION = process.env.DEFAULT_MISSION || 'Meeting Engagement';

module.exports = {
  DEFAULT_MISSION,
};
