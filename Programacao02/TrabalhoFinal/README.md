# Achados e Perdidos

Este é um projeto de uma aplicação web chamada "Achados e Perdidos", desenvolvida com React, Node.js e MySQL. A plataforma tem como objetivo facilitar o processo de cadastro, visualização e remoção de objetos perdidos ou encontrados, funcionando como um sistema de classificados para esse tipo de item.

## Funcionalidades

- **Cadastro de Objeto**: O usuário pode cadastrar objetos perdidos ou encontrados na plataforma. Para cada objeto, será necessário preencher detalhes como nome, descrição e categoria.
  
- **Vitrine de Objetos**: Todos os objetos cadastrados ficam visíveis em uma vitrine, onde os usuários podem visualizar detalhes dos itens e entrar em contato com o dono.

- **Remoção do Objeto da Vitrine**: O dono de um objeto poderá remover o seu item da vitrine quando o objeto for encontrado ou quando não desejar mais mantê-lo disponível.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção da interface de usuário.
- **Node.js**: Ambiente de execução para o backend, responsável por gerenciar as requisições e interações com o banco de dados.
- **MySQL**: Banco de dados utilizado para armazenar informações sobre os objetos cadastrados e os usuários da plataforma.
- **Express**: Framework para o desenvolvimento do servidor Node.js e criação de APIs REST.
- **Axios**: Biblioteca para fazer requisições HTTP entre o frontend (React) e o backend (Node.js).

## Funcionalidades Detalhadas

1. **Cadastro de Objeto**
   - O usuário preenche um formulário com informações do objeto (nome, descrição, categoria).
   - As informações são enviadas para o servidor e armazenadas no banco de dados MySQL.
   - O objeto fica visível na vitrine após o cadastro.

2. **Vitrine de Objetos**
   - Uma página com todos os objetos cadastrados na plataforma, exibindo detalhes como nome, descrição e categoria.
   - Os objetos são listados em uma interface intuitiva, facilitando a navegação e a busca.

3. **Remoção de Objeto**
   - O dono de um objeto pode removê-lo da vitrine.

## Endpoints

1. **Criar Objeto**

    - **Método**: POST
    - **Endpoint**: /objetos
    - **Corpo da requisição**:
    ```json
    {
      "nomeObjeto": "Chave",
      "localEncontrado": "Sala 11",
      "dataEncontrado": "2025-08-28",
      "nomePessoaEncontrou": "João Silva",
      "urlFoto": "http://exemplo.com/imagens/chave.jpg",
      "observacoes": "A chave foi encontrada perto da janela"
    }
    ```
    
2. **Listar Objetos**

    - **Método**: GET
    - **Endpoint**: /objetos
    - **Resposta**:
    ```json
    [
      {
        "nomeObjeto": "Chave",
        "localEncontrado": "Sala 2",
        "dataEncontrado": "2025-08-28",
        "nomePessoaEncontrou": "João Silva",
        "urlFoto": "http://exemplo.com/imagens/chave.jpg",
        "observacoes": "A chave foi encontrada perto do banco de praça.",
        "tipoObjetoId": 1,
        "id": 1
      },
      {
        "nomeObjeto": "Celular Samsung",
        "localEncontrado": "Sala 1",
        "dataEncontrado": "2025-08-26",
        "nomePessoaEncontrou": "Maria Oliveira",
        "urlFoto": "http://exemplo.com/imagens/celular.jpg",
        "observacoes": "Celular encontrado na mesa.",
        "tipoObjetoId": 2,
        "id": 2
      }
    ]
    ```

3. **Visualizar Objeto Específico**

    - **Método**: GET
    - **Endpoint**: /objetos/{id}
    - **Resposta**:
    ```json
    {
      "nomeObjeto": "Chave",
      "localEncontrado": "Sala 8",
      "dataEncontrado": "2025-08-28",
      "nomePessoaEncontrou": "João Silva",
      "urlFoto": "http://exemplo.com/imagens/chave.jpg",
      "observacoes": "A chave foi encontrada perto da janela",
      "tipoObjetoId": 1,
      "id": 1
    }
    ```

4. **Atualizar Objeto**

    - **Método**: PUT
    - **Endpoint**: /objetos/{id}
    - **Corpo da requisição**:
    ```json
    {
      "nomeObjeto": "Chave Atualizada",
      "localEncontrado": "Sala 21",
      "dataEncontrado": "2025-08-28",
      "nomePessoaEncontrou": "João Silva",
      "urlFoto": "http://exemplo.com/imagens/chave_atualizada.jpg",
      "observacoes": "A chave foi encontrada no chão.",
      "tipoObjetoId": 1
    }
    ```

5. **Excluir Objeto**

    - **Método**: DELETE
    - **Endpoint**: /objetos/{id}
    - **Resposta**:
    ```json
    {
      Objeto excluído...
    }
    ```
