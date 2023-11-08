const express = require("express");
const { addInsighttoDb, getAllInsight, getAllFav, addToFav, deleteInsight } = require("../controllers/insight.controllers");



const insightRouter = express.Router();



insightRouter.post("/",addInsighttoDb);


insightRouter.get("/getallinsight",getAllInsight);


insightRouter.get("/fav",getAllFav);


insightRouter.patch("/addtofav/:insightId",addToFav);


insightRouter.delete("/delete/:insightId",deleteInsight)


module.exports={
    insightRouter
}