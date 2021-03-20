const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const { User } = require("../../models");

exports.userRegister = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validate input from user
        const schemaRegisterInput = Joi.object({
            fullname: Joi.string().min(3).max(50).required(),
            email: Joi.string().email().max(50).required(),
            password: Joi.string().min(8).max(50).required(),
            phone: Joi.string().min(10).max(13).required(),
            role: Joi.string().required()
        });
            
        const { error } = schemaRegisterInput.validate(req.body);

        if (error)
        return res.status(400).send({
            status: "There's error in your data input",
            message: error.details[0].message,
        });

        const checkEmail = await User.findOne({
        where: {
            email,
        },
        });
        if (checkEmail)
        return res.status(400).send({
            status: "Register failed",
            message: "Email already exist, please use another email",
        });

        const hashStrength = 10;
        const hashedPassword = await bcrypt.hash(password, hashStrength);

        const userCreated = await User.create({
        ...req.body,
        password: hashedPassword,
        location: "",
        image: "",
        });

        const secretKey = "secretkey@123";
        const token = jwt.sign(
        {
            id: userCreated.id,
        },
        secretKey
        );

        res.send({
        status: "success",
        message: "User Succesfully Registered",
        data: {
            user: {
            fullName: userCreated.fullname,
            email: userCreated.email,
            role: userCreated.role,
            token,
            },
        },
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
        status: "error",
        message: "Server Error",
        });
    }
}

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const schemaLoginInput = Joi.object({
            email: Joi.string().email().min(10).max(50).required(),
            password: Joi.string().min(8).max(50).required(),
        });
    
        const { error } = schemaLoginInput.validate(req.body);
    
        if (error)
            return res.status(400).send({
            status: "validation failed",
            message: error.details[0].message,
            });
    
        const checkUser = await User.findOne({
            where: {
            email,
            },
        });
    
        if (!checkUser)
            return res.status(400).send({
            status: "Login Failed",
            message: "Wrong email or password",
            });
    
        const isValidPass = await bcrypt.compare(password, checkUser.password);
    
        if (!isValidPass) {
            return res.status(400).send({
            status: "Login Failed",
            message: "Wrong email or password",
            });
        }
    
        const secretKey = "secretkey@123";
        const token = jwt.sign(
            {
            id: checkUser.id,
            },
            secretKey
        );
    
        res.send({
            status: "success",
            message: "Login Success",
            data: {
            user: {
                name: checkUser.fullname,
                email: checkUser.email,
                token,
            },
            },
        });
        } catch (err) {
        console.log(err);
        res.status(500).send({
            status: "error",
            message: "Server Error",
        });
    }
};