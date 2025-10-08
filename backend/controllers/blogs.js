const router = require('express').Router()

const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.status(200).json(blogs)
})

router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    res.status(201).json(blog)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.status(200).json(req.blog)
  } else {
    res.status(404).json({ error: 'blog not found' })
  }
})

router.delete('/:id', blogFinder, async (req, res) => {
  if (!req.blog) {
    return res.status(404).json({ error: 'blog not found' })
  }
  await req.blog.destroy()
  res.status(204).end()
})

router.put('/:id', blogFinder, async (req, res) => {
  try {
    if (!req.blog) {
      return res.status(404).json({ error: 'blog not found' })
    }
    req.blog.likes += 1
    await req.blog.save()
    res.status(200).json(req.blog)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router
