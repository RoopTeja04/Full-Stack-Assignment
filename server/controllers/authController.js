const student = require("../models/student");

const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const GenerateJsonWebToken = (id) => {

    return jwt.sign(
        { id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_Expires_In || "2h" }
    )

}

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

exports.Login = async (req, res) => {

    const { emailID, password } = req.body;

    try {

        const findEmail = await student.findOne({ emailID });

        if (!findEmail) {
            return res.status(401).json({ message: "Invalid Emaill ID" });
        }

        const isMatch = await bycrypt.compare(password, findEmail.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        return res.status(200).json({
            _id: findEmail._id,
            firstName: findEmail.firstName,
            emailID: findEmail.emailID,
            token: GenerateJsonWebToken(findEmail._id),
        });

    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }

}