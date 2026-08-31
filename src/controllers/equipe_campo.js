const db = require('../database/connection');

module.exports = {
  async listarEquipes(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Lista de equipes de campo.',
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

  async cadastrarEquipes(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Cadastro de equipe de campo.',
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

  async editarEquipes(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Editar equipe de campo.',
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

  async apagarEquipes(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Apagar equipe de campo.',
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