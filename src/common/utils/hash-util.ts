// eslint-disable-next-line @typescript-eslint/no-var-requires
const CryptoJS = require('crypto-js');
const PASSPHRASE = 'Frg29J3FnXB&ERYnj3NGwFyB#^n#ymX';

export const encryptWithAES = (text) => {
  return CryptoJS.AES.encrypt(text, PASSPHRASE).toString();
};

export const decryptWithAES = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, PASSPHRASE);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
