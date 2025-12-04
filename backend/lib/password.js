const crypto = require('crypto');

const DEFAULT_ITERATIONS = 100000;
const KEYLEN = 32;
const DIGEST = 'sha256';

function hashPassword(password, iterations = DEFAULT_ITERATIONS) {
  const salt = crypto.randomBytes(16).toString('base64');
  const derived = crypto.pbkdf2Sync(password, salt, iterations, KEYLEN, DIGEST).toString('base64');
  return `pbkdf2$${iterations}$${salt}$${derived}`;
}

function verifyPassword(password, stored) {
  try {
    const parts = stored.split('$');
    if (parts.length !== 4 || parts[0] !== 'pbkdf2') return false;
    const iterations = parseInt(parts[1], 10);
    const salt = parts[2];
    const derived = parts[3];
    const derivedCheck = crypto.pbkdf2Sync(password, salt, iterations, KEYLEN, DIGEST).toString('base64');
    const a = Buffer.from(derived, 'base64');
    const b = Buffer.from(derivedCheck, 'base64');
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch (err) {
    return false;
  }
}

module.exports = { hashPassword, verifyPassword };
