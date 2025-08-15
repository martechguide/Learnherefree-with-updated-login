module.exports = {
  apps: [
    {
      name: "learnherefree",
      script: "dist/index.js",
      cwd: "/var/www/learnherefree",
      instances: 1,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 5000
      },
      error_file: "/var/log/pm2/learnherefree-error.log",
      out_file: "/var/log/pm2/learnherefree-out.log",
      log_file: "/var/log/pm2/learnherefree.log",
      max_memory_restart: "1G",
      restart_delay: 4000,
      autorestart: true,
      watch: false
    }
  ]
};