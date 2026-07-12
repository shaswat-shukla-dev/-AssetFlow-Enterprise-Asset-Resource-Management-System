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