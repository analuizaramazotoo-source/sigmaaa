const express = require('express');
const router = express.Router();

const UsuariosController = require('../controllers/usuario');

router.get('/usuario', UsuariosController.listarUsuarios);
router.post('/usuario', UsuariosController.cadastrarUsuarios);
router.patch('/usuario', UsuariosController.editarUsuarios);
router.delete('/usuario', UsuariosController.apagarUsuarios);

module.exports = router;