const db = require('../database/connection');

module.exports = {
  async listarOcorrencias(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Lista de ocorrências.',
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

  async cadastrarOcorrencias(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Cadastro de ocorrência.',
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

  async editarOcorrencias(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Editar ocorrência.',
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

  async apagarOcorrencias(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Apagar ocorrência.',
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