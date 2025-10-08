const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['password_hash'] },
  })
  res.status(200).json(users)
})

router.post('/', async (req, res) => {
  try {
    const { username, name, password } = req.body

    if (!password || password.length < 3) {
      return res
        .status(400)
        .json({ error: 'Salasanan on oltava vähintään 3 merkkiä pitkä' })
    }

    const password_hash = await bcrypt.hash(password, 10)

    const user = await User.create({
      username,
      name,
      password_hash,
    })

    const userWithoutPassword = {
      id: user.id,
      username: user.username,
      name: user.name,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }

    res.status(201).json(userWithoutPassword)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['password_hash'] },
  })

  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:username', async (req, res) => {
  const { username } = req.params
  const { name } = req.body

  try {
    const user = await User.findOne({ where: { username } })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    user.name = name
    await user.save()

    const updatedUser = {
      id: user.id,
      username: user.username,
      name: user.name,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }

    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router
