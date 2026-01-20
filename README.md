# 🐍 Python for AI Engineers

Una aplicación web interactiva para aprender Python enfocada en AI/ML, diseñada específicamente para desarrolladores con experiencia en Kotlin.

## ✨ Características

- **🎨 6 Temas Visuales**: Light, Dark, Synthwave, Monokai, Dracula, Nord
- **🎮 Sistema de Gamificación**: XP, niveles, logros y rachas
- **📱 Optimizado para iPhone**: Diseño mobile-first, touch-friendly
- **🔥 Enfoque en AI/ML**: 80% del contenido centrado en Python para AI
- **🏋️ Ejercicios Variados**: Quiz, código, traducción Kotlin→Python, desafíos
- **💾 Progreso Persistente**: LocalStorage guarda tu progreso automáticamente
- **🚀 Sin Backend**: Todo funciona en el navegador

## 📚 Módulos Incluidos

### Módulos de Muestra (Implementados)
1. **Python Express** - Sintaxis esencial viniendo de Kotlin
2. **NumPy Fundamentals** - Arrays y operaciones vectorizadas para AI
3. **Deep Learning con PyTorch** - Introducción a redes neuronales

### Módulos para Expandir (Estructura lista, contenido pendiente)
4. **Pandas for Data Science** - DataFrames y manipulación de datos
5. **Data Visualization** - Matplotlib y Seaborn
6. **Scikit-learn Basics** - Machine Learning workflows
7. **TensorFlow/Keras** - Alternative deep learning framework
8. **AI Engineering Essentials** - Buenas prácticas y herramientas
9. **Proyectos Integrados** - Mini-proyectos prácticos

## 🚀 Inicio Rápido

### Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# La app estará disponible en http://localhost:5173
```

### Build de Producción

```bash
# Crear build optimizado
npm run build

# Vista previa del build
npm run preview
```

## 📦 Deployment a GitHub Pages

### Opción 1: Usando gh-pages (Recomendado)

1. Crea un repositorio en GitHub (ej: `python-learning-app`)

2. Actualiza `vite.config.js` con el nombre de tu repositorio:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/tu-repositorio/', // Cambia esto
})
```

3. Inicializa git y sube el código:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-repositorio.git
git push -u origin main
```

4. Despliega a GitHub Pages:
```bash
npm run deploy
```

5. Ve a Settings → Pages en GitHub y asegúrate de que la fuente sea `gh-pages` branch

Tu app estará disponible en: `https://tu-usuario.github.io/tu-repositorio/`

### Opción 2: GitHub Actions (Alternativa)

Crea `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 🎨 Personalización

### Agregar Nuevos Módulos

Edita `src/data/modulesData.js` y agrega nuevos módulos con esta estructura:

```javascript
{
  id: 'modulo-id',
  title: 'Título del Módulo',
  description: 'Descripción corta',
  category: 'ai', // o 'basic'
  icon: '🔥',
  lessons: [
    {
      id: 'lesson-id',
      title: 'Título de la Lección',
      content: `# Markdown content...`,
      exercises: [
        {
          id: 'ex1',
          type: 'quiz', // 'quiz', 'fill-blank', 'predict-output', 'kotlin-translate', 'code-challenge'
          question: '¿Pregunta?',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 0,
          explanation: 'Explicación detallada'
        }
      ]
    }
  ]
}
```

### Tipos de Ejercicios Disponibles

1. **quiz**: Opción múltiple
2. **fill-blank**: Completar código con respuestas separadas por comas
3. **predict-output**: Predecir qué imprimirá el código
4. **kotlin-translate**: Traducir código Kotlin a Python
5. **code-challenge**: Escribir código completo con hints

### Personalizar Temas

Edita `src/index.css` y modifica las variables CSS de los temas existentes o agrega nuevos.

### Agregar Logros

Edita `src/utils/xpCalculator.js` en la sección `ACHIEVEMENTS` para agregar nuevos logros.

## 🛠️ Tecnologías Utilizadas

- **React 19** - UI Framework
- **Vite** - Build tool ultra-rápido
- **Tailwind CSS** - Utility-first CSS
- **react-markdown** - Renderizado de Markdown
- **LocalStorage API** - Persistencia de datos

## 📱 Optimización Móvil

- Diseño mobile-first
- Botones touch-friendly (mínimo 44x44px)
- Font-size 16px para evitar auto-zoom en iOS
- Scrolling suave y responsivo
- Sin necesidad de teclado externo

## 🤝 Expandir el Contenido

La aplicación está diseñada para ser fácilmente expandible:

1. **Agregar Lecciones**: Simplemente edita `modulesData.js`
2. **Crear Cheatsheets**: Agrega componentes en `src/components/ui/`
3. **Nuevos Tipos de Ejercicios**: Extiende `ExerciseRenderer.jsx`
4. **Tabla Comparativa PyTorch vs TensorFlow**: Crea un componente dedicado

### Estructura Sugerida para Contenido Adicional

```
src/
├── data/
│   ├── modulesData.js          # Módulos y lecciones
│   ├── cheatsheets.js          # Cheatsheets Kotlin↔Python
│   └── frameworkComparison.js  # PyTorch vs TensorFlow
```

## 📝 Licencia

MIT License - Siéntete libre de usar y modificar para tu aprendizaje.

## 🎯 Roadmap

- [ ] Completar módulos 4-9 con contenido detallado
- [ ] Agregar tabla comparativa PyTorch vs TensorFlow
- [ ] Implementar cheatsheets descargables
- [ ] Agregar modo de revisión de ejercicios completados
- [ ] Sistema de notas/apuntes del usuario
- [ ] Export de progreso como PDF

## 🐛 Troubleshooting

### La aplicación no carga después del deploy
- Verifica que `base` en `vite.config.js` coincida con el nombre del repositorio
- Asegúrate de que GitHub Pages esté configurado para usar la rama `gh-pages`

### Los temas no cambian
- Limpia el localStorage del navegador
- Verifica que las variables CSS estén correctamente definidas en `index.css`

### El progreso no se guarda
- Verifica que el navegador permita localStorage
- En modo incógnito, el progreso no se persiste

## 💡 Tips de Uso

1. **Completa ejercicios en orden** para mejor comprensión
2. **Cambia de tema** según la hora del día (Light de día, Dark de noche)
3. **Mantén la racha** visitando la app diariamente
4. **Revisa las explicaciones** incluso cuando aciertes
5. **Experimenta con el código** en un entorno Python local

---

**¡Happy Learning!** 🚀🐍

Para preguntas o sugerencias, abre un issue en GitHub.
