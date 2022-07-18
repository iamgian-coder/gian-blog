module.exports = {
  apps: [
    {
      name: 'front-nuxtjs',
      script: 'npm',
      args: 'start',
      watch: false,
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
