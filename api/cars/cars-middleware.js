const Cars = require('./cars-model');
const db = require('../../data/db-config');
const vinValidator = require('vin-validator');
const yup = require('yup');

const checkCarId = (req, res, next) => {
  Cars.getById(req.params.id)
    .then(car => {
      if (car) {
        next();
      } else {
        next({status: 404, message: `car with id ${req.params.id} is not found`});
      }
    })
    .catch(next);
};

const carSchema = yup.object({
  vin: yup.string().required('vin is missing'),
  make: yup.string().required('make is missing'),
  model: yup.string().required('model is missing'),
  mileage: yup.number().required('mileage is missing'),
  title: yup.string(),
  transmission: yup.string()
});


const checkCarPayload = async (req, res, next) => {
  try {
    const newCar = await carSchema.validate(req.body);
    next();
  } catch(err) {
    next({ status: 400, message: err.message });
  }
};

const checkVinNumberValid = async (req, res, next) => {
  try {
    const isValidVin = await vinValidator.validate(req.body.vin);
    if (isValidVin === true) {
      next()
    } else {
      next({status: 400, message: `vin ${req.body.vin} is invalid`});
    }
  } catch(err) {
    next(err);
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const matchingVins = await db('cars').where('vin', req.body.vin).first();
    if (matchingVins) {
      next({status: 400, message: `vin ${req.body.vin} already exists`});
    } else {
      next();
    }
  } catch(err) {
    next(err);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
};