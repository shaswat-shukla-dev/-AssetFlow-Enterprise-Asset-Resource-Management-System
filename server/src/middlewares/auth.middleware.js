import { verifyToken } from "../utils/jwt.js";

export const authenticate = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({
            success:false,
            message:"Unauthorized"
        });

    }

    const token = authHeader.split(" ")[1];

    try{

        req.user=verifyToken(token);

        next();

    }
    catch(error){

        return res.status(401).json({
            success:false,
            message:"Invalid Token"
        });

    }

};

export const authorize = (...allowedRoles) => {

    return (req, res, next) => {

        if (!req.user) {

            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });

        }

        const userRole = req.user.roleName || req.user.role;

        if (!allowedRoles.includes(userRole)) {

            return res.status(403).json({
                success: false,
                message: "Forbidden: Insufficient Permissions"
            });

        }

        next();

    };

};