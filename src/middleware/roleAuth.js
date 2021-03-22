const { User } = require("../../models");

exports.partnerAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.userId.id,
            },
        });

        if (user.role === "partner") {
            next();
        } else {
            res.status(401).send({
                status: "failed",
                message: "You haven't authorization to access this page",
            });
        }
    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: "Server error",
        });
    }
};

    exports.userAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.userId.id,
            },
        });

        if (user.role === "user") {
            next();
        } else {
            res.status(401).send({
                status: "failed",
                message: "You haven't authorization to access this page",
            });
        }
    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }
};