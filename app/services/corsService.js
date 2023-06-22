module.exports = {
  corsOptions: {
    origin: '*', // Autoriser toutes les origines (vous pouvez spécifier des origines spécifiques si nécessaire)
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Autoriser les méthodes HTTP spécifiées
    allowedHeaders: ['Content-Type', 'Authorization'], // Autoriser les en-têtes spécifiés
  },
};
