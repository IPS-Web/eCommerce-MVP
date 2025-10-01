# 🚀 Guía de Instalación - eCommerce MVP

## 📋 Prerrequisitos

### Sistema Operativo
- **Windows**: 10 o superior
- **macOS**: 10.15 (Catalina) o superior  
- **Linux**: Ubuntu 18.04+ o distribución moderna

### Software Requerido
- **Node.js**: Versión 18 o superior
  - [Descargar Node.js](https://nodejs.org/)
  - Verificar instalación: `node --version`
- **npm**: Incluido con Node.js
  - Verificar instalación: `npm --version`
- **Git**: Para clonar el repositorio
  - [Descargar Git](https://git-scm.com/)

## 🛠️ Instalación Automática

### Windows
```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/eCommerce-MVP.git
cd eCommerce-MVP

# Ejecuta el script de setup
setup.bat
```

### Linux/macOS
```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/eCommerce-MVP.git
cd eCommerce-MVP

# Ejecuta el script de setup
chmod +x setup.sh
./setup.sh
```

## 🛠️ Instalación Manual

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/eCommerce-MVP.git
cd eCommerce-MVP
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno
```bash
# Copia el archivo de ejemplo
cp env.example .env.local

# Edita el archivo (opcional - para funcionalidad de IA)
nano .env.local
# o
code .env.local
```

### 4. Configurar Google AI (Opcional)
1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crea una nueva API key
3. Agrega la clave a `.env.local`:
   ```env
   GOOGLE_AI_API_KEY=tu_clave_aqui
   ```

### 5. Ejecutar el Proyecto
```bash
npm run dev
```

### 6. Abrir en el Navegador
Navega a [http://localhost:9002](http://localhost:9002)

## 🐛 Solución de Problemas

### Error: Node.js no encontrado
```bash
# Verifica la instalación
node --version

# Si no está instalado, descarga desde:
# https://nodejs.org/
```

### Error: npm no encontrado
```bash
# npm viene incluido con Node.js
# Si no funciona, reinstala Node.js
```

### Error: Puerto 9002 en uso
```bash
# Opción 1: Cambiar puerto
npm run dev -- -p 3000

# Opción 2: Matar proceso en puerto 9002
# Windows:
netstat -ano | findstr :9002
taskkill /PID <PID> /F

# Linux/macOS:
lsof -ti:9002 | xargs kill -9
```

### Error: Dependencias no se instalan
```bash
# Limpia caché de npm
npm cache clean --force

# Elimina node_modules y package-lock.json
rm -rf node_modules package-lock.json

# Reinstala
npm install
```

### Error: Permisos en Linux/macOS
```bash
# Da permisos al script
chmod +x setup.sh

# O ejecuta con sudo (no recomendado)
sudo npm install
```

### Error: Google AI API
- La aplicación funciona sin la API de Google AI
- Solo se necesita para la funcionalidad de resúmenes con IA
- Sin la API, los resúmenes mostrarán un mensaje de error

## 🔧 Scripts Disponibles

### Desarrollo
```bash
npm run dev              # Servidor de desarrollo con Turbopack
npm run dev:standard     # Servidor de desarrollo estándar
```

### Producción
```bash
npm run build            # Construir para producción
npm run start            # Servidor de producción
```

### Utilidades
```bash
npm run setup            # Instalar dependencias y configurar
npm run lint             # Verificar código
npm run lint:fix         # Corregir problemas de linting
npm run typecheck        # Verificar tipos TypeScript
npm run clean            # Limpiar archivos generados
```

### IA (Opcional)
```bash
npm run genkit:dev       # Servidor de desarrollo de IA
npm run genkit:watch     # Watch mode para IA
```

## 📁 Estructura del Proyecto

```
eCommerce-MVP/
├── docs/                 # Documentación
├── src/
│   ├── app/             # App Router de Next.js
│   ├── components/      # Componentes React
│   ├── context/         # Context API
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilidades y datos
│   └── ai/              # Integración con IA
├── setup.bat            # Script de setup para Windows
├── setup.sh             # Script de setup para Linux/macOS
├── env.example          # Variables de entorno de ejemplo
└── README.md            # Documentación principal
```

## 🚀 Deployment

### Firebase App Hosting
```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Iniciar sesión
firebase login

# Desplegar
firebase deploy
```

### Vercel
```bash
# Instalar Vercel CLI
npm install -g vercel

# Desplegar
vercel
```

### Docker
```bash
# Construir imagen
docker build -t ecommerce-mvp .

# Ejecutar contenedor
docker run -p 9002:9002 ecommerce-mvp
```

## 📞 Soporte

Si encuentras problemas:

1. **Revisa esta guía** de solución de problemas
2. **Verifica los prerrequisitos** están instalados
3. **Revisa los issues** en el repositorio de GitHub
4. **Crea un nuevo issue** con detalles del error

## 🎯 Próximos Pasos

Una vez instalado:

1. **Explora la aplicación** en http://localhost:9002
2. **Revisa el código** en la carpeta `src/`
3. **Personaliza los colores** en `tailwind.config.ts`
4. **Modifica los productos** en `src/lib/data.ts`
5. **Agrega nuevas funcionalidades** según necesites

¡Disfruta desarrollando! 🚀

