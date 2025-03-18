const { Sequelize, Op } = require('sequelize');
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
  },

  findAllByRateJson(req, res) {
    const lower = parseFloat(req.query.lower);
    const higher = parseFloat(req.query.higher);

    if (lower > higher) {
      return res.status(400).json({ error: 'La calificación mínima debe ser menor que la máxima.' });
    }

    return Foto.findAll({
      attributes: { exclude: ["updatedAt"] },
      include: [{
        model: Etiqueta,
        attributes: ['texto'],
        through: { attributes: [] }
      }],
      where: {
        calificacion: {
          [Op.between]: [lower, higher]
        }
      }
    })
    .then(fotos => res.json(fotos))
    .catch(error => res.status(400).send(error));
  },

  mostrarFotosPorRango(req, res) {
    res.render('fotosPorRango');
  }
};