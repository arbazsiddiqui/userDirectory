const crypto = require("crypto");
const config = require('../config/defaults');

const iv = crypto.randomBytes(16);

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(config.cryptoAlgo, config.cryptoKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`
};

const decrypt = function(hash) {
  const textParts = hash.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(config.cryptoAlgo, config.cryptoKey, iv);
  const decrpyted = Buffer.concat([decipher.update(Buffer.from(encryptedText, 'hex')), decipher.final()]);
  return decrpyted.toString();
};

module.exports = {
  encrypt,
  decrypt
};
