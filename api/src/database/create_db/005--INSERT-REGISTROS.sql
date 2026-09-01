USE bd_aula_node;

-- 1. Inserir Usuários (Gestor, Cidadãos e Técnicos)
INSERT INTO USUARIO (id_usuario, nome_usuario, email_usuario, senha_usuario, telefone_usuario, cpf_usuario, tipo_usuario, status_usuario) VALUES
(1, 'Carlos Oliveira', 'carlos.gestor@cidade.gov.br', '123456', '11988881111', '111.222.333-44', 'gestor', 'ativo'),
(2, 'Ana Paula Souza', 'ana.souza@gmail.com', '123456', '11977772222', '222.333.444-55', 'cidadao', 'ativo'),
(3, 'Marcos Lima', 'marcos.lima@gmail.com', '123456', '11966663333', '333.444.555-66', 'cidadao', 'ativo'),
(4, 'Roberto Silva', 'roberto.tecnico@cidade.gov.br', '123456', '11955554444', '444.555.666-77', 'tecnico', 'ativo'),
(5, 'Fernando Santos', 'fernando.tecnico@cidade.gov.br', '123456', '11944445555', '555.666.777-88', 'tecnico', 'ativo');

-- 2. Perfil do Gestor
INSERT INTO PERFIL_GESTOR (id_gestor, id_usuario, cargo_gestor, departamento_gestor) VALUES
(1, 1, 'Coordenador Operacional', 'Secretaria de Obras e Serviços Públicos');

-- 3. Equipes de Campo
INSERT INTO EQUIPE_CAMPO (id_equipe, nome_equipe, especialidade_equipe, status_equipe) VALUES
(1, 'Equipe Alpha', 'Manutenção Asfáltica', 'ocupada'),
(2, 'Equipe Beta', 'Rede Elétrica e Iluminação', 'disponivel');

-- 4. Membros da Equipe
INSERT INTO MEMBRO_EQUIPE (id_membro, id_equipe, id_usuario, funcao_na_equipe) VALUES
(1, 1, 4, 'Encarregado de Obras'),
(2, 2, 5, 'Eletricista');

-- 5. Ocorrências criadas pelos cidadãos
INSERT INTO OCORRENCIA (id_ocorrencia, protocolo_ocorrencia, id_cidadao, id_categoria, titulo_ocorrencia, descricao_ocorrencia, status_ocorrencia, logradouro_ocorrencia, bairro_ocorrencia, latitude_ocorrencia, longitude_ocorrencia) VALUES
(1, 'OCO-2026-0001', 2, 2, 'Buraco grande na via principal', 'Cratera aberta em frente ao número 120 causando lentidão no trânsito.', 'em_andamento', 'Av. Paulista, 120', 'Bela Vista', '-23.561684', '-46.655981'),
(2, 'OCO-2026-0002', 3, 1, 'Poste com luz piscando', 'Lâmpada do poste em frente à praça fica piscando à noite.', 'concluida', 'Rua das Flores, 45', 'Jardim Primavera', '-23.550520', '-46.633308');

-- 6. Anexos das Ocorrências
INSERT INTO ANEXO_OCORRENCIA (id_anexo, id_ocorrencia, caminho_anexo, tipo_anexo) VALUES
(1, 1, '/uploads/ocorrencias/buraco_av_paulista.jpg', 'imagem'),
(2, 2, '/uploads/ocorrencias/poste_queimado.jpg', 'imagem');

-- 7. Mensagens trocadas na ocorrência
INSERT INTO INTERACAO_MENSAGEM (id_mensagem, id_ocorrencia, id_remetente, mensagem, visivel_cidadao) VALUES
(1, 1, 2, 'O buraco aumentou devido às chuvas de ontem à noite.', TRUE),
(2, 1, 1, 'Equipe já escalada para realizar o reparo hoje à tarde.', TRUE);

-- 8. Ordens de Serviço vinculadas
INSERT INTO ORDEM_SERVICO (id_os, id_ocorrencia, id_gestor, id_equipe, data_abertura_os, data_previsao_os, data_conclusao_os, status_os) VALUES
(1, 1, 1, 1, NOW(), DATE_ADD(NOW(), INTERVAL 2 DAY), NULL, 'em_execucao'),
(2, 2, 1, 2, DATE_SUB(NOW(), INTERVAL 3 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY), 'concluida');

-- 9. Evidências do Serviço realizado
INSERT INTO EVIDENCIA_SERVICO (id_evidencia, id_os, caminho_foto, descricao_evidencia) VALUES
(1, 2, '/uploads/evidencias/lampada_trocada.jpg', 'Substituição da lâmpada de vapor de sódio por LED realizada com sucesso.');

-- 10. Avaliação do Cidadão
INSERT INTO AVALIACAO_ATENDIMENTO (id_avaliacao, id_ocorrencia, nota_avaliacao, comentario_avaliacao) VALUES
(1, 2, 5, 'Serviço rápido e eficiente! O poste foi consertado no dia seguinte.');