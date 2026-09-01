const db = require('../database/connection');

module.exports = {
  async listarPerfilGestor(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Lista de perfis de gestor.',
        dados: null
      });
    } catch (error) {
      return response.status(500).json({
        sucesso: false,
        mensagem: 'Erro na requisição.',
        dados: error.message
      });
    }
  },

  async cadastrarPerfilGestor(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Cadastro de perfil de gestor.',
        dados: null
      });
    } catch (error) {
      return response.status(500).json({
        sucesso: false,
        mensagem: 'Erro na requisição.',
        dados: error.message
      });
    }
  },

  async editarPerfilGestor(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Editar perfil de gestor.',
        dados: null
      });
    } catch (error) {
      return response.status(500).json({
        sucesso: false,
        mensagem: 'Erro na requisição.',
        dados: error.message
      });
    }
  },

  async apagarPerfilGestor(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Apagar perfil de gestor.',
        dados: null
      });
    } catch (error) {
      return response.status(500).json({
        sucesso: false,
        mensagem: 'Erro na requisição.',
        dados: error.message
      });
    }
  }
};