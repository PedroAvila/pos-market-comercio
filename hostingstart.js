module.exports = {
    apps: [
      {
        name: 'pos', // Cambia el nombre según tu aplicación
        script: 'dist/main.js', // Ruta al archivo de entrada de tu aplicación NestJS
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
          NODE_ENV: 'production', // Puedes configurar tu entorno aquí
          PORT: 3000, // Cambia el puerto si es necesario
        },
      },
    ],
  };
  