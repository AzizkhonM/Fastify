const controllers = require("../controllers/car.controller");

const routes = [
  {
    method: "GET",
    url: "/cars",
    handler: controllers.getCars,
  },
  {
    method: "GET",
    url: "/cars/:id",
    handler: controllers.getCarById,
  },
  {
    method: "POST",
    url: "/cars",
    handler: controllers.addCar,
  },
  {
    method: "PUT",
    url: "/cars/:id",
    handler: controllers.updateCar,
  },
  {
    method: "DELETE",
    url: "/cars/:id",
    handler: controllers.deleteCar,
  },
];

module.exports = routes;
