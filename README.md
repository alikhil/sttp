## STTP -  new generation Secure TBM Transfer Protocol.
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e83c4ca8c0eb4c3cb95673cb2315af2d)](https://www.codacy.com/app/TBM-Team/sttp?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=alikhil/sttp&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/e83c4ca8c0eb4c3cb95673cb2315af2d)](https://www.codacy.com/app/TBM-Team/sttp?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=alikhil/sttp&amp;utm_campaign=Badge_Coverage)

STTP works over HTTP and it very similar to TLS. It is a kind of poor copy of HTTPS. 
![sttp-tls-schema](https://cloud.githubusercontent.com/assets/7482065/19474021/89733538-9536-11e6-9398-cb90c5fbeae3.png)

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
