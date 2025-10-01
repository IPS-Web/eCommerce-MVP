#!/bin/bash

echo "🛍️ eCommerce MVP - Setup Automático para Linux/Mac"
echo "================================================"
echo ""

echo "📋 Verificando prerrequisitos..."
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado."
    echo "📥 Por favor, instala Node.js desde: https://nodejs.org/"
    echo "💡 Versión recomendada: 18 o superior"
    exit 1
fi

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado."
    echo "📥 npm debería venir incluido con Node.js"
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"
echo "✅ npm encontrado: $(npm --version)"
echo ""

echo "📦 Instalando dependencias..."
echo "Esto puede tomar unos minutos..."

if ! npm install; then
    echo "❌ Error al instalar dependencias."
    echo "💡 Intenta ejecutar: npm install --force"
    exit 1
fi

echo "✅ Dependencias instaladas correctamente!"
echo ""

echo "⚙️ Configurando variables de entorno..."
if [ ! -f .env.local ]; then
    cp env.example .env.local
    echo "✅ Archivo .env.local creado desde env.example"
    echo "💡 Edita .env.local para agregar tu clave API de Google AI (opcional)"
else
    echo "ℹ️ El archivo .env.local ya existe"
fi

echo ""
echo "🚀 ¡Setup completado!"
echo ""
echo "📝 Próximos pasos:"
echo "   1. Abre .env.local y configura tu clave API de Google AI (opcional)"
echo "   2. Ejecuta: npm run dev"
echo "   3. Abre tu navegador en: http://localhost:9002"
echo ""
echo "💡 Comandos útiles:"
echo "   - npm run dev      : Iniciar servidor de desarrollo"
echo "   - npm run build    : Construir para producción"
echo "   - npm run lint     : Verificar código"
echo ""

# Hacer el script ejecutable
chmod +x setup.sh

