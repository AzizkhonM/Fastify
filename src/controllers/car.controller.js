const boom = require("boom");
const fs = require("fs");
const path = require("path");
const { v4 } = require("uuid");
const { read_file, write_file } = require("../fs/fs_api");


const getCars = async (req, reply) => {
  try {
    let cars = read_file("cars.json");
    reply.code(200).send(cars);
  } catch (err) {
    throw boom.boomify(err);
  }
};

const getCarById = async (req, reply) => {
  try {
    const car = read_file("cars.json").find(p => p.id == req.params.id);
    if(!car){
      reply.code(404).send({
        msg: 'Car not found!'
      })
    }
    reply.code(200).send(car);
  } catch (err) {
    throw boom.boomify(err);
  }
};

const addCar = async (req, reply) => {
  try {
    const cars = read_file("cars.json");

    cars.push({
      id: v4(),
      ...req.body
    })
    write_file("cars.json", cars)

    reply.code(201).send({
      msg: 'Car added!'
    });
  } catch (err) {
    throw boom.boomify(err);
  }
};

const updateCar = async (req, reply) => {
  try {
    const { title, brand, price } = req.body;
    const { id } = req.params;
    const cars = read_file("cars.json");

    const foundedCar = cars.find(p => p.id == id);
    if(!foundedCar){
     return reply.code(404).send({
        msg: 'Car not found!'
      });
    }

    cars.forEach((car) => {
      if(car.id == id){
        car.title = title ? title : car.title;
        car.price = price ? price : car.price
        car.brand = brand ? brand : car.brand
      }
    })

    write_file("cars.json", cars)

    reply.code(200).send({
      msg: "Car updated!"
    });
  } catch (err) {
    throw boom.boomify(err);
  }
};

const deleteCar = async (req, reply) => {
  try {
    const { id } = req.params;
    let cars = read_file("cars.json");
    cars.forEach((car, idx) => {
      if(car.id == id){
        cars.splice(idx, 1);
      }
    })

    write_file("cars.json", cars)

    reply.code(204).send({
      msg: "Car deleted!"
    });
  } catch (err) {
    throw boom.boomify(err);
  }
};

module.exports = {
  getCars,
  getCarById,
  addCar,
  updateCar,
  deleteCar,
};
