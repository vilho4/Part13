require('dotenv').config()

// require('dotenv').config({ path: '../.env' })

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 3001,
  SECRET: process.env.SECRET,
}
