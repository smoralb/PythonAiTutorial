export const modulesData = [
  {
    id: 'python-express',
    title: 'Python Express',
    description: 'Fast track: Sintaxis esencial de Python viniendo de Kotlin',
    category: 'basic',
    icon: '⚡',
    lessons: [
      {
        id: 'syntax-basics',
        title: 'Python vs Kotlin: Lo Esencial',
        content: `
# Python vs Kotlin: Lo Esencial

Ya conoces programación con Kotlin, así que vamos directo al grano con las diferencias clave:

## Indentación vs Llaves

**Kotlin:**
\`\`\`kotlin
if (condition) {
    doSomething()
}
\`\`\`

**Python:**
\`\`\`python
if condition:
    do_something()
\`\`\`

Python usa **indentación** (4 espacios) en lugar de llaves.

## None vs null

**Kotlin:** \`null\`
**Python:** \`None\`

## Tipado

**Kotlin:** Tipado estático
\`\`\`kotlin
val name: String = "Ana"
\`\`\`

**Python:** Tipado dinámico (opcional type hints)
\`\`\`python
name = "Ana"  # tipo inferido
name: str = "Ana"  # con type hint
\`\`\`

## Funciones

**Kotlin:**
\`\`\`kotlin
fun greet(name: String): String {
    return "Hola, \$name"
}
\`\`\`

**Python:**
\`\`\`python
def greet(name):
    return f"Hola, {name}"
\`\`\`

## Lists

**Kotlin:**
\`\`\`kotlin
val numbers = listOf(1, 2, 3, 4, 5)
val doubled = numbers.map { it * 2 }
\`\`\`

**Python:**
\`\`\`python
numbers = [1, 2, 3, 4, 5]
doubled = [x * 2 for x in numbers]  # list comprehension
\`\`\`

Las **list comprehensions** son una característica poderosa y muy usada en Python.
        `,
        exercises: [
          {
            id: 'ex1',
            type: 'quiz',
            question: '¿Qué usa Python para delimitar bloques de código?',
            options: [
              'Llaves { }',
              'Indentación (espacios)',
              'Paréntesis ( )',
              'Palabras clave begin/end'
            ],
            correctAnswer: 1,
            explanation: 'Python usa indentación (típicamente 4 espacios) para delimitar bloques de código. Esto hace que el código sea visualmente limpio y fuerza buenas prácticas de formato.'
          },
          {
            id: 'ex2',
            type: 'kotlin-translate',
            question: 'Traduce este código Kotlin a Python:',
            kotlinCode: `val numbers = listOf(1, 2, 3, 4, 5)
val squared = numbers.map { it * it }`,
            correctAnswer: `numbers = [1, 2, 3, 4, 5]
squared = [x * x for x in numbers]`,
            explanation: 'En Python usamos list comprehensions `[expresión for item in iterable]`. Es equivalente al map de Kotlin pero más conciso. También podríamos usar `map(lambda x: x * x, numbers)` pero las comprehensions son más idiomáticas.'
          },
          {
            id: 'ex3',
            type: 'predict-output',
            question: '¿Qué imprimirá este código Python?',
            code: `x = [1, 2, 3]
y = [n * 2 for n in x if n > 1]
print(y)`,
            options: [
              '[2, 4, 6]',
              '[4, 6]',
              '[1, 2, 3]',
              '[2, 3]'
            ],
            correctAnswer: 1,
            explanation: 'La list comprehension filtra primero (if n > 1), dejando [2, 3], luego multiplica por 2, resultando en [4, 6]. En Kotlin sería: `x.filter { it > 1 }.map { it * 2 }`'
          }
        ]
      },
      {
        id: 'comprehensions',
        title: 'Comprehensions: El Poder de Python',
        content: `
# List, Dict y Set Comprehensions

Las comprehensions son una de las características más poderosas y elegantes de Python.

## List Comprehensions

**Sintaxis básica:**
\`\`\`python
[expresión for item in iterable if condición]
\`\`\`

**Ejemplos:**
\`\`\`python
# Cuadrados de números pares
squares = [x**2 for x in range(10) if x % 2 == 0]
# [0, 4, 16, 36, 64]

# Equivalente en Kotlin:
# (0..9).filter { it % 2 == 0 }.map { it * it }
\`\`\`

## Dictionary Comprehensions

\`\`\`python
# Crear un diccionario de cuadrados
squares_dict = {x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Equivalente en Kotlin:
# (0..4).associate { it to it * it }
\`\`\`

## Set Comprehensions

\`\`\`python
# Crear un set (sin duplicados)
unique_lengths = {len(word) for word in ['hello', 'world', 'foo']}
# {3, 5}
\`\`\`

## Comprehensions Anidadas

\`\`\`python
# Matriz aplanada
matrix = [[1, 2], [3, 4], [5, 6]]
flat = [num for row in matrix for num in row]
# [1, 2, 3, 4, 5, 6]

# Equivalente en Kotlin:
# matrix.flatten()
\`\`\`
        `,
        exercises: [
          {
            id: 'ex1',
            type: 'fill-blank',
            question: 'Completa el código para crear una lista de números del 1 al 10 que sean divisibles por 3:',
            code: `divisible_by_3 = [x for x in _____ if x _____ == 0]`,
            blanks: ['range(1, 11)', '% 3'],
            explanation: '`range(1, 11)` genera números del 1 al 10 (11 es exclusivo). `x % 3 == 0` verifica si x es divisible por 3.'
          },
          {
            id: 'ex2',
            type: 'quiz',
            question: '¿Cuál es la ventaja principal de las comprehensions sobre loops tradicionales?',
            options: [
              'Son más rápidas siempre',
              'Son más concisas y expresivas',
              'Usan menos memoria',
              'Permiten múltiples iteraciones'
            ],
            correctAnswer: 1,
            explanation: 'Las comprehensions son más concisas y expresivas, haciendo el código más legible. En términos de rendimiento son similares a loops, pero el código es más "pythonico" y claro en su intención.'
          }
        ]
      }
    ]
  },
  {
    id: 'numpy-fundamentals',
    title: 'NumPy Fundamentals',
    description: 'Arrays multidimensionales y operaciones vectorizadas para AI',
    category: 'ai',
    icon: '🔢',
    lessons: [
      {
        id: 'arrays-intro',
        title: 'Arrays de NumPy vs Listas de Python',
        content: `
# NumPy: La Base de AI en Python

NumPy es fundamental para todo en AI/ML. Proporciona arrays multidimensionales eficientes y operaciones vectorizadas.

## ¿Por qué NumPy?

Las listas de Python son lentas para operaciones matemáticas a gran escala. NumPy:
- Es hasta 100x más rápido
- Usa menos memoria
- Proporciona operaciones vectorizadas
- Es la base de pandas, scikit-learn, TensorFlow, PyTorch

## Crear Arrays

\`\`\`python
import numpy as np

# Desde lista
arr = np.array([1, 2, 3, 4, 5])

# Zeros
zeros = np.zeros((3, 4))  # matriz 3x4 de ceros

# Ones
ones = np.ones((2, 3))

# Range
range_arr = np.arange(0, 10, 2)  # [0, 2, 4, 6, 8]

# Linspace (valores equidistantes)
lin = np.linspace(0, 1, 5)  # [0, 0.25, 0.5, 0.75, 1.0]

# Random
random_arr = np.random.rand(3, 3)  # matriz 3x3 aleatoria
\`\`\`

## Operaciones Vectorizadas

**Con listas Python (lento):**
\`\`\`python
numbers = [1, 2, 3, 4, 5]
doubled = [x * 2 for x in numbers]
\`\`\`

**Con NumPy (rápido):**
\`\`\`python
numbers = np.array([1, 2, 3, 4, 5])
doubled = numbers * 2  # ¡Multiplica todo el array!
\`\`\`

## Shapes y Dimensiones

\`\`\`python
arr = np.array([[1, 2, 3], [4, 5, 6]])
print(arr.shape)  # (2, 3) - 2 filas, 3 columnas
print(arr.ndim)   # 2 - 2 dimensiones
print(arr.size)   # 6 - 6 elementos totales
\`\`\`
        `,
        exercises: [
          {
            id: 'ex1',
            type: 'quiz',
            question: '¿Qué ventaja principal tiene NumPy sobre las listas de Python?',
            options: [
              'Es más fácil de usar',
              'Operaciones vectorizadas mucho más rápidas',
              'Ocupa más memoria',
              'Solo funciona con enteros'
            ],
            correctAnswer: 1,
            explanation: 'NumPy es hasta 100x más rápido que listas Python para operaciones matemáticas gracias a las operaciones vectorizadas implementadas en C. Esto es crítico para AI/ML donde procesas millones de datos.'
          },
          {
            id: 'ex2',
            type: 'predict-output',
            question: '¿Qué imprimirá este código?',
            code: `import numpy as np
arr = np.array([10, 20, 30, 40])
result = arr * 2 + 5
print(result[2])`,
            options: [
              '35',
              '65',
              '60',
              '30'
            ],
            correctAnswer: 1,
            explanation: 'Las operaciones son vectorizadas: arr * 2 = [20, 40, 60, 80], luego + 5 = [25, 45, 65, 85]. El índice 2 es 65.'
          },
          {
            id: 'ex3',
            type: 'code-challenge',
            question: 'Crea un array de NumPy con los números del 0 al 9 y luego crea otro array con solo los números pares multiplicados por 3',
            hints: [
              'Usa np.arange() para crear el rango',
              'Filtra con arr[arr % 2 == 0]',
              'Multiplica el array filtrado por 3'
            ],
            solution: `import numpy as np
arr = np.arange(10)
evens = arr[arr % 2 == 0]
result = evens * 3
print(result)  # [0, 6, 12, 18, 24]`,
            testCases: [
              { description: 'Array contiene [0, 6, 12, 18, 24]' }
            ],
            explanation: 'NumPy permite filtrar arrays con condiciones booleanas: `arr[arr % 2 == 0]` crea una máscara booleana y devuelve solo los elementos donde es True. Esto es MUY común en ML.'
          }
        ]
      },
      {
        id: 'broadcasting',
        title: 'Broadcasting: El Concepto Clave',
        content: `
# Broadcasting en NumPy

Broadcasting es uno de los conceptos más importantes en NumPy y ML.

## ¿Qué es Broadcasting?

Broadcasting permite operar arrays de diferentes shapes sin copiar datos explícitamente.

## Ejemplos

**Array + Escalar:**
\`\`\`python
arr = np.array([1, 2, 3])
result = arr + 10  # [11, 12, 13]
# El escalar 10 se "broadcast" a [10, 10, 10]
\`\`\`

**Array 2D + Array 1D:**
\`\`\`python
matrix = np.array([[1, 2, 3],
                   [4, 5, 6]])
vector = np.array([10, 20, 30])

result = matrix + vector
# [[11, 22, 33],
#  [14, 25, 36]]

# vector se broadcast a cada fila de matrix
\`\`\`

**Uso en ML:**
\`\`\`python
# Normalizar features (muy común en ML)
data = np.array([[1, 2], [3, 4], [5, 6]])
mean = data.mean(axis=0)  # [3, 4]
std = data.std(axis=0)    # [1.63, 1.63]

normalized = (data - mean) / std
# Broadcasting automático!
\`\`\`

## Reglas de Broadcasting

1. Si arrays tienen diferente número de dimensiones, el de menor dimensión se expande
2. Los tamaños deben ser iguales o uno debe ser 1
3. Si no son compatibles, se lanza error

**Compatibles:**
- (3, 4) y (4,) → (3, 4)
- (3, 1) y (1, 4) → (3, 4)
- (3, 4, 5) y (5,) → (3, 4, 5)

**No compatibles:**
- (3, 4) y (3,) → Error
        `,
        exercises: [
          {
            id: 'ex1',
            type: 'predict-output',
            question: '¿Cuál será el resultado de esta operación?',
            code: `import numpy as np
a = np.array([[1], [2], [3]])
b = np.array([10, 20, 30])
result = a + b
print(result.shape)`,
            options: [
              '(3,)',
              '(3, 1)',
              '(3, 3)',
              'Error'
            ],
            correctAnswer: 2,
            explanation: 'Broadcasting expande a (3,1) y (1,3) → (3,3). a se repite en columnas, b en filas: [[11,21,31], [12,22,32], [13,23,33]]'
          },
          {
            id: 'ex2',
            type: 'quiz',
            question: '¿Por qué es importante Broadcasting en Machine Learning?',
            options: [
              'Hace el código más lento',
              'Permite operaciones eficientes sin copiar datos',
              'Solo funciona con NumPy',
              'No es importante'
            ],
            correctAnswer: 1,
            explanation: 'Broadcasting permite operaciones eficientes sin copiar datos en memoria. Esto es crítico en ML donde trabajas con datasets enormes. Operaciones como normalización, aplicar bias en redes neuronales, etc., usan broadcasting.'
          }
        ]
      }
    ]
  },
  {
    id: 'pytorch-intro',
    title: 'Deep Learning con PyTorch',
    description: 'Introducción a redes neuronales con PyTorch',
    category: 'ai',
    icon: '🔥',
    lessons: [
      {
        id: 'tensors',
        title: 'Tensores: NumPy con Superpoderes',
        content: `
# PyTorch Tensors

Los tensores de PyTorch son como arrays de NumPy, pero con capacidades de GPU y autograd (diferenciación automática).

## Crear Tensores

\`\`\`python
import torch

# Desde lista
t = torch.tensor([1, 2, 3, 4, 5])

# Zeros, ones, random (similar a NumPy)
zeros = torch.zeros(3, 4)
ones = torch.ones(2, 3)
random = torch.rand(3, 3)

# Desde NumPy array
import numpy as np
np_arr = np.array([1, 2, 3])
t = torch.from_numpy(np_arr)
\`\`\`

## Operaciones

\`\`\`python
a = torch.tensor([1.0, 2.0, 3.0])
b = torch.tensor([4.0, 5.0, 6.0])

# Operaciones elemento a elemento
c = a + b     # [5, 7, 9]
d = a * b     # [4, 10, 18]

# Producto punto
dot = torch.dot(a, b)  # 32.0

# Multiplicación de matrices
m1 = torch.rand(2, 3)
m2 = torch.rand(3, 4)
result = torch.mm(m1, m2)  # (2, 4)
\`\`\`

## GPU Support

\`\`\`python
# Mover a GPU (si está disponible)
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
t = torch.tensor([1, 2, 3]).to(device)

# ¡Las operaciones ahora usan GPU!
result = t * 2
\`\`\`

## Autograd: El Corazón de Deep Learning

\`\`\`python
# requires_grad=True habilita cálculo de gradientes
x = torch.tensor([2.0], requires_grad=True)
y = x ** 2 + 2 * x + 1

# Calcular gradiente automáticamente
y.backward()
print(x.grad)  # dy/dx = 2x + 2 = 6.0

# Esto es lo que hace posible entrenar redes neuronales!
\`\`\`
        `,
        exercises: [
          {
            id: 'ex1',
            type: 'quiz',
            question: '¿Qué ventaja clave tiene PyTorch sobre NumPy?',
            options: [
              'Es más rápido en CPU',
              'Soporte para GPU y diferenciación automática',
              'Es más fácil de usar',
              'Ocupa menos memoria'
            ],
            correctAnswer: 1,
            explanation: 'PyTorch agrega soporte para GPU (aceleración masiva) y autograd (diferenciación automática), esencial para entrenar redes neuronales con backpropagation.'
          },
          {
            id: 'ex2',
            type: 'predict-output',
            question: '¿Qué imprimirá este código?',
            code: `import torch
x = torch.tensor([3.0], requires_grad=True)
y = x ** 3
y.backward()
print(x.grad.item())`,
            options: [
              '3.0',
              '9.0',
              '27.0',
              '6.0'
            ],
            correctAnswer: 2,
            explanation: 'El gradiente de x³ es 3x². Con x=3, el gradiente es 3 * 3² = 27. Esto es backpropagation automático!'
          }
        ]
      }
    ]
  }
];
