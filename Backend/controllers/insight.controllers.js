const axios = require('axios');
const cheerio = require('cheerio');
const { InsightModel } = require('../models/insight.model');

async function getWordCountAndMediaFromURL(url) {
    try {
        let formattedURL = url;
        if (!url.startsWith('https://')) {
            formattedURL = 'https://' + url; 
        }
        const response = await axios.get(formattedURL);
        const html = response.data;

        // Load HTML content into Cheerio
        const $ = cheerio.load(html);

        // Extract text content for word count
        const text = $('body').text();
        
        const words = text.split(/\s+/).filter(word => word.length > 0);
        // console.log(words);
        const wordCount = words.length;

        // Extract media URLs and details
        const imageDetails = [];
        $('img').each((index, element) => {
            const imageURL = $(element).attr('src');
            imageDetails.push(imageURL);
        });

        const videoDetails = [];
        $('video').each((index, element) => {
            const videoURL = $(element).attr('src');
            videoDetails.push(videoURL);
        });

        const weblinksDetails = [];
        $('a').each((index, element) => {
            const anchorLink = $(element).attr('href');
            weblinksDetails.push(anchorLink);
        });
        // Return word count and media details
        return { wordCount, images: imageDetails, videos:videoDetails , weblinks : weblinksDetails };
    } catch (error) {
        console.error('Error fetching website content:', error);
        throw error;
    }
}

const addInsighttoDb = async(req,res)=>{
    try {
        const { url } = req.body;
        const urldata = await getWordCountAndMediaFromURL(url);

        const newInsightDetails = new InsightModel({
            url:url,
            wordCount:urldata.wordCount,
            images:urldata.images,
            videos:urldata.videos,
            weblinks:urldata.weblinks,
            user:req.body.userId
        })
        await newInsightDetails.save();
        
        res.status(200).send(urldata)
    } catch (error) {
        console.log(error.message)
    }
}


const getAllInsight = async(req,res)=>{
    try {
        const allInsight = await InsightModel.find({user:req.body.userId}).sort({ createdAt: -1 });

        res.status(200).send(allInsight)
    } catch (error) {
        console.log(error.message)
    }
}

const getAllFav = async(req,res)=>{
    try {
        const allInsight = await InsightModel.find({favorite:true,user:req.body.userId}).sort({ updatedAt: -1 });

        res.status(200).send(allInsight)
    } catch (error) {
        console.log(error.message)
    }
}

const addToFav = async(req,res)=>{
    try {
        const { insightId } = req.params;
        const payload = {favorite:true}
        await InsightModel.findByIdAndUpdate({ _id: insightId }, payload);
        res.status(200).send({msg:"Added to favorite!"})
    } catch (error) {
        console.log(error.message)
    }
}

const deleteInsight = async(req,res)=>{
    try {
        const { insightId } = req.params;
        await InsightModel.findByIdAndDelete({ _id: insightId });
        res.status(200).send({msg:"Insight Deleted Sucessfully"})
    } catch (error) {
        console.log(error.message)
    }
}
module.exports={
    addInsighttoDb,
    getAllInsight,
    getAllFav,
    addToFav,
    deleteInsight
}