const express = require('express');
const router = express.Router();

const UsuariosController = require('../controllers/usuario');

router.get('/usuario', UsuariosController.listarUsuarios);

module.exports = router;