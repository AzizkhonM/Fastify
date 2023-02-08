const boom = require("boom");
const fs = require("fs");
const path = require("path");
const { v4 } = require("uuid");
const { read_file, write_file } = require("../fs/fs_api");


const getFruits = async (req, reply) => {
  try {
    let fruits = read_file("fruits.json");
    reply.code(200).send(fruits);
  } catch (err) {
    throw boom.boomify(err);
  }
};

const getFruitById = async (req, reply) => {
  try {
    const fruit = read_file("fruits.json").find(p => p.id == req.params.id);
    if(!fruit){
      reply.code(404).send({
        msg: 'Fruit not found!'
      })
    }
    reply.code(200).send(fruit);
  } catch (err) {
    throw boom.boomify(err);
  }
};

const addFruit = async (req, reply) => {
  try {
    const fruits = read_file("fruits.json");

    fruits.push({
      id: v4(),
      ...req.body
    })
    write_file("fruits.json", fruits)

    reply.code(201).send({
      msg: 'Fruit added!'
    });
  } catch (err) {
    throw boom.boomify(err);
  }
};

const updateFruit = async (req, reply) => {
  try {
    const { title, plant, price } = req.body;
    const { id } = req.params;
    const fruits = read_file("fruits.json");

    const foundedFruit = fruits.find(p => p.id == id);
    if(!foundedFruit){
     return reply.code(404).send({
        msg: 'Fruit not found!'
      });
    }

    fruits.forEach((fruit) => {
      if(fruit.id == id){
        fruit.title = title ? title : fruit.title;
        fruit.price = price ? price : fruit.price
        fruit.plant = plant ? plant : fruit.plant
      }
    })

    write_file("fruits.json", fruits)

    reply.code(200).send({
      msg: "Fruit updated!"
    });
  } catch (err) {
    throw boom.boomify(err);
  }
};

const deleteFruit = async (req, reply) => {
  try {
    const { id } = req.params;
    let fruits = read_file("fruits.json");
    fruits.forEach((fruit, idx) => {
      if(fruit.id == id){
        fruits.splice(idx, 1);
      }
    })

    write_file("fruits.json", fruits)

    reply.code(204).send({
      msg: "Fruit deleted!"
    });
  } catch (err) {
    throw boom.boomify(err);
  }
};

module.exports = {
  getFruits,
  getFruitById,
  addFruit,
  updateFruit,
  deleteFruit ,
};
