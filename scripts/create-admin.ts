// Crea (o actualiza la contraseña/rol de) un usuario del panel de administración.
// Uso: node --experimental-strip-types --env-file=.env.local scripts/create-admin.ts
//
// Requiere en .env.local (bórralas después de correr el script):
//   ADMIN_BOOTSTRAP_USER=tu_usuario
//   ADMIN_BOOTSTRAP_PASSWORD=tu_contraseña
//   ADMIN_BOOTSTRAP_ROLE=admin   (o "ventas")

import { db } from '../lib/db.ts';
import { hashPassword } from '../lib/passwords.ts';

async function main() {
  const username = process.env.ADMIN_BOOTSTRAP_USER;
  const password = process.env.ADMIN_BOOTSTRAP_PASSWORD;
  const role = process.env.ADMIN_BOOTSTRAP_ROLE;

  if (!username || !password || !role) {
    console.error('Faltan ADMIN_BOOTSTRAP_USER, ADMIN_BOOTSTRAP_PASSWORD y/o ADMIN_BOOTSTRAP_ROLE en .env.local');
    process.exit(1);
  }

  if (role !== 'admin' && role !== 'ventas') {
    console.error('ADMIN_BOOTSTRAP_ROLE debe ser "admin" o "ventas"');
    process.exit(1);
  }

  if (password.length < 8) {
    console.error('La contraseña debe tener al menos 8 caracteres.');
    process.exit(1);
  }

  const passwordHash = await hashPassword(password);

  await db
    .insertInto('admins')
    .values({ username, password_hash: passwordHash, role })
    .onDuplicateKeyUpdate({ password_hash: passwordHash, role })
    .execute();

  console.log(`Listo. Usuario "${username}" (rol: ${role}) creado/actualizado.`);
  await db.destroy();
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
