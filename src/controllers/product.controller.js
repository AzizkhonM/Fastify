const boom = require("boom");
const fs = require("fs");
const path = require("path");
const { v4 } = require("uuid");
const { read_file, write_file } = require("../fs/fs_api");


const getProducts = async (req, reply) => {
  try {
    let products = read_file("products.json");
    reply.code(200).send(products);
  } catch (err) {
    throw boom.boomify(err);
  }
};

const getProductById = async (req, reply) => {
  try {
    const product = read_file("products.json").find(p => p.id == req.params.id);
    if(!product){
      reply.code(404).send({
        msg: 'Product not found!'
      })
    }
    reply.code(200).send(product);
  } catch (err) {
    throw boom.boomify(err);
  }
};

const saveProduct = async (req, reply) => {
  try {
    const products = read_file("products.json");

    products.push({
      id: v4(),
      ...req.body
    })
    write_file("products.json", products)

    reply.code(201).send({
      msg: 'Product created!'
    });
  } catch (err) {
    throw boom.boomify(err);
  }
};

const updateProduct = async (req, reply) => {
  try {
    const { title, price, description } = req.body;
    const { id } = req.params;
    const products = read_file("products.json");

    const foundedProduct = products.find(p => p.id == id);
    if(!foundedProduct){
     return reply.code(404).send({
        msg: 'Product not found!'
      });
    }

    products.forEach((product) => {
      if(product.id == id){
        product.title = title ? title : product.title;
        product.price = price ? price : product.price
        product.description = description ? description : product.description
      }
    })

    write_file("products.json", products)

    reply.code(200).send({
      msg: "Product updated!"
    });
  } catch (err) {
    throw boom.boomify(err);
  }
};

const deleteProduct = async (req, reply) => {
  try {
    const { id } = req.params;
    let products = read_file("products.json");
    products.forEach((product, idx) => {
      if(product.id == id){
        products.splice(idx, 1);
      }
    })

    write_file("products.json", products)

    reply.code(204).send({
      msg: "Product deleted!"
    });
  } catch (err) {
    throw boom.boomify(err);
  }
};

module.exports = {
  getProducts,
  getProductById,
  saveProduct,
  updateProduct,
  deleteProduct,
};
