const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const app = express();
const {stringSwap, replaceAt, addStringNoise} = require('./utils');
const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, ".", "build");
const server = http.createServer(app);
const {faker} = require("@faker-js/faker")
var corsOptions = {
  origin: "http://localhost:" + PORT.toString(),
};
var counter = 0;
String.prototype.replaceAt = replaceAt;

// Helper functions

let getRow = () => {
  return {
    id: faker.random.alphaNumeric(30),
    first_name: faker.name.firstName(),
    middle_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    city: faker.address.city(),
    zip: faker.address.zipCode(),
    street: faker.address.street(),
    number: faker.address.buildingNumber(),
    phone: faker.phone.number()
  }
}

const getRowWithErr = (faker, seed, row, err) => {
  counter += err;
  while(counter >= 1){
    faker.seed(seed);
    var randCellIndex = faker.datatype.number({ min: 1, max: 8, precision: 1}),
        errPos = faker.datatype.number({min: 0, max: row[Object.keys(row)[randCellIndex]].length-1, precision: 1}),
        errType = faker.datatype.number({min: 1, max: 3, precision: 1});
    row[Object.keys(row)[randCellIndex]] = addStringNoise(errType, row[Object.keys(row)[randCellIndex]], errPos);
    seed++; counter--;
  }
  faker.seed(seed);
  return row;
}

// Request handlers

const handleGetEntries = (req, res) => {
  let seed = parseInt(req.query.seed), responseArr = [];
  seed += parseInt(req.query.offset);
  faker.setLocale(req.query.region);
  for(let i=0; i<15; i++, seed++){
    faker.seed(seed);
    responseArr.push(getRowWithErr(faker, seed, getRow(), parseFloat(req.query.err)));
  }
  res.send(responseArr);
}

// Driver code

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/api/getEntries', handleGetEntries);
app.use(express.static(publicPath));
app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
