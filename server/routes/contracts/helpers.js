import crypto from 'crypto';

export function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

export function generateContractNumber() {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `WC-${year}-${random}`;
}

export function normalizeContract(contract) {
  if (!contract) return null;
  const obj = contract.toObject ? contract.toObject() : contract;
  if (obj._id && !obj.id) {
    obj.id = obj._id.toString();
  }
  return obj;
}
