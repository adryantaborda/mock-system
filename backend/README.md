# Atlas Vendas ERP - Backend API

Backend Flask para o sistema Atlas Vendas ERP.

## Estrutura do Projeto

```
backend/
├── api/
│   ├── routes/       # Blueprints das rotas
│   ├── models/       # Modelos de dados
│   ├── services/     # Lógica de negócio
│   └── utils/        # Funções utilitárias
├── app.py            # Aplicação principal
├── requirements.txt  # Dependências
└── .env              # Variáveis de ambiente (criar a partir do .env.example)
```

## Instalação

1. Criar ambiente virtual:
```bash
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows
```

2. Instalar dependências:
```bash
pip install -r requirements.txt
```

3. Configurar variáveis de ambiente:
```bash
cp .env.example .env
# Editar .env com suas configurações
```

## Executar

```bash
python app.py
```

A API estará disponível em `http://localhost:5000`

## Endpoints Disponíveis

- `GET /` - Informações da API
- `GET /api/health` - Health check

## Próximos Passos

- Implementar autenticação (JWT)
- Criar rotas para produtos
- Criar rotas para vendas
- Criar rotas para clientes
- Criar rotas para estoque
- Criar rotas para financeiro
- Implementar banco de dados

