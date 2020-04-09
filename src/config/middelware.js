const jwt = require('jwt-simple');
const config = require('./config');
const moment = require('moment');

exports.ensureAuthenticated = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(403).send({
            status: 'fail',
            message: 'there is not an authentication header'
        });
    } else {
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.decode(token, config.TOKEN_SECRET)

        if(payload.exp <= moment().unix()){
            return res.status(401).send({
                status: 'fail',
                message: 'the token has expired'
            });
        } else {
            req.user = payload.sub;
            console.log(req.user);
            next();
        }
    }

}
