# Etapa 1: Build - Usamos uma imagem com npm e yarn para instalar dependências
FROM node:18 AS builder

WORKDIR /app

# Copia apenas os arquivos de dependência
COPY package*.json ./

# Instala todas as dependências
RUN npm ci

# Copia o resto do código fonte
COPY . .

# Etapa 2: Runtime - Imagem leve com apenas o Node.js
FROM node:18-slim

WORKDIR /app

# Copia apenas o que é necessário da etapa de build
COPY --from=builder /app ./

# Expõe a porta
EXPOSE 3000

# Comando para iniciar a aplicação (exemplo com dockerize aguardando o banco)
# Altere "postgres:5432" para o host e porta do seu serviço de dependência
# CMD ["dockerize", "-wait", "tcp://mysql:3306", "-timeout", "20s", "node", "index.js"]
# Comando para iniciar a aplicação
CMD ["node", "index.js"]
