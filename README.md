![Be The Hero](frontend/src/assets/logo.svg)
# Be The Hero
Projeto full stack javascript: Utilizando as tecnologias **NodeJs** e **SQL** no back-end, **ReacJs** no front-end, e **React-native** no mobile.

## Descrição
É uma aplicação que vai conectar pessoas que tem vontade de ajudar, e muitas vezes não tem tempo, mas pode ajudar de uma forma monetária a ongs. 

As organizações vão poder fazer seu cadastro no sistema através de uma aplicação web. Vai cadastrar seus dados pessoais e de contato. Após feito o cadastro, entrará no sistema pelo seu ID, e logo depois cadastrar os casos com seu respectivo valor.

![be the hero web](https://user-images.githubusercontent.com/24706908/77971926-66ae2000-72c6-11ea-9aec-408bec86e140.gif)

As pessoas que irão ajudar, irão acessar o sistema por um aplicativo mobile e listar os casos cadastrador. Após selecionar o caso, será redirecionado pra outra tela onde poderá entrar em contato com a ONG através de email ou whatsapp, onde poderá conversar.

![be the hero mobile](https://user-images.githubusercontent.com/24706908/77971916-62820280-72c6-11ea-958b-e70251b37f07.gif)

## Pré requisitos
* Nodejs, versão 12

## Instalação

```bash
$ cd backend
```

Usando npm:

```bash
$ npm install
```

Usando yarn:

```bash
$ yarn install
```

> Repita o processo para as respectivas pastas **frontend** e **mobile**

## O que estou aprendendo

- [ ] Back-end da aplicação com ***NodeJs***
  - [x] Criar api restful com ***express***.
    - [x] Rotas e recursos. 
    - [x] Métodos HTTP.
    - [x] Tipos de parâmetros.
  - [x] Fazer query builder SQL com banco de dados ***sqlite*** com ***knex***.
  - [x] Adicionar o módulo ***cors*** para segurança da aplicação.
  - [ ] Fazer validação com a biblioteca ***celebrate***.
  - [ ] Criar teste da aplicação
    - [ ] ***jest***
    - [ ] ***supertest***
  - [ ] Autenticação ***JWT***.
- [ ] Front-end da aplicação com ***ReactJS***.
  - [x] Criar projeto com create-react-app.
  - [x] Conceitos do ***react***.
    - [x] Component.
    - [x] JSX.
    - [x] Propriedades.
    - [x] Estado.
    - [x] Imutabilidade.
  - [x] Criar navegação de rotas com ***react-router-dom***.
  - [x] Estilização de componentes com ***css***.
  - [ ] Estilização de componentes com ***styledcomponent***.
  - [x] Armazenar e recuperar dados no browser com ***localStorage***.
  - [x] Consumir api rest com ***axios***.
  - [ ] Autenticação ***JWT***.
- [ ] Aplicação mobile com ***React-native***.
  - [x] Criar projeto e configurar o mesmo no smartfone com ***expo***.
  - [x] Criar navegação de rotas com ***react-navigation***.
  - [x] Criar componente de tela e estilização.
  - [x] Ícones e Splash Screen.
  - [x] Mandar mensagem através do app por _whatsapp_ e _email_.
  - [x] Carregar lista de casos por demanda.
  - [ ] Estilização de componentes com ***styledcomponent***.
  - [ ] Autenticação ***JWT***.
