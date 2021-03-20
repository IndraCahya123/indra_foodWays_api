const Joi = require("joi");

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

exports.addNewProduct = async (req, res) => {
    try {
        //check if there's no image uploaded
        if (!req.files) 
            return res.status(400).send({
                status: "Failed to add new product",
                message: "Please choose an image for your product",
            });
        

        //validate user input
        const schemaProductInput = Joi.object({
            title: Joi.string().min(4).max(100).required(),
            price: Joi.number().min(4).max(20).required()
        });

        const { error } = schemaProductInput.validate(req.body);

        if (error)
        return res.status(400).send({
            status: "There's error in your data input",
            message: error.details[0].message,
        });
        
        //logged partner id
        const { id } = req.userId;

        const user = await User.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ["password", "image", "role", "createdAt", "updatedAt"]
            }
        });
    
        const addProduct = await Product.create({
            ...req.body,
            image: req.files.image[0].filename,
            userId: id,
        });

        res.send({
            status: "success",
            message: "New Product Added",
            data: {
                product: {
                    id: addProduct.id,
                    title: addProduct.title,
                    image: addProduct.image,
                    user,
                }
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send(...errorResponse);
    }
}

exports.editProduct = async (req, res) => {
    try {
        
        //search product by id
        const { productId } = req.params;
        
        const productSelected = await Product.findOne({
            where: {
                id: productId,
            }
        });

        //if the logged partner not edited their own product
        const user = await User.findOne({
            where: {
                id: req.userId.id
            },
            attributes: {
                exclude: ["password", "image", "role", "createdAt", "updatedAt"]
            }
        });

        if (productSelected && user.id !== productSelected.userId)
            return res.status(401).send({
                status: "Error",
                message: "You haven't authorization to edit this product",
            });

        //check if product exist
        if (!productSelected) 
            return res.status(404).send({
                status: "Error",
                message: "Product doesn't exist",
            });
        

        //validate user input
        const schemaProductInput = Joi.object({
            title: Joi.string().min(4).max(100),
            price: Joi.number().min(4).max(20)
        });

        const { error } = schemaProductInput.validate(req.body);

        if (error)
        return res.status(400).send({
            status: "There's error in your data input",
            message: error.details[0].message,
        });

        let newImage;

        if (req.files.image === undefined) {
            newImage = productSelected.image;
        } else {
            newImage = req.files.image[0].filename;
        }

        const productNewInput = {
            ...req.body,
            image: newImage
        }

        //update product

        const product = await Product.update(productNewInput, {
            where: {
                id: productId
            }
        });

        res.send({
            status: "success",
            message: "Product Updated",
            data: {
                product: {
                    id: productSelected.id,
                    title: productSelected.title,
                    price: productSelected.price,
                    image: productSelected.image,
                    user,
                }
            }
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send(...errorResponse);
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        //search product
        const { productId } = req.params;
            
        const productSelected = await Product.findOne({
            where: {
                id: productId,
            }
        });
    
        //if the logged partner not edited their own product
        const user = await User.findOne({
            where: {
                id: req.userId.id
            },
            attributes: {
                exclude: ["password", "image", "role", "createdAt", "updatedAt"]
            }
        });
    
        if (productSelected && user.id !== productSelected.userId)
            return res.status(401).send({
                status: "Error",
                message: "You haven't authorization to delete this product",
            });
        
        //check if product exist
        if (!productSelected) 
            return res.status(404).send({
                status: "Error",
                message: "Product doesn't exist",
            });
        
        //deleting product
        await Product.destroy({
            where: {
                id: productId,
            },
        });
        
        res.send({
            status: "success",
            data: {
                id: productId,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(...errorResponse);
    }
}