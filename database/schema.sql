-- Usuários
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    tipo_usuario VARCHAR(10) NOT NULL CHECK (tipo_usuario IN ('admin', 'cliente')),
    pontos INTEGER DEFAULT 0,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ecopontos (locais de coleta)
CREATE TABLE ecopontos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco TEXT NOT NULL,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reciclagens (realizadas pelos clientes)
CREATE TABLE reciclagens (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    peso_kg DECIMAL(5,2) NOT NULL,
    pontos_gerados INTEGER NOT NULL,
    data_reciclagem TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Denúncias (enviadas pelos clientes)
CREATE TABLE denuncias (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    descricao TEXT NOT NULL,
    imagem_url TEXT,
    status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'em análise', 'resolvido')),
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Histórico de troca de pontos
CREATE TABLE trocas (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    pontos_usados INTEGER NOT NULL,
    recompensa TEXT NOT NULL,
    data_troca TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
