const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ message: 'Acceso denegado.' });
    
    try {
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token inválido o expirado.' });
    }
  
};

module.exports = { verifyToken };