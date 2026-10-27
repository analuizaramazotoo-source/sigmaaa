# Acessar o TCC em outros computadores

## Compartilhar o sistema na mesma rede

O computador que tem a API e o banco configurados funciona como servidor. Os outros integrantes abrem o site servido por ele e usam as mesmas contas. Não precisam instalar MySQL nem copiar o banco.

1. No computador servidor, mantenha a API ligada. Em um terminal:

   ```powershell
   cd D:\Temp\tcc\aula_node
   npm start
   ```

2. Em outro terminal, inicie o front-end com acesso pela rede:

   ```powershell
   cd D:\Temp\tcc\sigmaaa\sigmaaa
   npm run dev -- --host 0.0.0.0
   ```

3. Abra o endereço `Network` exibido pelo Vite no computador do colega, incluindo a porta. Exemplo: `http://192.168.1.10:5173`. Use o endereço realmente exibido, pois o IP e a porta podem variar. O servidor precisa continuar ligado e conectado à mesma rede acessível.

4. Para conferir a conexão à API, abra nesse computador o mesmo endereço acrescentando `/api/health`. Exemplo: `http://192.168.1.10:5173/api/health`. Deve aparecer `API SIGMA disponível.`. Esse teste confirma a comunicação com a API, mas não verifica o acesso dela ao MySQL.

5. Cidadãos entram em `/login`. Equipe e gestão entram em `/acesso-servidor`, escolhendo o perfil correspondente à conta.

O navegador chama `/api` no mesmo endereço do site. O Vite encaminha essas chamadas para a API em `127.0.0.1:3333` no computador servidor. No `.env` do front-end, se existir, configure `VITE_API_URL=/api` e reinicie o Vite. Usar `http://localhost:3333` ali faz cada navegador procurar a API no próprio computador.

Se nem o site abrir, confira se ambos os computadores estão na mesma rede e se o Windows permite o Node.js na rede privada utilizada. Redes de convidados ou institucionais podem impedir a comunicação entre dispositivos.

## Conferir a versão compilada na rede

No computador servidor, com a API ligada e `VITE_API_URL=/api` (ou sem essa variável):

```powershell
cd D:\Temp\tcc\sigmaaa\sigmaaa
npm run build
npm run preview -- --host 0.0.0.0
```

Abra o endereço `Network` indicado pelo preview. O encaminhamento de `/api` também funciona nesse modo. O preview serve para conferir a compilação; uma publicação permanente precisa de hospedagem apropriada.

## Cada integrante executando sua própria cópia

Git leva o código, mas não leva o arquivo `.env` nem os registros do MySQL. Uma API apontando para um banco vazio não encontrará as contas criadas no computador original. Cada instalação independente precisa configurar sua conexão de banco e importar uma cópia conferida, ou todos devem acessar um único servidor compartilhado. Não recrie o banco que já contém os dados reais.

## Acesso de casa ou por redes diferentes

Um endereço local da rede não fica acessível pela internet automaticamente. É preciso hospedar o front-end, a API e o MySQL em uma estrutura acessível ao grupo. Em hospedagem estática, configure o encaminhamento de `/api` para o back-end, ou defina `VITE_API_URL` com a URL HTTPS pública da API antes do build. O proxy do Vite só funciona enquanto o servidor de desenvolvimento ou preview está rodando; ele não acompanha os arquivos `dist` em uma hospedagem estática.
