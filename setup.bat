@echo off
echo 🛍️ eCommerce MVP - Setup Automático para Windows
echo ================================================
echo.

echo 📋 Verificando prerrequisitos...
echo.

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js no está instalado.
    echo 📥 Por favor, instala Node.js desde: https://nodejs.org/
    echo 💡 Versión recomendada: 18 o superior
    pause
    exit /b 1
)

REM Verificar si npm está instalado
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm no está instalado.
    echo 📥 npm debería venir incluido con Node.js
    pause
    exit /b 1
)

echo ✅ Node.js encontrado: 
node --version
echo ✅ npm encontrado: 
npm --version
echo.

echo 📦 Instalando dependencias...
echo Esto puede tomar unos minutos...
npm install

if %errorlevel% neq 0 (
    echo ❌ Error al instalar dependencias.
    echo 💡 Intenta ejecutar: npm install --force
    pause
    exit /b 1
)

echo ✅ Dependencias instaladas correctamente!
echo.

echo ⚙️ Configurando variables de entorno...
if not exist .env.local (
    copy env.example .env.local >nul
    echo ✅ Archivo .env.local creado desde env.example
    echo 💡 Edita .env.local para agregar tu clave API de Google AI (opcional)
) else (
    echo ℹ️ El archivo .env.local ya existe
)

echo.
echo 🚀 ¡Setup completado!
echo.
echo 📝 Próximos pasos:
echo    1. Abre .env.local y configura tu clave API de Google AI (opcional)
echo    2. Ejecuta: npm run dev
echo    3. Abre tu navegador en: http://localhost:9002
echo.
echo 💡 Comandos útiles:
echo    - npm run dev      : Iniciar servidor de desarrollo
echo    - npm run build    : Construir para producción
echo    - npm run lint     : Verificar código
echo.

pause

