const db = require('../database/connection');

module.exports = {
  async listarMembros(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Lista de membros de equipe.',
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

  async cadastrarMembros(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Cadastro de membro de equipe.',
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

  async editarMembros(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Editar membro de equipe.',
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

  async apagarMembros(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Apagar membro de equipe.',
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