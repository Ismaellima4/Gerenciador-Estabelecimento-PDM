## Gerenciador de Estabeleciemento

## Como executar o projeto com Docker Compose

Este projeto usa Docker Compose para gerenciar e iniciar todos os serviços necessários em um único comando. Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

### ⚙️ Pré-requisitos
- **Docker**: Certifique-se de que o Docker esteja instalado. Você pode [baixar aqui](https://docs.docker.com/get-docker/).
- **Docker Compose**: Geralmente já vem instalado com o Docker Desktop. Verifique a versão com `docker-compose --version`.

### 🚀 Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Ismaellima4/Gerenciador-Estabelecimento-PDM.git
    cd Gerenciador-Estabelecimento-PDM
    ```

2.  **Inicie os serviços:**
    Execute o comando abaixo na pasta raiz do projeto. Ele irá construir as imagens e iniciar todos os contêineres em segundo plano.

    ```bash
    docker-compose up --build -d
    ```

    - `up`: Inicia os serviços definidos no `docker-compose.yml`.
    - `--build`: Força a reconstrução das imagens, garantindo que o código mais recente seja usado.
    - `-d`: Executa os contêineres em modo "detached", rodando em segundo plano e liberando seu terminal.

3.  **Verifique os serviços:**
    Para conferir se tudo está rodando corretamente, você pode listar os contêineres ativos:

    ```bash
    docker-compose ps
    ```

### Executar a Aplicação

1. **Adicionar O IP da máquina para o expo GO conseguir manda request para o Backenf**
    ```bash
       cd store/
    ```
    modifique o env.ts

  ```typescript
    export const API_URL = 'http://<IP>:8080'; //Coloque seu IP
  ```

2. **Executando a Aplicação**
     ```bash
       pnpm start
    ```
### Link dos backend e serviço de upload de imagens
1. [Backend](https://github.com/Ismaellima4/Gerenciador-estabelecimento-pdm-backend)
2. [Serviço de Upload](https://github.com/Ismaellima4/upload-file-api-ge)
