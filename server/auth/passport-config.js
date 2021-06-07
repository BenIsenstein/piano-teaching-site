const LocalStrategy = require("passport-local").Strategy
const { findUserById, findUserByName } = require('../models/db')
const bcrypt = require('bcrypt')

function initialize(passport) {
    const verifyUser = async (username, password, done) => {
        const user = await findUserByName(username)
        if (!user) {
            return done(null, false, { message: 'There is no user with that name.' })
        }
        
        try {
            console.log('password compare: ', await bcrypt.compare(password, user.password))
            if (await bcrypt.compare(password, user.password)) {
                console.log(`Login worked! (user ${user.username} found and bcrypt compared passwords)`)
                return done(null, user)
            }
            else {
                return done(null, false, { message: 'Password incorrect.' })
            }
        } 
        catch(e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy(verifyUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser(async (id, done) => {
        const user = await findUserById(id)
        return done(null, user)
    })
}

module.exports = initialize