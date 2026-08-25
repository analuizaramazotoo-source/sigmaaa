const db = require('../database/connection');

module.exports = {
  async listarMensagens(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Lista de mensagens de interação.',
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

  async cadastrarMensagens(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Cadastro de mensagem de interação.',
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

  async editarMensagens(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Editar mensagem de interação.',
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

  async apagarMensagens(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Apagar mensagem de interação.',
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