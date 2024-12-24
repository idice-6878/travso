const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Check if the Authorization header is present
    if (!authHeader) {
        return res.status(403).json({ error: "Access Denied. No token provided." });
    }

    // Extract the token from the "Bearer <token>" format
    const token = authHeader.split(' ')[1]; // Assuming the format is "Bearer <token>"
    // console.log("=======token=====>", token);
    if (!token) {
        return res.status(403).json({ error: "Access Denied. Token not found in header." });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);

        // Attach decoded data to the request object
        req.user = decoded;
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error("Error verifying token:", err);
        return res.status(401).json({ error: "Invalid or expired token." });
    }
};

module.exports = verifyToken;
