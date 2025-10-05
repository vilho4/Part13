require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
})

const Blog = sequelize.define(
  'Blog',
  {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: 'blogs',
    timestamps: false,
  }
)

async function printBlogs() {
  try {
    await sequelize.authenticate()
    const blogs = await Blog.findAll()

    blogs.forEach((blog) => {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
    })

    await sequelize.close()
  } catch (error) {
    console.error('Database error:', error)
  }
}

printBlogs()
