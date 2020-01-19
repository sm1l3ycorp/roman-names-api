const express = require('express');
const router = express.Router();
const fs = require('fs');
const namesRaw = fs.readFileSync('./names/names.txt');
const names = namesRaw.toString().split(',');

const filteredNames = (character) => {
  const filteredName = names.filter((name) => name.startsWith(character));
  return filteredName;
};

const getRandomName = () => {
  const name = names[Math.floor(Math.random() * names.length)];
  return name;
}

// returns all names in an array
router.get('/', function(req, res, next) {
  console.log(names.length);
  res.json(names);
});

//returns a name by character(s)
router.get('/search/:character?', function(req, res, next) {
  if (req.params.character !== undefined) {
    const camelCased = `${req.params.character.charAt(0).toUpperCase()}${req.params.character.slice(1).toLowerCase()}`
  res.json(filteredNames(camelCased));
  } else {
    res.json(names);
  }
});

//returns a random name
router.get('/random', function(req, res, next) {
  res.json(getRandomName());
});

module.exports = router;