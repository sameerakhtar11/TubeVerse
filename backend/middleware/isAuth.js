import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized User || User does not  have Token" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            return res.status(401).json({ message: "Unauthorized User || User is not Valid" });
        }
        // req.userId = decodedToken;
        req.userId = decodedToken.userId
        next();
    } catch (error) {
        return res.status(500).json({ message: `isAuth error ${error}` });
    }
}

export default isAuthenticated;