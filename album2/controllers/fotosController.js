var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');

const Foto = require('../models').foto;
const Etiqueta = require('../models').etiqueta;

module.exports = {
  findAllJson(req, res) {
    return Foto
      .findAll({
        attributes: { exclude: ["updatedAt"] },
        include: [{
          model: Etiqueta,
          attributes: ['texto'],
          through: { attributes: [] }
        }]
      })
      .then(fotos => res.json(fotos))
      .catch(error => res.status(400).send(error));
  },

  findAllView(req, res) {
    return Foto
      .findAll({
        attributes: { exclude: ["updatedAt"] }
      })
      .then(fotos => {
        res.render('fotos', { title: 'Fotos', arrFotos: fotos });
      })
      .catch(error => res.status(400).send(error));
  }
};