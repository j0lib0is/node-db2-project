const router = require('express').Router();
const Cars = require('./cars-model');
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware');

router.get('/', (req, res, next) => {
	Cars.getAll()
		.then(cars => {
			res.json(cars);
		})
		.catch(next);
});

router.get('/:id', checkCarId, (req, res, next) => {
	Cars.getById(req.params.id)
		.then(car => {
			res.json(car);
		})
		.catch(next);
});

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next) => {
	Cars.create(req.body)
		.then(newCar => {
			res.status(201).json(newCar);
		})
		.catch(next);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customError: 'Hm. Something is wrong here.',
    message: err.message,
    stack: err.stack
  });
});

module.exports = router;