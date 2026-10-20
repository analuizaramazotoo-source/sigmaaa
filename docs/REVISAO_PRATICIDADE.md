# Revisão de praticidade — 20/10/2026

O projeto foi revisado pelas rotas do cidadão, gestão e equipe, pelos serviços usados nas telas e pelos testes HTTP com MySQL. A identidade visual foi mantida. A revisão não substitui uma homologação com todos os dados e cenários reais de atendimento.

## O que foi simplificado ou corrigido

| Área | Antes | Agora |
| --- | --- | --- |
| Registro pelo cidadão | Dois formulários gravavam a mesma ocorrência; Solicitar Serviço usava sempre a categoria Outros. | Uma entrada em Relatar um Problema, com categoria, endereço, mapa e fotos. O endereço antigo `/solicitar` redireciona para o formulário principal. |
| Painel do cidadão | Três cartões com duas ações equivalentes de cadastro. | Dois cartões: relatar e acompanhar. Denúncia urgente permanece separada por conter informações de risco e receber prioridade. |
| Acompanhamento | Cinco etapas, incluindo Equipe a caminho, sem correspondência no back-end. | Enviado, Análise, Em atendimento e Concluído. Arquivamento recebe mensagem própria. |
| Fila da gestão | Listava apenas ocorrências abertas. | Inclui abertas e em análise. O encaminhamento exige equipe selecionada e impede cliques repetidos durante o envio. Equipes inativas são excluídas da seleção e rejeitadas pela API. |
| Painel da gestão | Era possível marcar Em campo sem selecionar equipe. | O atalho leva ao encaminhamento para uma equipe. A opção Em análise passou a existir explicitamente. |
| Fila da equipe | Ocorrências arquivadas podiam aparecer no filtro Pendentes. Era preciso selecionar a ocorrência novamente para emitir relatório. | Pendentes usa os estados corretos. O atalho de relatório leva a ocorrência já vinculada. O atalho de auto no mapa também preserva a ocorrência. |
| Relatórios na gestão | O mesmo relatório aparecia duas vezes, um cartão PDF e outro CSV. O período padrão escondia relatórios antigos. | Um cartão por relatório com botões PDF e CSV; por padrão mostra todos os períodos. |
| Relatório e auto da equipe | Constatações eram preenchidas como fatos antes de o fiscal informar o resultado. Reenviar após falha de anexo podia repetir fotos. | Constatações preenchidas pelo fiscal e parecer escolhido explicitamente. Anexos concluídos saem da fila; novas tentativas reutilizam o documento já salvo. |
| Referências legais nos autos | Havia opções genéricas de leis municipais e artigo sem fonte identificada. | Campo de fundamentação livre com sugestões das normas realmente cadastradas e atalho para consultá-las. A escolha da norma e do artigo aplicáveis continua sendo do responsável pelo documento. |
| Rascunho de auto | Salvava um registro sem oferecer forma de retomá-lo para edição. | Botão retirado. Registros anteriores foram preservados; um fluxo completo de edição de rascunhos permanece como evolução possível. |
| Perfil e senha | Cidadão podia trocar a senha no perfil e em outra tela; o perfil da gestão tinha botão de foto sem ação e notificações fixas vazias. | Uma tela de senha compartilhada pelos três perfis, com senha atual, confirmação e mínimo de 8 caracteres. Atalho também no perfil da equipe. Controles sem função removidos. |
| Datas e endereços antigos | Datas sem hora podiam recuar um dia. Não havia correção de endereço na interface da gestão. | Datas de ocorrência sem conversão indevida de fuso; botão Corrigir endereço / localização no detalhe do painel da gestão. |
| Status antigo | Uma ocorrência usava a grafia Aberta, diferente do contrato atual. | API compatibiliza maiúsculas de estados conhecidos na leitura e nas regras de encaminhamento, sem migrar ou inventar dados. |
| URL inexistente | Página vazia. | Página não encontrada, com caminho de volta para o painel do perfil. |

Gestão e equipe mantêm suas telas de autos, relatórios e legislação: elas representam consulta/administração e trabalho em campo, com permissões distintas. Não são duplicatas do cadastro do cidadão. Cadastro de contas de servidores continua restrito à gestão; Contas e Equipes em Configurações continua sendo o caminho principal para administrar o grupo.

## Pendências e limites identificados

- A consulta de auditoria encontrou **4 de 7 ocorrências com localização ausente ou fora de Tupã**. Esses registros não foram alterados. Para cada um, a gestão deve abrir o detalhe no painel, usar Corrigir endereço / localização, selecionar o endereço real e salvar. Não é possível inferir essas posições com segurança a partir dos dados atuais.
- Recuperação automática de senha por e-mail ainda não existe; a tela de recuperação comunica essa limitação. Depende de implementar tokens de recuperação e configurar um serviço de envio.
- A busca de endereços depende da cobertura e disponibilidade de Photon/OpenStreetMap e ViaCEP. Número de imóvel sem coordenada cadastrada continua sendo apresentado como aproximado. A Rua Ferroviário José Jardim, 761 retornou somente o trecho de rua na consulta realizada em 20/10/2026.
- Sessões do back-end ficam em memória: reiniciar a API encerra os logins. Persistência de sessão é uma evolução necessária para hospedar com reinícios transparentes.
- A equipe hoje consulta a fila municipal inteira. Se o processo de atendimento exigir que cada equipe veja apenas suas ordens de serviço, falta definir e implementar essa regra no back-end e nas telas; não foi aplicada uma restrição nova aos dados acessíveis sem essa definição.
- A legislação possui 9 normas cadastradas. A revisão removeu referências genéricas dos formulários, mas não certifica enquadramentos jurídicos dos autos já emitidos.

## Como testar a versão revisada

1. Atualize o navegador com Ctrl + F5 e entre novamente se a API tiver reiniciado.
2. Cidadão: abra o painel, envie um relato com categoria, endereço e foto; confirme o protocolo em Minhas solicitações. Acessar `/solicitar` deve abrir o mesmo formulário.
3. No acompanhamento, selecione um protocolo e confira seu endereço e sua etapa de atendimento.
4. Gestão: abra a Fila de Fiscalização. Ocorrências abertas e em análise devem aparecer. Selecione uma equipe ativa para encaminhar.
5. Para corrigir um registro antigo, abra seu detalhe no painel da gestão, use Corrigir endereço / localização, escolha um endereço de Tupã e salve. O mapa deve refletir a nova seleção. Confirme sempre se o ponto é exato ou aproximado.
6. Equipe: na fila, selecione uma ocorrência e use Emitir Relatório de Campo. O protocolo já estará selecionado. Preencha o resultado real, escolha o parecer, anexe fotos e envie.
7. Gestão: em Relatórios, confirme um cartão por documento e os dois downloads, PDF e CSV. Todos os períodos devem ser exibidos inicialmente.
8. Em Meu perfil, abra a troca de senha. Ela deve exigir senha atual, nova senha e confirmação. Equipe também possui esse atalho no perfil.

Validação executada: lint e build; 9 testes de unidade do front-end; 17 testes de unidade do back-end; suíte HTTP/MySQL de autenticação, permissões e CRUD com rollback; navegação de 28 rotas em 360, 390, 768, 1024 e 1440 px, sem erros ou overflow; testes de CEP/número, mapa e fotos; teste dos fluxos simplificados com API interceptada, incluindo envio de relatório após falha parcial e emissão de auto sem duplicação por clique duplo. Testes de navegador não gravam no banco real. O build ainda informa o aviso anterior de tamanho do bundle JavaScript.

Scripts de interface: `scripts/verify-practical-flows.cjs`, `scripts/verify-responsive.cjs`, `scripts/verify-occurrence-form.cjs` e `scripts/verify-address-number.cjs`. Configure `PLAYWRIGHT_MODULE` com o caminho do Playwright e `UI_BASE_URL` com o Vite local.

## Voltar apenas uma parte

As correções anteriores de CEP/endereço foram salvas antes desta revisão. Os dois repositórios possuem a tag **`checkpoint/praticidade-2026-10-20`**, que identifica a versão anterior às simplificações. Não há alteração ou exclusão dos registros existentes do banco para fazer a simplificação.

| Repositório | Commit | Parte que pode ser restaurada separadamente |
| --- | --- | --- |
| Front-end | `1b7b34c` | Painel do cidadão e unificação de Solicitar Serviço com Relatar Problema |
| Front-end | `8a195f3` | Acompanhamento e encaminhamento |
| Front-end | `48f2290` | Apresentação de relatórios, autos e vínculo da vistoria |
| Front-end | `658a519` | Perfil, troca de senha e controles sem função |
| Front-end | `281ba49` | Editor de localização para registros antigos |
| Back-end | `40028b1` | Compatibilidade da grafia de status antigos |
| Back-end | `a151d01` | Bloqueio de encaminhamento para equipe inativa |

Você pode pedir, por exemplo, “volte só o painel do cidadão ao modelo anterior e mantenha as correções de encaminhamento”. O histórico permite recuperar essa parte sem desfazer todo o trabalho. Para manutenção pelo Git, cada etapa pode ser revertida com `git revert <commit>` no repositório indicado, revisando eventuais conflitos com alterações posteriores. A tag é um ponto de comparação; não é necessário usar reset nem descartar trabalho para voltar uma parte.
