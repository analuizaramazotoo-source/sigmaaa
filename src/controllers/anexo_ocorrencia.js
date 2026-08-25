const db = require('../database/connection');

module.exports = {
  async listarAnexos(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Lista de anexos de ocorrência.',
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

  async cadastrarAnexos(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Cadastro de anexo de ocorrência.',
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

  async editarAnexos(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Editar anexo de ocorrência.',
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

  async apagarAnexos(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Apagar anexo de ocorrência.',
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