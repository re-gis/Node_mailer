const express = require('express')
const {exphbs} = require('express-handlebars')
const nodeMailer = require('nodemailer')
const bodyParser = require('body-parser')
const path = require('path')



const app = express()

// View engine setup
app.engine('handlebars', exphbs({
    layoutsDir: __dirname + '/views/layouts'
}))
app.set('view engine', 'handlebars')


// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')))


// Bodyparser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('contact')
})




app.listen(3000, () => {
    console.log('Server running on port 3000...');
})