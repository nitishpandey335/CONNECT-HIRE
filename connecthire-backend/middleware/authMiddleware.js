import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
  let token;
  
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized' });
    }
  }
  
  if(!token) {
    res.status(401).json({ message: 'No token provided' });
  }
};

export const roleCheck = (role) => (req, res, next) => {
  if(req.user && req.user.role === role) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
};