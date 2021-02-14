# Solução Imobiliária (solucimob)
Solução para mercado imobiliário
# Solução Imobiliária - Serviço de calculo (solucimob-calc)
Serviço que executa os cálculos para a solução imobiliária

## Serviços

Serviços do ambiente solução imobiliária

| Serviço                        | Cod          | Descrição                                                                                             | Dependências  |
| ----------------------------- | ------------ | ----------------------------------------------------------------------------------------------------- |---------------------------------- |
| Serviço de cálculo *     | [solucimob-calc](https://github.com/leo-def/solucimob-calc) | Serviço que executa os cálculos para a solução imobiliária                | solucimob-config |
| Serviço de configuração  | [solucimob-config](https://github.com/leo-def/solucimob-config) | Serviço que gerência a configuração para a solução imobiliária                | |

## Acessos

Locais
Local | Descrição | Acesso | Responsável
--------- | ------ | ------ | ------
[Servidor visionamento](https://github.com/leo-def/solucimob-calc) | Local aonde fica versionado o código | Conta particular | Admin, admin@admin.com
[Servidor produção](https://dashboard.heroku.com/apps/solucimob-calc)| Local aonde é executado a aplicação em nível de produção | Conta particular | Admin, admin@admin.com
[Servidor homologação](https://dashboard.heroku.com/apps/solucimob-calc)| Local aonde é executado a aplicação em nível de homologação | Conta particular | Admin, admin@admin.com
[Quadro de demandas](https://github.com/users/leo-def/projects/1)| Quadro aonde são definidas as demandas e seu status | Conta particular | Admin, admin@admin.com

## Scripts

 - **`start`** - Executa o projeto para produção ou homologação

 - **`start:lw`** - Executa o projeto para produção ou homologação, sendo leve (Consumindo menos recurso)

 - **`start:xlw`** - Executa o projeto para produção ou homologação, sendo extremamente leve (Consumindo menos recurso)

 - **`localdb`** - Iniciar o banco de dados localmente

 - **`dev`** - Executa o projeto para desenvolvimento local

 - **`dev:localdb`** - Executa o projeto para desenvolvimento local, iniciando o banco de dados junto

 - **`debug`** - Executa o projeto para debug local

 - **`debug:localdb`** - Executa o projeto para debug local, iniciando o banco de dados junto
    
 - **`debug:localdb`** - Executa o teste da aplicação

 - **`build`** - Executa os testes da aplicação

 - **`build`** - Gera o artefacto da aplicação usando babel

 - **`build:ts`** - Gera o artefacto da aplicação usando o typescript

 - **`docs`** - Gera a documentação da aplicação

 - **`lint`** - Gera o artefacto da aplicação

## Funcionalidade de arquivos

 - **`.env`** - [Dotenv](https://www.npmjs.com/package/dotenv): Define as variáveis de ambiente para o projeto em ambiente de desenvolvimento;

 - **`.eslintignore`** - [Eslint](https://eslint.org/): Define os arquivos que serão ignorados pela ferramenta de verificação de padrões de código;

 - **`.eslintrc.json`** - [Eslint](https://eslint.org/): Define a configuração da ferramenta de verificação de padrões de código;
 
 - **`.gitignore`** - [Git](https://git-scm.com/): Define os arquivos que serão ignorados pela ferramenta de versionamento do código;

 - **`api-schema.yml`** - [Swagger](https://swagger.io/): Define a api do projeto para documentação e validação;

 - **`babel.config.json`** - [Babel](https://babeljs.io/): Define a configuração da ferramenta de compilação e empacotamento do código;

 - **`bitbucket-pipeline.json`** - [Bitbucket](https://bitbucket.org/): Define a configuração do processo de CI caso seja usado a ferramenta de CI do Bitbucket
 
 - **`Dockerfile`** - [Docker](https://www.docker.com/): Define a configuração da ferramenta de container;
 
 - **`Insomnia.json`** - [Insomnia](https://insomnia.rest/download/): Define a configuração da ferramenta para consulta da api;

 - **`jest.config.js`** - [Jest](https://jestjs.io/): Define a configuração da ferramenta de testes;

 - **`jsdoc.json`** - [JSDoc](https://jsdoc.app/): Define a configuração da ferramenta de documentação de código;

 - **`package.json`** - [NodeJs](https://nodejs.org/en/): Define a configuração do projeto Node;

 - **`Procfile`** - [Heroku](https://www.heroku.com/): Define a ação a ser executada no Heroku;

 - **`travis.yml`** - [Travis](https://travis-ci.org/): Define a configuração do processo de CI para a ferramenta Travis;

 - **`tsconfig.json`** - [Typescript](https://www.typescriptlang.org/): Define a configuração da ferramenta de transpilação do typescript;

## Execução local

### Docker

- [Docker](https://www.docker.com/) Instalado
- [Docker compose](https://docs.docker.com/compose/install/) Instalado

- Clonar o [projeto](https://github.com/leo-def/solucimob) do ambiente contendo a orquestração de todos os serviços;
- Executar o comando `dokcer-compose up` na pasta raiz do projeto para executar a orquestração e inicialização dos containers;

### NodeJs
Requisitos:

- [Git](https://github.com/) Instalado
- [NodeJs](https://nodejs.org/en/)) Instalado

Etapas:
- Caso o serviço tenha dependência de algum outro serviço, os passos a seguir devem ser feitos para todas as dependências antes de ser feito para o projeto atual;
- Clonar o [projeto](https://github.com/leo-def/solucimob-calc) do servidor de versão utilizando Git;
- Executar o comando `npm install ` na pasta raiz do projeto para instalar as bibliotecas utilizadas;
- Para executar o projeto `npm run dev `, para debugar o projeto `npm run debug `.


## Deploy

### Heroku
Referências:

- [Melhores práticas para Node no Heroku](https://devcenter.heroku.com/articles/node-best-practices)
- [Ciclo de vida Heroku](https://devcenter.heroku.com/articles/nodejs-support#heroku-specific-build-steps)

A aplicação é hospedada no serviço de hospedagem [Heroku](https://heroku.com)
O deploy é feito de maneira automatizada pelo sistema Travis [Travis](https://travis-ci.com/) com o serviço de hospedagem [Heroku](https://heroku.com)
Para cada commit enviado a branch **`master`**, é realizado o deploy automático no heroku através de uma [Pipeline](https://travis-ci.org/) do Travis, que monitora a branch

Etapas:

- Fazer um pull request da branch [developer](https://github.com/leo-def/solucimob-calc) para a uma branch de release
- Fazer o full request de uma branch de release para a branch [master](https://github.com/leo-def/solucimob-calc)
- O [Pipeline](https://docs.travis-ci.com/user/tutorial/) da branch irá executar as etapas de:
  - Testes
  - Validação do padrão de código
  - Deploy no Heroku [Heroku deploy](https://docs.travis-ci.com/user/deployment-v2/providers/heroku/)
- O serviço de hospedagem da Heroku para cada deploy, realizar as seguintes etapas:
  - Executar os scripts do [ciclo de vida do Node](https://devcenter.heroku.com/articles/nodejs-support#heroku-specific-build-steps)
  - Executar o comando de deploy localizado no arquivo Procfile do projeto

## Ações do projeto

### Testes

A biblioteca utilizada para testes é a [Jest](https://jestjs.io/)

Executar o teste

```sh
yarn test
# ou
jest --no-cache
```

### Padronização do código

A biblioteca utilizada para verificar a padronização do código é a [Eslint](https://eslint.org/)

Executar a verificação de padrão

```sh
yarn run lint
# ou
npx eslint .
```

### Build

O Build pode ser feito utilizando a biblioteca Typescript, ou Babel. O artefacto gerado pelo build é localizado a pasta **`./dist`** Em produção em homologação é feito de maneira automatizada utilizando a biblioteca Babel

Build do projeto

```sh
# Build usando babel
yarn build
# ou
babel src --extensions \".js,.ts\" --out-dir dist --copy-files --no-copy-ignored

# Build usando Typescript
yarn run build:ts
# ou
tsc
```

### Execução

O projeto pode ser inicializado sem a necessidade de build para desenvolvimento, ja em produção e homologação e executado o artefacto gerado pelo processo de build, **`./dist/Server.js`**

Execução do projeto

```sh
# Executa o projeto para produção ou homologação
yarn run start
# Executa o projeto para produção ou homologação, sendo leve (Consumindo menos recurso)
yarn run start:lw
# Executa o projeto para produção ou homologação, sendo extremamente leve (Consumindo menos recurso)
yarn run start:xlw
# Executa o projeto para desenvolvimento local
yarn run dev
# Executa o projeto para desenvolvimento local, iniciando o banco de dados junto
yarn run dev:localdb
# Executa o projeto para debug local
yarn run debug
# Executa o projeto para debug local, iniciando o banco de dados junto
yarn run debug:localdb
```

## Demandas

Etapas:

- **Encontrar cartão github** - Uma demanda deve ser encontrada em um cartão, na lista **`To do`**, no [quadro do projeto no Github](https://github.com/users/leo-def/projects/1)
- Converter o quadro em **issue**
- Assumir **issue**
- Criar branch - Usar o nome baseado no id do cartão `feature/:id-task`**
- Iniciar demanda - Arrastado o cartão para a coluna **`In Progress`** 
- Commitar as alterações - As alterações no código relacionadas a demanda devem ser enviadas via commit na nova branch
- Atualizar o cartão - Qualquer comentário, ou dúvida, deve ser inserido como um comentário na issue, mencionando as pessoas relacionadas digitando '@' e selecionando a pessoa. Caso algo bloqueie o avanço da demanda, arrastar o cartão para a lista **`Blocked`**
- Finalizar a demanda no quadro - Assim que finalizado o desenvolvimento arrastar o quadro para a lista **`Done`**, se por algum motivo a demanda for cancelada, o quadro deve ser arrastado para a branch **`Removed`**
- Realizar PullRequest para a Developer - Assim que finalizado o desenvolvimento, deve ser criado um PullRequest da branch atual para a developer, se por algum motivo a demanda for cancelada, a branch deve ser removida sem PullRequest
- Revisão do PullRequest - O Responsável pela revisão do PullRequest irá revisar e então, concluir ou rejeitar o PullRequest
- Atualizar o cartão com a revisão - O Responsável pela revisão do PullRequest irá colocar um comentário na issue descrevendo o resultado da review, e mencionando o desenvolvedor, caso concluído irá arrastar o cartão para **`Test`**
- Enviar para homologação - O Responsável pela homologação irá verificar os cartões em **`Test`**, caso esteja tudo certo, criar uma branch de release baseada na branch **`development`**, para depois fazer um merge para a branch criada e então criar um pull request para  **`master`**
- Atualizar os cartões para a homologação - O Responsável pela revisão do PullRequest irá colocar um comentário na issue descrevendo o resultado da homologação, e mencionando o desenvolvedor. Caso seja feito o PullRequest para master, arrastar os cartões de **`Test`** para **`Done`**, concluir pull request para **`master`**
- Atualizar versão de desenvolvimento - Criar um PullRequest da branch **`produção`** para a branch **`developer`**, para atualizar a versão do projeto dem desenvolvimento

## Setup - Processo feito para a criação do projeto

Referências:
- [Padrões](https://github.com/goldbergyoni/nodebestpractices/blob/master/README.brazilian-portuguese.md)
- [Tutorial](https://www.youtube.com/watch?v=rCeGfFk-uCk)
- [Exemplo](https://github.com/rocketseat-content/node-typescript-structure)

### Configuração Projeto

Inicialização a configuração do Git:

```sh
git init
```

Inicialização a configuração do Yarn:

```sh
yarn init
```

Para recarregar configurações no Visual Studio Code caso não tenha aparecido pressionar Ctrl + R ou :

```sh
Ctrl + p
'>reload' // recarrega o vs code
```

Arquivo de configuração da aplicação Parte dos scripts automatizados configurados na aplicação:
**`package.json`**

Arquivos para serem ignorados pelo git:
**`.gitignore`**

### Configuração Typescript


```sh
yarn add @types/node @types/express typescript ts-node-dev

# Inicializa a configuração do Typescript:
yarn tsc  --init

# Realizar build via typescript:
yarn tsc

```

Arquivo de configuração do typescript:
**`tsconfig.json`**

### Configuração Padrão de código

Links:

- [Exemplo arquivo ESLint completo](https://github.com/diego3g/node-microservices-ddd/blob/master/packages/server/.)

  Inicializar a configuração do eslint pode ser configurado em js json ou yml.

```sh
yarn add eslint
yarn eslint --init
```

Arquivo para configuração da padronização do código
**`.eslintrc.json`**

Arquivos a serem ignorados na verificação de padronização do código
**`.eslintignore`**

```
dist
/*.js
```

### Configuração Testes

Instala as dependências e inicializa a configuração do jest pode ser configurado em js json ou yml

```sh
yarn add
    jest
    ts-jest
    @types/jest
    babel-jest
# Inicializa a configuração do jest
yarn jest --init
```

Arquivo de configuração de testes
**`jest.config.js`**

Executa o teste

```sh
yarn test
```

### Configuração Babel build

Instalar o babel no projeto

```sh
yarn add
    @babel/core
    @babel/cli
    @babel/preset-env
    @babel/preset-typescript
	
```

Arquivo de configuração do build via babel
**`babel.config.js`**

Executa o build usando babel

```sh
babel src --extensions \".js,.ts\" --out-dir dist --copy-files --no-copy-ignored
```

Configura o projeto para deploy no Heroku
**`Procfile`**

```sh
web: node --optimize_for_size --max_old_space_size=460 --gc_interval=100 dist/Server.js
```