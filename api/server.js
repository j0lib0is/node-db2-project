const express = require('express');

const server = express();
server.use(express.json());

const carsRouter = require('./cars/cars-router');
server.use('/api/cars', carsRouter);

// DO YOUR MAGIC

module.exports = server;
