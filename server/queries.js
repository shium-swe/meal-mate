const Pool = require("pg").Pool

require('dotenv').config({ path: './config/.env'})

const pool = new Pool({
  user: process.env.PG,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY user_id ASC;', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows) 
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM users WHERE user_id = $1;', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows) 
  })
}

const addUsers = (request, response) => {
  const { username } = request.body
  pool.query('INSERT INTO users (user_name) VALUES ($1);', [username], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}

const updateUsers = (request, response) => {
  const id = parseInt(request.params.id)
  const { username } = request.body
  pool.query("UPDATE users SET user_name = $1 WHERE user_id = $2;"), [username, id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User modified with ID: ${id}`)
  }
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

   pool.query('DELETE FROM users WHERE user_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  addUsers,
  updateUsers,
  deleteUser,
}