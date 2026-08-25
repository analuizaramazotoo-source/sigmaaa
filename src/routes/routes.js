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


const CategoriaOcorrenciaController = require('../controllers/categoria_ocorrencia');
router.get('/categorias', CategoriaOcorrenciaController.listarCategorias);
router.post('/categorias', CategoriaOcorrenciaController.cadastrarCategorias);
router.patch('/categorias', CategoriaOcorrenciaController.editarCategorias);
router.delete('/categorias', CategoriaOcorrenciaController.apagarCategorias);


const EquipeCampoController = require('../controllers/equipe_campo');
router.get('/equipes', EquipeCampoController.listarEquipes);
router.post('/equipes', EquipeCampoController.cadastrarEquipes);
router.patch('/equipes', EquipeCampoController.editarEquipes);
router.delete('/equipes', EquipeCampoController.apagarEquipes);


const MembroEquipeController = require('../controllers/membro_equipe');
router.get('/membros-equipe', MembroEquipeController.listarMembros);
router.post('/membros-equipe', MembroEquipeController.cadastrarMembros);
router.patch('/membros-equipe', MembroEquipeController.editarMembros);
router.delete('/membros-equipe', MembroEquipeController.apagarMembros);


const OcorrenciaController = require('../controllers/ocorrencia');
router.get('/ocorrencias', OcorrenciaController.listarOcorrencias);
router.post('/ocorrencias', OcorrenciaController.cadastrarOcorrencias);
router.patch('/ocorrencias', OcorrenciaController.editarOcorrencias);
router.delete('/ocorrencias', OcorrenciaController.apagarOcorrencias);


const AnexoOcorrenciaController = require('../controllers/anexo_ocorrencia');
router.get('/anexos', AnexoOcorrenciaController.listarAnexos);
router.post('/anexos', AnexoOcorrenciaController.cadastrarAnexos);
router.patch('/anexos', AnexoOcorrenciaController.editarAnexos);
router.delete('/anexos', AnexoOcorrenciaController.apagarAnexos);


const InteracaoMensagemController = require('../controllers/interacao_mensagem');
router.get('/mensagens', InteracaoMensagemController.listarMensagens);
router.post('/mensagens', InteracaoMensagemController.cadastrarMensagens);
router.patch('/mensagens', InteracaoMensagemController.editarMensagens);
router.delete('/mensagens', InteracaoMensagemController.apagarMensagens);


const OrdemServicoController = require('../controllers/ordem_servico');
router.get('/ordens-servico', OrdemServicoController.listarOrdensServico);
router.post('/ordens-servico', OrdemServicoController.cadastrarOrdensServico);
router.patch('/ordens-servico', OrdemServicoController.editarOrdensServico);
router.delete('/ordens-servico', OrdemServicoController.apagarOrdensServico);


const EvidenciaServicoController = require('../controllers/evidencia_servico');
router.get('/evidencias', EvidenciaServicoController.listarEvidencias);
router.post('/evidencias', EvidenciaServicoController.cadastrarEvidencias);
router.patch('/evidencias', EvidenciaServicoController.editarEvidencias);
router.delete('/evidencias', EvidenciaServicoController.apagarEvidencias);


const AvaliacaoAtendimentoController = require('../controllers/avaliacao_atendimento');
router.get('/avaliacoes', AvaliacaoAtendimentoController.listarAvaliacoes);
router.post('/avaliacoes', AvaliacaoAtendimentoController.cadastrarAvaliacoes);
router.patch('/avaliacoes', AvaliacaoAtendimentoController.editarAvaliacoes);
router.delete('/avaliacoes', AvaliacaoAtendimentoController.apagarAvaliacoes);

module.exports = router;