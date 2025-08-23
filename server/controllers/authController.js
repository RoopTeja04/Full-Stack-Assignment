const student = require("../models/student");

exports.CreateAccount = async (req, res) => {

    const { firstName, lastName, emailID, password } = req.body;

    try {

        const exisitingEmail = await student.findOne({ emailID })

        if (exisitingEmail) {
            return res.status(400).json({ message: "User already exists!" });
        }

        await student.create({
            firstName, lastName, emailID, password
        })

        return res.status(201).json({
            message: `account is for ${firstName} ${lastName} created successfully.`
        });

    }
    catch (err) {
        res.status(500).json({ message: "Server Down" })
    }

}