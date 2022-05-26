const jwt = require('jsonwebtoken');

// the secret will need to be put in proccess.env
const secret = 'mysecretsshhhhh';
const expiration = '2h';


// this was taken from 22.26, we will probably need to change some of it to make it work for us
module.exports = {
    authMiddleware: function ({ req }) {

        let token = req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token, please try again');
        }
        return req;

    },
    signToken: function ({ firstName, email, _id }) {
        const payload = { firstName, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};
