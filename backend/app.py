from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from config import config

# Carregar variáveis de ambiente
load_dotenv()

def create_app(config_name=None):
    """Factory function para criar a aplicação Flask"""
    app = Flask(__name__)
    
    # Carregar configuração
    config_name = config_name or os.getenv('FLASK_ENV', 'development')
    app.config.from_object(config[config_name])
    
    # CORS - Permitir requisições do frontend Vue.js
    CORS(app, resources={
        r"/api/*": {
            "origins": app.config['CORS_ORIGINS'],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    
    # Registrar blueprints (serão criados depois)
    # from api.routes import auth_bp, products_bp, sales_bp
    # app.register_blueprint(auth_bp, url_prefix='/api/auth')
    # app.register_blueprint(products_bp, url_prefix='/api/products')
    # app.register_blueprint(sales_bp, url_prefix='/api/sales')
    
    @app.route('/')
    def index():
        return {
            'message': 'Atlas Vendas ERP API',
            'version': '1.0.0',
            'status': 'running'
        }
    
    @app.route('/api/health')
    def health():
        return {
            'status': 'healthy',
            'service': 'Atlas Vendas ERP Backend'
        }
    
    return app

# Criar instância da aplicação
app = create_app()

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=app.config['DEBUG'])

