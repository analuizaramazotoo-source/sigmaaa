USE bd_aula_node;

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS USUARIO (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome_usuario VARCHAR(255) NOT NULL,
    email_usuario VARCHAR(255) NOT NULL UNIQUE,
    senha_usuario VARCHAR(255) NOT NULL,
    telefone_usuario VARCHAR(20),
    cpf_usuario VARCHAR(14) UNIQUE,
    tipo_usuario VARCHAR(50) NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    status_usuario VARCHAR(20) DEFAULT 'ativo'
);

-- Tabela de Perfil do Gestor
CREATE TABLE IF NOT EXISTS PERFIL_GESTOR (
    id_gestor INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    cargo_gestor VARCHAR(100),
    departamento_gestor VARCHAR(100)
);

-- Tabela de Categorias de Ocorrência
CREATE TABLE IF NOT EXISTS CATEGORIA_OCORRENCIA (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nome_categoria VARCHAR(100) NOT NULL,
    descricao_categoria TEXT,
    gravidade_categoria VARCHAR(50)
);

-- Tabela de Equipes de Campo
CREATE TABLE IF NOT EXISTS EQUIPE_CAMPO (
    id_equipe INT AUTO_INCREMENT PRIMARY KEY,
    nome_equipe VARCHAR(100) NOT NULL,
    especialidade_equipe VARCHAR(100),
    status_equipe VARCHAR(50) DEFAULT 'disponivel'
);

-- Tabela de Membros das Equipes
CREATE TABLE IF NOT EXISTS MEMBRO_EQUIPE (
    id_membro INT AUTO_INCREMENT PRIMARY KEY,
    id_equipe INT NOT NULL,
    id_usuario INT NOT NULL,
    funcao_na_equipe VARCHAR(100)
);

-- Tabela Principal de Ocorrências
CREATE TABLE IF NOT EXISTS OCORRENCIA (
    id_ocorrencia INT AUTO_INCREMENT PRIMARY KEY,
    protocolo_ocorrencia VARCHAR(50) NOT NULL UNIQUE,
    id_cidadao INT NOT NULL,
    id_categoria INT NOT NULL,
    titulo_ocorrencia VARCHAR(255) NOT NULL,
    descricao_ocorrencia TEXT,
    data_ocorrencia DATETIME DEFAULT CURRENT_TIMESTAMP,
    status_ocorrencia VARCHAR(50) DEFAULT 'aberta',
    logradouro_ocorrencia VARCHAR(255),
    bairro_ocorrencia VARCHAR(100),
    latitude_ocorrencia VARCHAR(50),
    longitude_ocorrencia VARCHAR(50)
);

-- Tabela de Anexos da Ocorrência
CREATE TABLE IF NOT EXISTS ANEXO_OCORRENCIA (
    id_anexo INT AUTO_INCREMENT PRIMARY KEY,
    id_ocorrencia INT NOT NULL,
    caminho_anexo VARCHAR(255) NOT NULL,
    tipo_anexo VARCHAR(50)
);

-- Tabela de Mensagens e Interações
CREATE TABLE IF NOT EXISTS INTERACAO_MENSAGEM (
    id_mensagem INT AUTO_INCREMENT PRIMARY KEY,
    id_ocorrencia INT NOT NULL,
    id_remetente INT NOT NULL,
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    mensagem TEXT NOT NULL,
    visivel_cidadao BOOLEAN DEFAULT TRUE
);

-- Tabela de Ordens de Serviço
CREATE TABLE IF NOT EXISTS ORDEM_SERVICO (
    id_os INT AUTO_INCREMENT PRIMARY KEY,
    id_ocorrencia INT NOT NULL,
    id_gestor INT NOT NULL,
    id_equipe INT NOT NULL,
    data_abertura_os DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_previsao_os DATETIME,
    data_conclusao_os DATETIME,
    status_os VARCHAR(50) DEFAULT 'pendente'
);

-- Tabela de Evidências do Serviço
CREATE TABLE IF NOT EXISTS EVIDENCIA_SERVICO (
    id_evidencia INT AUTO_INCREMENT PRIMARY KEY,
    id_os INT NOT NULL,
    caminho_foto VARCHAR(255) NOT NULL,
    descricao_evidencia TEXT
);

-- Tabela de Avaliação do Atendimento
CREATE TABLE IF NOT EXISTS AVALIACAO_ATENDIMENTO (
    id_avaliacao INT AUTO_INCREMENT PRIMARY KEY,
    id_ocorrencia INT NOT NULL,
    nota_avaliacao INT NOT NULL,
    comentario_avaliacao TEXT
);