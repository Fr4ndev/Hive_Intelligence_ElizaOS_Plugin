# Plugin de Hive Intelligence para ElizaOS

Este plugin proporciona integración con Hive Intelligence para agentes ElizaOS, permitiendo consultas de datos blockchain y análisis de mercado.

## 🚀 Características

- Integración con la API de Hive Intelligence
- Soporte para consultas de datos blockchain
- Análisis de precios de criptomonedas
- Compatible con agentes de Telegram
- Arquitectura modular y extensible

## 📋 Requisitos Previos

- Node.js 23.x o superior
- Bun (recomendado)
- ElizaOS CLI instalado
- Token de bot de Telegram (para integración con Telegram)
- Clave API de Hive Intelligence (para funcionalidad completa)
- Clave API de OpenRouter (para el modelo de lenguaje)

## 🛠️ Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/elizaOS/eliza-plugin-starter
cd eliza-plugin-starter
```

### 2. Instalar Dependencias

```bash
pnpm install
pnpm add -D ts-node
pnpm add @ai16z/client-telegram
```

### 3. Configurar el Plugin de Hive Intelligence

El plugin ya está incluido en `src/plugins/hive/index.ts`. No se requiere configuración adicional para la estructura básica.

## ⚙️ Configuración

### 1. Configurar Variables de Entorno

Crea o edita el archivo de personaje `characters/telegram_agent.character.json`:

```json
{
  "name": "TelegramMarketAnalyst",
  "plugins": ["../plugins/hive/index.ts"],
  "clients": ["telegram"],
  "modelProvider": "openrouter",
  "settings": {
    "secrets": {
      "TELEGRAM_BOT_TOKEN": "TU_TOKEN_DE_TELEGRAM",
      "OPENROUTER_API_KEY": "TU_CLAVE_DE_OPENROUTER",
      "HIVE_API_KEY": "TU_CLAVE_DE_HIVE_INTELLIGENCE"
    }
  },
  "system": "You are a market analyst AI that can provide insights and analysis. You will operate via Telegram.",
  "bio": [
    "I am an AI specialized in market analysis, providing insights and trends."
  ],
  "lore": [
    "I constantly monitor market data to provide up-to-date information."
  ],
  "messageExamples": [
    [
      {
        "user": "{{user1}}",
        "content": {
          "text": "What is the current price of Bitcoin?"
        }
      },
      {
        "user": "TelegramMarketAnalyst",
        "content": {
          "text": "Let me check the current Bitcoin price for you."
        }
      }
    ]
  ],
  "postExamples": [
    "Market trends indicate a potential shift in cryptocurrency values."
  ],
  "adjectives": [
    "analytical",
    "informative",
    "precise"
  ],
  "topics": [
    "cryptocurrency",
    "blockchain",
    "market analysis",
    "finance"
  ],
  "style": {
    "all": [
      "Provide concise and factual information.",
      "Maintain a professional and analytical tone."
    ],
    "chat": [
      "Respond directly to user queries about market data."
    ],
    "post": [
      "Share general market insights and trends."
    ]
  }
}
```

### 2. Obtener Tokens Necesarios

#### Token de Bot de Telegram
1. Abre Telegram y busca `@BotFather`
2. Envía `/newbot` y sigue las instrucciones
3. Copia el token proporcionado

#### Clave API de OpenRouter
1. Visita [OpenRouter](https://openrouter.ai/)
2. Crea una cuenta y genera una clave API
3. Copia la clave API

#### Clave API de Hive Intelligence
1. Visita [Hive Intelligence](https://hiveintelligence.xyz/)
2. Regístrate y obtén una clave API
3. **Nota:** Puede requerir un token HINT adicional para funcionalidad completa

## 🚀 Uso

### 1. Compilar el Proyecto

```bash
pnpm tsc
```

### 2. Ejecutar el Agente

```bash
pnpm mock-eliza --characters=./characters/telegram_agent.character.json
```

### 3. Interactuar con el Bot

Una vez que el agente esté ejecutándose, puedes interactuar con él a través de Telegram buscando tu bot por su nombre de usuario.

## 📝 Comandos Disponibles

El agente puede responder a consultas como:

- "¿Cuál es el precio actual de Bitcoin?"
- "Analiza el mercado de Ethereum"
- "Dame información sobre DeFi"
- "¿Qué tendencias ves en el mercado cripto?"

## 🔧 Desarrollo

### Estructura del Plugin

```
src/plugins/hive/
├── index.ts          # Archivo principal del plugin
└── README.md         # Documentación específica del plugin
```

### Arquitectura del Plugin

El plugin está compuesto por:

- **HiveProvider**: Maneja las llamadas a la API de Hive Intelligence
- **HivePlugin**: Clase principal que define las acciones disponibles
- **Acciones**: `queryBlockchainData` para consultas de datos blockchain

### Personalización

Para personalizar el plugin:

1. Edita `src/plugins/hive/index.ts`
2. Modifica las acciones disponibles
3. Ajusta los prompts y ejemplos
4. Recompila con `pnpm tsc`

## ⚠️ Limitaciones Conocidas

- La integración completa con Hive Intelligence requiere un token HINT
- Pueden existir restricciones de IP/geolocalización
- El plugin actual incluye un marcador de posición para futuras mejoras

## 🤝 Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si encuentras problemas:

1. Revisa la documentación de [ElizaOS](https://github.com/elizaOS/eliza)
2. Consulta los issues existentes en GitHub
3. Crea un nuevo issue con detalles del problema

## 🔗 Enlaces Útiles

- [Documentación de ElizaOS](https://github.com/elizaOS/eliza)
- [Hive Intelligence](https://hiveintelligence.xyz/)
- [OpenRouter](https://openrouter.ai/)
- [Telegram Bot API](https://core.telegram.org/bots/api)

---

**Nota:** Este plugin está en desarrollo activo. La funcionalidad completa de Hive Intelligence está pendiente de resolución de limitaciones de API y tokens.
