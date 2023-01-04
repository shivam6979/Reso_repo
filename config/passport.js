const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const AdMemModel = require('../model/adMemModel');
let secret = 'fgjgjghfhghghghgjhhghgjru57867868676ugjgjhghtut76767'


module.exports = function (passport){
    let params = {
        secretOrKey:secret,
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
    };
    passport.use(
        new JWTStrategy(params,function(jwt_payload,next){
            let email = jwt_payload.email;
            AdMemModel.findOne({email:email},function(err,AdMem){
                if(err){
                    return next(err,false)
                }
                if(AdMem){
                    next(null,AdMem)
                }
                else{
                    next(null,false)
                }
            })
        })
    )
}