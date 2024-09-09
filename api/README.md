# Projeto Django - Desafio Bnex

Este projeto é uma API desenvolvida como parte de um desafio para a vaga de Desenvolvedor Fullstack Python da Bnex. A API é configurada com Django e Django Rest Framework (DRF) e inclui documentação interativa gerada com Swagger e ReDoc.

## Configuração e Execução

- Altere as variáveis de ambiente do arquivo .env conforme sua necessidade

## Configuração de URLs

A configuração de URLs do projeto está definida no arquivo `urls.py`. Aqui está uma visão geral das rotas e suas respectivas funcionalidades:

### Rotas Configuradas

1. **Administração Django**
   - **URL**: `/admin/`
   - **Descrição**: Interface administrativa do Django para gerenciar o conteúdo do projeto.

2. **Health Check**
   - **URL**: `/api/v1/healthcheck/`
   - **Descrição**: Endpoint simples para verificar se a API está funcionando. Retorna "OK" com o status HTTP 200.

3. **Endpoints de Usuários**
   - **URL**: `/api/v1/`
   - **Descrição**: Inclui as rotas definidas no arquivo `users.urls`, que gerencia operações relacionadas a usuários.

4. **Endpoints de Produtos**
   - **URL**: `/api/v1/`
   - **Descrição**: Inclui as rotas definidas no arquivo `products.urls`, que gerencia operações relacionadas a produtos.

5. **Documentação Swagger**
   - **URL**: `/api/v1/swagger/`
   - **Descrição**: Interface Swagger para visualizar e interagir com a API. Disponível em formato UI Swagger.

6. **Documentação ReDoc**
   - **URL**: `/api/v1/redoc/`
   - **Descrição**: Interface ReDoc para visualizar e interagir com a API. Disponível em formato UI ReDoc.

### Configuração do Swagger

A documentação da API é gerada usando a biblioteca `drf-yasg`. O esquema Swagger é configurado com as seguintes informações:

- **Título**: Desafio Bnex API
- **Versão**: v1
- **Descrição**: API utilizada no desafio para a vaga de Desenvolvedor Fullstack Python da Bnex
- **Termos de Serviço**: [Google Terms](https://www.google.com/policies/terms/)
- **Contato**: contact@myapi.local
- **Licença**: BSD License

## Rodando o Projeto

1. **Instale as dependências**

   Certifique-se de que todas as dependências estão instaladas. Você pode usar um ambiente virtual e o `pip` para instalar as dependências listadas no arquivo `requirements.txt`:

   ```bash
   pip install -r requirements.txt
   ```

   Também instale as dependências de desenvolvedor listadas no arquivo 'requirements-dev.txt':

   ```bash
   pip install -r requirements-dev.txt
   ```


2. **Configuração do Banco de Dados**

   Certifique-se de que o banco de dados está configurado corretamente e as migrações estão aplicadas:

   ```bash
   python manage.py makemigrations
   ```

   ```bash
   python manage.py migrate
   ```

3. **Inicie o Servidor de Desenvolvimento**

   ```bash
   python manage.py runserver
   ```

   O servidor estará disponível em http://localhost:8000/.

4. **Acessando a Documentação**
    - **Swagger UI:** Navegue até [http://localhost:8000/api/v1/swagger/](http://localhost:8000/api/v1/swagger/) para acessar a interface Swagger da documentação da API.
    - **ReDoc UI:** Navegue até [http://localhost:8000/api/v1/redoc/](http://localhost:8000/api/v1/redoc/) para acessar a interface ReDoc da documentação da API.

5. **Execução de testes:**
    Para executar os testes unitários no backend, entre na pasta `/api` e utilize o seguinte comando: 
    ```bash
        python manage.py test
    ```