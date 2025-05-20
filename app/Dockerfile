# Etapa 1: Build - Usamos uma imagem com npm e yarn para instalar dependências
FROM node:18 AS builder

WORKDIR /app

# Copia apenas os arquivos de dependência
COPY package*.json ./

# Instala todas as dependências
RUN npm install

# Copia o resto do código fonte
COPY . .

# Etapa 2: Runtime - Imagem leve com apenas o Node.js
FROM node:18-slim

WORKDIR /app

# Copia apenas o que é necessário da etapa de build
COPY --from=builder /app /app

# Expõe a porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "index.js"]