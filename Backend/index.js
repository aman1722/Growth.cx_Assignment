const express = require("express");
const { connection } = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const { userRouter } = require("./routes/user.route");



const app = express();


app.use(cors());
app.use(express.json());

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Growth.cx word count app backend",
            version: "1.0.0",
            description:
                "",
        },
        servers: [
            {
                url: "http://localhost:8080/",
            },
        ],
    },
    apis: ["./docs/*.js"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));


app.get("/",async(req,res)=>{
    try {
        res.status(200).send({ok:true,msg:"Welcome to Growth.cx word count app backend."})
    } catch (error) {
        console.log("error in '/' route");
        res.status(501).send({ msg: "Internal Server error", error: error.message });
    }
})


app.use("/user",userRouter);









app.listen(process.env.PORT,async()=>{
    try {
        await connection;
        console.log("Connected to Db!");
    } catch (error) {
        console.log("Unable to connect Db!")
        console.log(error.message)
    }
    console.log(`Server is running on PORT ${process.env.PORT}`);
})