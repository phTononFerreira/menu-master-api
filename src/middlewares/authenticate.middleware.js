import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

export default function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, restaurant) => {
            if (err) {
                return res.status(403).json({ error: 'Unauthorized' });
            }

            req.restaurant = restaurant;
            next();
        });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};
