"""
Configurações da aplicação Flask
"""
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Configuração base"""
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    DEBUG = os.getenv('FLASK_DEBUG', 'True') == 'True'
    
    # CORS
    CORS_ORIGINS = [
        'http://localhost:5173',
        'http://localhost:3000',
        'http://127.0.0.1:5173'
    ]
    
    # Database
    DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///atlas_vendas.db')
    
    # JWT (para implementação futura)
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key-change-in-production')
    JWT_ACCESS_TOKEN_EXPIRES = 3600  # 1 hora

class DevelopmentConfig(Config):
    """Configuração para desenvolvimento"""
    DEBUG = True

class ProductionConfig(Config):
    """Configuração para produção"""
    DEBUG = False
    SECRET_KEY = os.getenv('SECRET_KEY')  # Obrigatório em produção

class TestingConfig(Config):
    """Configuração para testes"""
    TESTING = True
    DATABASE_URL = 'sqlite:///:memory:'

# Mapeamento de configurações
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}

