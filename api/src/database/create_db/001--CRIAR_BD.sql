-- Remove o banco se ele já existir (para recriação limpa)
DROP DATABASE IF EXISTS bd_aula_node;

-- Cria o banco de dados definindo a codificação padrão
CREATE DATABASE bd_aula_node
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- Seleciona o banco para uso
USE bd_aula_node;