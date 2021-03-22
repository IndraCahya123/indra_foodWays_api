const jwt = require("jsonwebtoken");

exports.authentication = (req, res, next) => {
    let header, token;

    if (
        !(header = req.header("Authorization")) ||
        !(token = header.replace("Bearer ", ""))
    ) {
        return res.status(400).send({
        status: "failed",
        message: "you haven't authentication",
        });
    }

    try {
        const secretKey = "secretkey@123";

        const verified = jwt.verify(token, secretKey);

        req.userId = verified;
        
        next();
    } catch (error) {
        res.status(400).send({
        status: "failed",
        message: "Invalid Token",
        });
    }
};