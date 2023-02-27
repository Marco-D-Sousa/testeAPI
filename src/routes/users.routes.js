const { Router } = require('express');

const UsersControl = require('../controllers/UsersControl');

const usersRoutes = Router();
const usersControl = new UsersControl();

usersRoutes.get("/", usersControl.index);
usersRoutes.post("/calculate", usersControl.calculate);

module.exports = usersRoutes;