USE bd_aula_node;

-- Inserção de dados iniciais na tabela CATEGORIA_OCORRENCIA
INSERT INTO CATEGORIA_OCORRENCIA (nome_categoria, descricao_categoria, gravidade_categoria) VALUES
('Iluminação Pública', 'Postes apagados, lâmpadas queimadas ou fiação exposta na via pública', 'Média'),
('Buraco na Via', 'Asfalto danificado, crateras na pista ou calçadas esburacadas', 'Alta'),
('Vazamento de Água', 'Tubulações rompidas, bueiros transbordando ou vazamentos na rede de esgoto', 'Alta'),
('Poda de Árvore', 'Galhos com risco de queda sobre fiação elétrica, veículos ou pedestres', 'Média'),
('Coleta de Lixo', 'Entulho acumulado em local irregular ou atraso na coleta de lixo', 'Baixa'),
('Sinalização de Trânsito', 'Semáforos apagados, placas danificadas ou ausência de pintura de faixas', 'Alta');