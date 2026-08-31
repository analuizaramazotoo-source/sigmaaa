const db = require('../database/connection');

module.exports = {
  async listarOrdensServico(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Lista de ordens de serviço.',
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

  async cadastrarOrdensServico(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Cadastro de ordem de serviço.',
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

  async editarOrdensServico(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Editar ordem de serviço.',
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

  async apagarOrdensServico(request, response) {
    try {
      return response.status(200).json({
        sucesso: true,
        mensagem: 'Apagar ordem de serviço.',
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