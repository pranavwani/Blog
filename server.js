const express = require('express')
const app = express()
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const Article = require('./models/article');
const articleRouter = require('./routes/articles')

mongoose.connect('mongodb://localhost/blog', () => {
    console.log('connected');
})

app.set('view engine', 'ejs')

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))
app.use('/articles', articleRouter)

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })

    res.render('articles/index', { articles })
})

app.listen(3000)