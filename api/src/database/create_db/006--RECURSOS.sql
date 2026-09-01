USE bd_aula_node;

-- 1. View: Visão detalhada de todas as ocorrências (para relatórios do painel geral)
CREATE OR REPLACE VIEW vw_relatorio_ocorrencias AS
SELECT 
    o.id_ocorrencia,
    o.protocolo_ocorrencia,
    o.titulo_ocorrencia,
    o.status_ocorrencia,
    o.data_ocorrencia,
    o.logradouro_ocorrencia,
    o.bairro_ocorrencia,
    c.nome_categoria,
    c.gravidade_categoria,
    u.nome_usuario AS nome_cidadao,
    u.email_usuario AS email_cidadao,
    u.telefone_usuario AS telefone_cidadao
FROM OCORRENCIA o
INNER JOIN CATEGORIA_OCORRENCIA c ON o.id_categoria = c.id_categoria
INNER JOIN USUARIO u ON o.id_cidadao = u.id_usuario;

-- 2. View: Visão completa das Ordens de Serviço (para acompanhamento dos gestores)
CREATE OR REPLACE VIEW vw_painel_ordens_servico AS
SELECT 
    os.id_os,
    os.status_os,
    os.data_abertura_os,
    os.data_previsao_os,
    os.data_conclusao_os,
    o.protocolo_ocorrencia,
    o.titulo_ocorrencia,
    ug.nome_usuario AS gestor_responsavel,
    eq.nome_equipe,
    eq.especialidade_equipe
FROM ORDEM_SERVICO os
INNER JOIN OCORRENCIA o ON os.id_ocorrencia = o.id_ocorrencia
INNER JOIN PERFIL_GESTOR pg ON os.id_gestor = pg.id_gestor
INNER JOIN USUARIO ug ON pg.id_usuario = ug.id_usuario
INNER JOIN EQUIPE_CAMPO eq ON os.id_equipe = eq.id_equipe;

-- 3. View: Desempenho e Média de Avaliações por Categoria
CREATE OR REPLACE VIEW vw_media_avaliacao_categorias AS
SELECT 
    c.id_categoria,
    c.nome_categoria,
    COUNT(a.id_avaliacao) AS total_avaliacoes,
    ROUND(AVG(a.nota_avaliacao), 2) AS media_satisfacao
FROM CATEGORIA_OCORRENCIA c
INNER JOIN OCORRENCIA o ON c.id_categoria = o.id_categoria
LEFT JOIN AVALIACAO_ATENDIMENTO a ON o.id_ocorrencia = a.id_ocorrencia
GROUP BY c.id_categoria, c.nome_categoria;