## Teste Técnico para Vaga de Desenvolvedor Fullstack na Bnex

Este repositório contém o projeto para o teste técnico destinado à vaga de Desenvolvedor Python Fullstack na Bnex. O objetivo do projeto é demonstrar habilidades no desenvolvimento de aplicações Fullstack, envolvendo a criação de uma API com Django Rest Framework (DRF) e uma interface de usuário utilizando Django Templates.

## Estrutura do Projeto

O projeto é dividido em três principais componentes, cada um rodando em contêineres separados usando Docker e Docker Compose:

1. **Backend (API)**: Implementado com Django Rest Framework (DRF). Inclui:
   - **Módulo de Usuários**: CRUD completo para gerenciamento de usuários.
   - **Módulo de Produtos**: CRUD completo para gerenciamento de produtos.
   - **Testes Unitários**: Inclui uma cobertura básica de testes para garantir o funcionamento correto da API.
   - **Commit Lint**: Configurado para garantir que as mensagens de commit sigam um padrão definido.

2. **Frontend**: Desenvolvido com Django Templates. Inclui:
   - **Interface de Usuário**: Permite a interação com os módulos de usuários e produtos.
   - **Testes Funcionais**: Realiza testes para garantir que a interface funcione conforme o esperado.

3. **Banco de Dados**: PostgreSQL, utilizado tanto para o backend quanto para o frontend.

## Configuração e Execução

Para configurar e executar o projeto, siga os passos abaixo:

### Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Python](https://www.python.org/downloads/)

### Passos para Inicialização

1. **Clone o Repositório:**

   ```bash
   git clone https://github.com/0x1Ry4n/desafio-bnex.git
   cd desafio-bnex

2. **Crie e Inicie os Contêineres:**
    O arquivo `docker-compose.yml` define três serviços:
    - **db-server**: Servidor PostgreSQL.
    - **api**: Servidor de backend.
    - **app**: Servidor de frontend.

    - Utilize este comando criará e iniciará os contêineres para o backend, frontend e banco de dados:

    ```bash
    docker-compose up --build
    ```

3. **Acesse o Backend:**
    - A API estará disponível na porta `API_LOCAL_PORT` definida no arquivo .env: 
    ```bash
    http://localhost:(port)/v1/api/
    
4. **Acesso o Frontend:**
  - O frontend estará disponível na porta `APP_LOCAL_PORT` definida no arquivo .env: 
    ```bash
    http://localhost:(port)/ 
    ```

