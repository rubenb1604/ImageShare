//Diese encryption libary wurde von Github/andreeaw123 übernommen thx :)
import crypto from 'crypto';


const algorithm = 'aes-256-cbc';
const secretKey = '12345678901234567890123456789012';
const ivLength = 16;


export function encryptId(id: string | number): string {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(id.toString(), 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}


export function decryptId(encryptedId: string): string {
  const [ivString, encryptedData] = encryptedId.split(':');
  if (!ivString || !encryptedData) {
    throw new Error('Ungültiges verschlüsseltes ID-Format.');
  }

  const iv = Buffer.from(ivString, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}
