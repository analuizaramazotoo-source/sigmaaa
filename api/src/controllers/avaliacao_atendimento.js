const db = require('../database/connection');

module.exports = {
  async listarAvaliacoes(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Lista de avaliações de atendimento.',
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

  async cadastrarAvaliacoes(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Cadastro de avaliação de atendimento.',
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

  async editarAvaliacoes(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Editar avaliação de atendimento.',
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

  async apagarAvaliacoes(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Apagar avaliação de atendimento.',
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