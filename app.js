var request = require('request');
var cheerio = require('cheerio');
var express = require('express');
var app = express();

app.get("/linkedin", function(req, res) {
  request(req.param('url'), function(err, resp, body) {
    if (err)
      throw err;
    $ = cheerio.load(body);
    var current = [];
    $('.position.experience.vevent.vcard.summary-current').each(function() {
      var title = $('h3 > span', this).text().trim();
      var name = $('h4 span', this).text().trim();
      var description = $('p.description', this).text().trim();
      var company = {title: title, name: name, description: description};
      current.push(company);
    });
    var past = [];
    $('.position.experience.vevent.vcard.summary-past').each(function() {
      var title = $('h3 > span', this).text().trim();
      var name = $('h4 span', this).text().trim();
      var description = $('p.description', this).text().trim();
      var company = {title: title, name: name, description: description};
      past.push(company);
    });
    var education = [];
    $('.position.education.vevent.vcard').each(function() {
      var school = $('h3 a', this).text().trim();
      var degree = $('h4 span', this).text().trim();
      var attended = {degree: degree, school: school};
      education.push(attended);
    });
    var profile = {current: current, past: past, education: education};
    res.send(profile);
  });
});

var server = app.listen(9000, function() {
  console.log('Listening on port %d', server.address().port);
});