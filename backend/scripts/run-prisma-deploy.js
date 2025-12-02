const { spawnSync } = require('child_process');

// Only run prisma migrate deploy when RUN_PRISMA_MIGRATE=1
if (process.env.RUN_PRISMA_MIGRATE !== '1') {
  console.log('Skipping prisma migrate deploy (set RUN_PRISMA_MIGRATE=1 to enable)');
  process.exit(0);
}

console.log('Running prisma migrate deploy...');
const r = spawnSync('npx', ['prisma', 'migrate', 'deploy'], { stdio: 'inherit' });
process.exit(r.status);
