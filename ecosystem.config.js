module.exports = {
  apps: [{
    name: 'nextjs-web',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    cwd: '/root/airisto/airisto-frontend',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_file:'.env',
    log_file: '/home/airisto/logs/nextjs-web.log',
    out_file: '/home/airisto/logs/nextjs-web-out.log',
    error_file: '/home/airisto/logs/nextjs-web-error.log'
  }]
};