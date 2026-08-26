const express = require('express');
const router = express.Router();

// Referência aos controllers que serão utilizados nas rotas

const UsuariosController = require('../controllers/usuario');
router.get('/usuarios', UsuariosController.listarUsuarios);
router.post('/usuarios', UsuariosController.cadastrarUsuarios);
router.patch('/usuarios', UsuariosController.editarUsuarios);
router.delete('/usuarios', UsuariosController.apagarUsuarios);


const PerfilGestorController = require('../controllers/perfil_gestor');
router.get('/perfil-gestor', PerfilGestorController.listarPerfilGestor);
router.post('/perfil-gestor', PerfilGestorController.cadastrarPerfilGestor);
router.patch('/perfil-gestor', PerfilGestorController.editarPerfilGestor);
router.delete('/perfil-gestor', PerfilGestorController.apagarPerfilGestor);


const AvaliacaoAtendimentoController = require('../controllers/avaliacao_atendimento');
router.get('/avaliacoes', AvaliacaoAtendimentoController.listarAvaliacoes);
router.post('/avaliacoes', AvaliacaoAtendimentoController.cadastrarAvaliacoes);
router.patch('/avaliacoes', AvaliacaoAtendimentoController.editarAvaliacoes);
router.delete('/avaliacoes', AvaliacaoAtendimentoController.apagarAvaliacoes);

module.exports = router;