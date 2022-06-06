const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const session = require('express-session')
const mongoose = require('mongoose')

app.use(session({
    secret: 'asddoi32awheidqwddroijf2098hf40g8h24gh2h',
    saveUninitialized: true,
    resave: false
}))

mongoose.Promise = Promise
mongoose.connect('mongodb://localhost:27017/angulardb')
.then(() => console.log('Mongoose Up'))

const User = require('./models/users')

app.use(bodyParser.json())

app.post('/api/login', async (req, res) => {
    const {email, password} = req.body

    const result = await User.findOne({email, password})
    if (!result) {
        // user login is not found
        res.json({
            success: false, 
            message: "Incorrect logins"
        })
    } else {
        // make a session, set user to login
        res.json({
            success: true, 
        })
        req.session.email = email
        req.session.save()
    }
})

app.post('/api/register', async (req, res) => {
    const {email, password} = req.body

    const existingUser = await User.findOne({email})

    if (existingUser) {
        res.json({
            success: false,
            message: "Email is already registered."
        })
        return
    }

    const user = new User({
        email,
        password
    })

    const result = await user.save()
    console.log(result)
    // store user info in database
    res.json({
        success: true, 
        message: "Successfully registered!"
    })
})

app.post('/api/quote', async (req, res) => {
    console.log(req.session.email, req.body.value)
    const user = await User.findOne({email: req.session.email})
    if (!user) {
        res.json({
            success: false,
            message: 'Invalid user!'
        })
        return
    }

    await User.updateOne({email: req.session.email}, { $set: { quote: req.body.value}})
    res.json({
        success: true
    })
})

app.get('/api/isloggedin', (req, res) => {
    res.json({
        status: !!req.session.email
    })
})

app.get('/api/data', async (req, res) => {
    // console.log(req.session)
    const user = await User.findOne({email: req.session.email})

    
    if (!user) {
        res.json({
            status: false,
            message: 'User does not exist'
        })
        return
    }

    res.json({
        status: true,
        email: req.session.email,
        quote: user.quote
    })
    
})

app.get('/api/logout', (req, res) => {
    req.session.destroy()
    res.json({
        success: true
    })

})

app.listen(1234, () => console.log('Server listening at 1234'))