var db = require("../models");
var express = require("express");
var app = express();
var axios = require("axios");
var cheerio = require("cheerio");



app.get("/", function(req, res) {
    res.render("index");
});

app.get("/articles", function(req, res) {

    db.Article
        .find({ saved: false })
        .then(function(dbArticle) {
            var hbsObject = {
                articles: dbArticle
            };
            res.render("index", hbsObject);
        })
        .catch(function(err) {
            res.json(err);
        });
});

app.get("/scrape", function(req, res) {

    axios.get("https://www.reddit.com/r/webdev").then(function(response) {
        var $ = cheerio.load(response.data);
        console.log("test");
        $("p.title").each(function(i, element) {

            var result = {};

            result.title = $(this).text();
            result.link = $(this).children().attr("href");

            db.Article.create(result).then(function(dbArticle) {
                console.log(dbArticle);
            }).catch(function(err) {
                return res.json(err);
            });
        });
        res.redirect("/articles");
    });
});


app.get("/saved", function(req, res) {
    db.Article
        .find({ saved: true })
        .then(function(dbArticle) {

            var hbsObject = {
                articles: dbArticle
            };
            res.render("saved", hbsObject);
        })
        .catch(function(err) {
            res.json(err);
        });
});

app.post("/saved/:id", function(req, res) {
    var articleID = req.params.id;

    db.Article
        .findOneAndUpdate({ _id: articleID }, { saved: true })
        .then(function(dbArticle) {
            console.log("Article saved");
            res.redirect("/articles");
        })
        .catch(function(err) {
            res.json(err);
        });
});

app.post("/unsave/:id", function(req, res) {
    var articleID = req.params.id;

    db.Article
        .findOneAndUpdate({ _id: articleID }, { saved: false })
        .then(function(dbArticle) {
            console.log("Article unsaved");
            res.redirect("/saved");
        })
        .catch(function(err) {
            res.json(err);
        });
});



module.exports = app;
