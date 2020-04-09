const JwtStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const config = require('config')
const passport = require('passport')
const secretOrKey = config.get('secretOrKey')
const User = require('../models/User')

const opts= {
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey
}

passport.initialize();

passport.use(new JwtStrategy(opts,async(jwt_payload,done)=>{
    try {
        const searchResult = await User.findById(jwt_payload.id).select('-password')
        searchResult ?done(null,searchResult): done(null,false)
    } catch (error) {
        console.log(error)
    }

}))

module.exports = isAuth =()=>passport.authenticate('jwt',{session: false})