const express = require("express")
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const AuthRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Sever is Running SuccessFully !");
})

app.use("/auth", AuthRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB is Connected"))
    .catch((err) => console.error(err || err.message));

app.listen(process.env.PORT || 5000, () => console.log("The Port is Connected to 5000"))