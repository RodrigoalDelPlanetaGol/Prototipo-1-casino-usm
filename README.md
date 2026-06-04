# Prototipo-1-casino-usm
Este git lo hice para empezar el prototipo react.
Para empezar a trabajar con esto, primero que todo abren el repositorio con GitHub Desktop y abren el repositorio en VSCode, y una vez que abran una terminal 'powershell', hacen 'cd mi-proyecto', Copian y pegan este comando en la misma terminal:

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

Si no hacen eso, les va a salir lo siguiente:

"npm : No se puede cargar el archivo C:\Program Files\nodejs\npm.ps1 porque la ejecución de 
scripts está deshabilitada en este sistema. Para obtener más información, consulta el tema 
about_Execution_Policies en https:/go.microsoft.com/fwlink/?LinkID=135170.
En línea: 1 Carácter: 1
npm run dev
'~~~'
CategoryInfo          : SecurityError: (:) [], PSSecurityException
FullyQualifiedErrorId : UnauthorizedAccess"

Después de poner el primer comando, pongan:

npm install

Dejan que se instale y luego ponen:

npm run dev

Y con eso ya tienen el npm listo y también corren el React.

# Cosas nuevas

## (27/05)
tienen que hacer cd mi-proyecto y poner esto pa que la página les cargue: 
npm install lucide-react
creo que todos tienen que hacerlo.
recuerden poner el Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass antes de instalar

# Para que sirve cada archivo/cosa que hay en el repositorio

### `README.md`
Archivo que ahora están leyendo. PONGAN TODO LO QUE HAGAN PLSSS

### `node_modules/`
Carpeta donde se instalan todas las dependencias del proyecto.  
Se genera automáticamente con `npm install` y normalmente **no se hace nada con esto**.

### `public/`
Contiene archivos estáticos que se sirven tal cual, sin pasar por el proceso de compilación de React/Vite.

- `favicon.svg`: ícono que aparece en la pestaña del navegador.
- `icons.svg`: recurso gráfico estático incluido en el proyecto.

### `src/`
Es el corazón de la aplicación. Aquí vive la mayor parte del código React.

- `assets/`: carpeta para imágenes, íconos y otros recursos internos usados por la app.
- `App.tsx`: componente principal de la aplicación. Suele contener la estructura base de la interfaz. Creo que aqui se edita LA pagina que tenemos
- `App.css`: estilos específicos del componente `App`.
- `index.css`: estilos globales de la aplicación.
- `main.tsx`: punto de entrada de React. Aquí se monta la app en el DOM y se renderiza `App`.

### Archivos de configuración del proyecto (lo que está fuera de 'srs/'

- `.gitignore`: indica qué archivos o carpetas no deben subirse al repositorio.
- `eslint.config.js`: configuración de ESLint, herramienta que ayuda a detectar errores y mantener buen estilo de código.
- `index.html`: archivo HTML principal donde Vite inyecta la aplicación React.
- `package.json`: contiene la información del proyecto, scripts y dependencias.
- `package-lock.json`: guarda versiones exactas de las dependencias instaladas para mantener consistencia entre entornos.
- `tsconfig.json`: configuración principal de TypeScript.
- `tsconfig.app.json`: configuración de TypeScript específica para la aplicación.
- `tsconfig.node.json`: configuración de TypeScript para archivos que se ejecutan en Node.js.
- `vite.config.ts`: configuración de Vite, el bundler y servidor de desarrollo del proyecto.
