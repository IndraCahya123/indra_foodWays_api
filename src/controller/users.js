const Joi = require("joi");
const { User, Product } = require("../../models");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ["password", "createdAt", "updatedAt"],
            }
        });

        res.send({
            status: "success",
            message: "Success to Get All Users",
            data: {
                users,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Error",
            message: "Server Error",
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const userSelected = await User.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ["role", "password", "createdAt", "updatedAt"]
            }
        });

        //check if user exist
        if (!userSelected) 
            return res.status(404).send({
                status: "Error",
                message: "User doesn't exist",
            });
            
        //check user
        if (userSelected && userSelected.id !== req.userId.id)
            return res.status(402).send({
                status: "Error",
                message: "You haven't authorization for edit this user"
            });
    
        await User.destroy({
            where: {
                id,
            },
        });
    
        res.send({
            status: "success",
            data: {
                id,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "error",
            message: "Server Error",
        });
    }
}

exports.editUser = async (req, res) => {
    try {
        const { id } = req.params;

        //search user
        const userSelected = await User.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ["role", "password", "createdAt", "updatedAt"]
            }
        });

        //check if user exist
        if (!userSelected) 
            return res.status(404).send({
                status: "Error",
                message: "User doesn't exist",
            });
            
        //check user
        if (userSelected && userSelected.id !== req.userId.id)
            return res.status(402).send({
                status: "Error",
                message: "You haven't authorization for edit this user"
            });
        
        const schemaEditUserInput = Joi.object({
            fullname: Joi.string().min(3).max(50),
            email: Joi.string().email().max(50),
            phone: Joi.string().min(10).max(13),
            location: Joi.string().min(10).max(75),
        });
            
        const { error } = schemaEditUserInput.validate(req.body);

        if (error)
        return res.status(400).send({
            status: "There's error in your data input",
            message: error.details[0].message,
        });

        let newImage;

        if (req.files.image === undefined) {
            newImage = userSelected.image;
        } else {
            newImage = req.files.image[0].filename;
        }

        const userUpdated = {
            ...req.body,
            image: newImage
        }

        await User.update(userUpdated, {
            where: {
                id
            }
        });

        res.send({
            status: "success",
            message: "Update Success",
            data: {
                dataUpdated : userUpdated
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "error",
            message: "Server Error",
        });
    }
}