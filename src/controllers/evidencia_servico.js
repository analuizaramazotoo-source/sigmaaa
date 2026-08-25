const db = require('../database/connection');

module.exports = {
  async listarEvidencias(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Lista de evidências de serviço.',
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

  async cadastrarEvidencias(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Cadastro de evidência de serviço.',
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

  async editarEvidencias(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Editar evidência de serviço.',
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

  async apagarEvidencias(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Apagar evidência de serviço.',
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