var express = require("express");
var path = require("path");
var app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

const axios = require('axios');

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/people/:id", function(req, res) {
    getOne("http://swapi.co/api/people/?page=", req.params.id, res);
});

app.get("/planets/:id", function(req, res) {
    getOne("http://swapi.co/api/planets/?page=", req.params.id, res);
});

app.get("/films/:id", function(req, res) {
    getOne("http://swapi.co/api/films/?page=", req.params.id, res);
});

app.get("/species/:id", function(req, res) {
    getOne("http://swapi.co/api/species/?page=", req.params.id, res);
});

app.get("/vehicles/:id", function(req, res) {
    getOne("http://swapi.co/api/vehicles/?page=", req.params.id, res);
});

app.get("/starships/:id", function(req, res) {
    getOne("http://swapi.co/api/starships/?page=", req.params.id, res);
});

function getOne(url, num, res) {
    axios.get(url + num)
    .then(data => {
        res.json(data.data);
    })
    .catch(error => {
        console.log(error);
        res.json(error);
    })
}

app.get("/allpeople", function(req, res) {
    var people = [];

    getAll(people, "http://swapi.co/api/people/", res)
    .then(data => {
        res.json(data)
    })
});

app.get("/allplanets", function(req, res) {
    var planets = [];

    getAll(planets, "http://swapi.co/api/planets/", res)
    .then(data => {
        res.json(data)
    })
});

app.get("/allspecies", function(req, res) {
    var species = [];

    getAll(species, "http://swapi.co/api/species/", res)
    .then(data => {
        res.json(data)
    })
});

app.get("/allvehicles", function(req, res) {
    var vehicles = [];

    getAll(vehicles, "http://swapi.co/api/vehicles/", res)
    .then(data => {
        res.json(data)
    })
});

app.get("/allstarships", function(req, res) {
    var starships = [];

    getAll(starships, "http://swapi.co/api/starships/", res)
    .then(data => {
        res.json(data)
    })
});

function getAll(arr, url, res) {
    return axios.get(url)
    .then(data => {
        arr = arr.concat(data.data.results);
        if (data.data.next) {
            return getAll(arr, data.data.next, res);
        }
        else {
            return arr;
        }
    })
    .catch(error => {
        console.log(error);
        res.json(error);
    })
}

app.listen(1234, function() {
    console.log("listening on port 1234");
});
