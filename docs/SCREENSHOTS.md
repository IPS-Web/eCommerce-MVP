# 📸 Guía de Capturas de Pantalla

Este documento te guía para tomar capturas de pantalla profesionales del eCommerce MVP para documentación.

## 🎯 Páginas a Capturar

### 1. Página Principal (Homepage)
**Archivo**: `docs/screenshots/homepage.png`
- **URL**: `http://localhost:9002`
- **Qué capturar**:
  - Hero section completo con imagen de fondo
  - Sección de productos destacados (4 productos)
  - Header con navegación
  - Footer
- **Resolución recomendada**: 1920x1080 (Desktop)

### 2. Catálogo de Productos
**Archivo**: `docs/screenshots/products.png`
- **URL**: `http://localhost:9002/products`
- **Qué capturar**:
  - Vista de grid de todos los productos
  - Filtros laterales
  - Barra de búsqueda
  - Opciones de ordenamiento
- **Resolución recomendada**: 1920x1080 (Desktop)

### 3. Detalle de Producto
**Archivo**: `docs/screenshots/product-detail.png`
- **URL**: `http://localhost:9002/products/1`
- **Qué capturar**:
  - Imagen del producto
  - Información del producto (nombre, precio, descripción)
  - Especificaciones técnicas
  - Botón "Add to Cart"
  - Rating y reseñas
- **Resolución recomendada**: 1920x1080 (Desktop)

### 4. Carrito de Compras
**Archivo**: `docs/screenshots/cart.png`
- **URL**: `http://localhost:9002/cart`
- **Qué capturar**:
  - Lista de productos en el carrito
  - Cantidades de productos
  - Resumen del pedido (subtotal, envío, total)
  - Botón "Proceed to Checkout"
- **Resolución recomendada**: 1920x1080 (Desktop)

### 5. Proceso de Checkout
**Archivo**: `docs/screenshots/checkout.png`
- **URL**: `http://localhost:9002/checkout`
- **Qué capturar**:
  - Formulario de información de envío
  - Métodos de pago
  - Resumen del pedido
  - Botón "Place Order"
- **Resolución recomendada**: 1920x1080 (Desktop)

### 6. Página de Éxito (con IA)
**Archivo**: `docs/screenshots/success.png`
- **URL**: `http://localhost:9002/checkout/success`
- **Qué capturar**:
  - Mensaje de confirmación
  - Resumen generado por IA
  - Información del pedido
- **Resolución recomendada**: 1920x1080 (Desktop)

### 7. Vista Móvil
**Archivo**: `docs/screenshots/mobile.png`
- **URL**: Cualquier página
- **Qué capturar**:
  - Página principal en vista móvil
  - Menú hamburguesa abierto
  - Grid de productos en móvil
- **Resolución recomendada**: 375x667 (iPhone SE) o 390x844 (iPhone 12)

## 📱 Instrucciones para Capturar

### Herramientas Recomendadas

#### Opción 1: Herramientas del Navegador
1. **Chrome DevTools**:
   - F12 → Toggle Device Toolbar
   - Seleccionar dispositivo (iPhone, iPad, Desktop)
   - Screenshot con Ctrl+Shift+P → "Screenshot"

2. **Firefox DevTools**:
   - F12 → Responsive Design Mode
   - Screenshot con Ctrl+Shift+S

#### Opción 2: Extensiones del Navegador
- **Full Page Screen Capture** (Chrome)
- **FireShot** (Firefox/Chrome)
- **Awesome Screenshot** (Multi-navegador)

#### Opción 3: Software Especializado
- **Snagit** (Windows/Mac)
- **Lightshot** (Multi-plataforma)
- **Greenshot** (Windows)

### 🎨 Configuración Recomendada

#### Para Desktop (1920x1080)
1. Abre el navegador en pantalla completa
2. Ajusta el zoom al 100%
3. Usa la resolución 1920x1080
4. Asegúrate de que el contenido esté visible sin scroll

#### Para Móvil (375x667)
1. Abre DevTools (F12)
2. Activa Device Toolbar
3. Selecciona "iPhone SE" o "iPhone 12"
4. Captura la pantalla completa

### 📝 Consejos para Capturas Profesionales

1. **Limpieza**:
   - Cierra pestañas innecesarias
   - Usa datos de ejemplo consistentes
   - Evita contenido personal

2. **Consistencia**:
   - Usa el mismo idioma en todas las capturas
   - Mantén el mismo tema de colores
   - Asegúrate de que los productos sean visibles

3. **Calidad**:
   - Usa alta resolución
   - Evita capturas borrosas
   - Asegúrate de que el texto sea legible

4. **Contenido**:
   - Agrega productos al carrito antes de capturar
   - Usa información de ejemplo realista
   - Muestra diferentes estados (vacío, lleno, etc.)

## 🛠️ Preparación del Entorno

### Antes de Capturar

1. **Ejecuta el proyecto**:
   ```bash
   npm run dev
   ```

2. **Abre en el navegador**: `http://localhost:9002`

3. **Configura el idioma**: Cambia a español desde el header

4. **Prepara datos de ejemplo**:
   - Agrega algunos productos al carrito
   - Completa un pedido de prueba
   - Asegúrate de que la IA funcione (si está configurada)

### Datos de Ejemplo para Capturas

#### Productos en el Carrito
- Cámara Aperture Pro (1 unidad)
- Auriculares Aura Wireless (2 unidades)
- Smartwatch Chrono (1 unidad)

#### Información de Envío
- **Nombre**: Juan Pérez
- **Dirección**: Calle Falsa 123
- **Ciudad**: Madrid
- **Código Postal**: 28001
- **País**: España

## 📁 Organización de Archivos

```
docs/screenshots/
├── homepage.png          # Página principal
├── products.png          # Catálogo de productos
├── product-detail.png    # Detalle de producto
├── cart.png             # Carrito de compas
├── checkout.png         # Proceso de checkout
├── success.png          # Página de éxito
├── mobile-homepage.png  # Vista móvil - página principal
├── mobile-products.png  # Vista móvil - productos
└── mobile-cart.png      # Vista móvil - carrito
```

## 🎨 Edición (Opcional)

### Herramientas de Edición
- **GIMP** (Gratuito)
- **Paint.NET** (Windows)
- **Preview** (macOS)
- **Canva** (Online)

### Ediciones Recomendadas
1. **Recortar**: Eliminar barras de scroll innecesarias
2. **Redimensionar**: Mantener proporción 16:9 para desktop
3. **Marcar**: Agregar flechas o círculos para destacar características
4. **Optimizar**: Comprimir para web (mantener calidad)

## ✅ Checklist de Capturas

- [ ] Página principal (desktop)
- [ ] Catálogo de productos (desktop)
- [ ] Detalle de producto (desktop)
- [ ] Carrito de compras (desktop)
- [ ] Proceso de checkout (desktop)
- [ ] Página de éxito (desktop)
- [ ] Vista móvil - página principal
- [ ] Vista móvil - productos
- [ ] Vista móvil - carrito

## 🚀 Después de Capturar

1. **Verifica la calidad** de todas las capturas
2. **Actualiza el README.md** con las rutas correctas
3. **Optimiza las imágenes** para web
4. **Sube al repositorio** en la carpeta `docs/screenshots/`

¡Las capturas de pantalla harán que tu documentación se vea profesional y atractiva! 📸✨

