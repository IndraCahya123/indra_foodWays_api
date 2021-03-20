const { User, Product } = require("../../models");

const errorResponse = {
    status: "Error",
    message: "Server Error"
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: {
                model: User,
                as: "user",
                attributes: {
                    exclude: ["password", "image", "role", "createdAt", "updatedAt"],
                },
            },
            attributes: {
                exclude: ["userId", "UserId", "createdAt", "updatedAt"],
            }
        });

        res.send({
            status: "success",
            message: "Success to Get All Products",
            data: {
                products,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(...errorResponse);
    }
}

exports.getAllProductsByPartnerId = async (req, res) => {
    try {
        const { userId } = req.params;

        const products = await Product.findAll({
            where: {
                userId,
            },
            attributes: {
                exclude: ["userId", "UserId", "createdAt", "updatedAt"],
            }
        });

        console.log(products);

        res.send({
            status: "success",
            message: "Success to Get All Products By Partner",
            data: {
                products,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(...errorResponse);
    }
}

exports.getDetailProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findOne({
            where: {
                id,
            },
            include: {
                model: User,
                as: "user",
                attributes: {
                    exclude: ["password", "image", "role", "createdAt", "updatedAt"],
                },
            },
            attributes: {
                exclude: ["userId", "UserId", "createdAt", "updatedAt"],
            }
        });

        res.send({
            status: "success",
            message: "Success to Get Detail Product",
            data: {
                product,
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send(...errorResponse);
    }
}