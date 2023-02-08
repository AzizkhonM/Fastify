const controllers = require("../controllers/fruit.controller");

const routes = [
  {
    method: "GET",
    url: "/fruits",
    handler: controllers.getFruits,
  },
  {
    method: "GET",
    url: "/fruits/:id",
    handler: controllers.getFruitById,
  },
  {
    method: "POST",
    url: "/fruits",
    handler: controllers.addFruit,
  },
  {
    method: "PUT",
    url: "/fruits/:id",
    handler: controllers.updateFruit,
  },
  {
    method: "DELETE",
    url: "/fruits/:id",
    handler: controllers.deleteFruit,
  },
];

module.exports = routes;
