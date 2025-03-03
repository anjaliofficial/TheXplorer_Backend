const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        // Get token from the request headers
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Attach user info to the request object

            // Check if the user role is allowed
            if (roles.length && !roles.includes(decoded.type)) {
                return res.status(403).json({ message: 'Access denied. You do not have the right permissions.' });
            }

            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            return res.status(400).json({ message: 'Invalid token.' });
        }
    };
};

module.exports = authMiddleware;