import jwt from "jsonwebtoken";

export const authenticate = (req, res, next)=>{
    const token = req.headers.authorization.split(" ")[1];

    if(!token){
        return res.status(401).json({
            error: "Missing Token"
        })
    }
    try {
        const validate = jwt.verify(
            token, 
            process.env.JWT_SECRET
        );
        if (!validate) {
            return res.status(401).json({
                error: "Invalid Token"
            })
        } 
        req.userId = decoded.userId  
    } catch (error) {
        return res.status(401).json({
                error: error.message
            }) 
    }

}

