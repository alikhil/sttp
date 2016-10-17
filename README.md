## STTP -  new generation Secure TBM Transfer Protocol.

### How to start

```
git clone https://github.com/alikhil/sttp
npm install mocha -g
npm install
```

### compress.js

`compress(str)` should return compressed data as string

`decompress(str)` should return initial string

### encrypt.js

`hash(str)` should return hash for string(md5 or other)

`encryptAES(str, key)` should return encrypted by AES string

`decrypyAES(str, key)` should return decrypted string

`generateRSAKeys()` should return public and private keys

`encryptRSA(str, publicKey)` should encrypt with public RSA key

`decryptRSA(str, privateKey)` should decrypt str using private RSA key

### testing
`mocha test --recursive --watch`
