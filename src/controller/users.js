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