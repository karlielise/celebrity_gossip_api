const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const articles = [];

app.get("/", (req, res) => {
    axios("https://www.eonline.com/news")
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);

            $(".content-item__text", html).each(function (index, element) {
                const title = $(element).children('a').children('h3').text();
                const url = "eonline.com" + $(element).children('a').attr("href");
                articles.push({
                    title,
                    url
                })
            })
            res.json(articles)
        }).catch((err) => console.log(err));
})





app.listen(5000)