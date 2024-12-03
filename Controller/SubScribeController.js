const subscribemodal = require("../Model/Subscribe");


exports.ContactPost = (async (req, res) => {
    const { email } = req.body;

    const record = new subscribemodal({
        email
    });

    const result = await record.save();
    if (result) {
        res.json({
            status: true,
            message: "Request Sent Successfully!!.",
        });
    } else {
        res.json({
            status: false,
            error: result,
            message: "Failed to Contact.",
        });
    }
});


exports.ContactGet = catchAsync(async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const totalsubscribemodal = await subscribemodal.countDocuments();
        const Contactget = await subscribemodal.find({}).sort({ created_at: -1 })
            .skip(skip)
            .limit(limit);
        const totalPages = Math.ceil(totalsubscribemodal / limit);
        res.status(200).json({
            data: {
                Contactget: Contactget,
                totalsubscribemodal: totalsubscribemodal,
                totalPages: totalPages,
                currentPage: page,
                perPage: limit,
                nextPage: page < totalPages ? page + 1 : null,
                previousPage: page > 1 ? page - 1 : null,
            },
            msg: "Contact Get",
        });
    } catch (error) {
        res.status(500).json({
            msg: "Failed to fetch Contact get",
            error: error.message,
        });
    }
});

