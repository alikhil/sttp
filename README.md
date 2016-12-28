## STTP -  new generation Secure TBM Transfer Protocol.
[![npm version](https://badge.fury.io/js/sttp.svg)](https://badge.fury.io/js/sttp)
[![Build Status](https://travis-ci.org/alikhil/sttp.svg?branch=master)](https://travis-ci.org/alikhil/sttp)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e83c4ca8c0eb4c3cb95673cb2315af2d)](https://www.codacy.com/app/TBM-Team/sttp?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=alikhil/sttp&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/e83c4ca8c0eb4c3cb95673cb2315af2d)](https://www.codacy.com/app/TBM-Team/sttp?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=alikhil/sttp&amp;utm_campaign=Badge_Coverage)
[![Code Climate](https://codeclimate.com/github/alikhil/sttp/badges/gpa.svg)](https://codeclimate.com/github/alikhil/sttp)


STTP works over HTTP and it very similar to TLS. It is a kind of poor copy of HTTPS. 
![sttp-tls-schema](https://habrastorage.org/files/e52/387/364/e5238736493f41489f5df57f94310962.png)
[Picture taken from](https://habrahabr.ru/post/258285/)
### Tutorial

`npm install sttp`

#### AuthDataPacker
`AuthDataPacker` uses on initializing handshake to share AES-key.
Usage:
```js
var sttp = require("sttp");

// server:
// create and share somehow rsa.publicKey with client
var rsaCreator = require("./node_modules/sttp/src/rsa.js");
var rsaKeys = rsaCreator.generateRSAKeys();

// client:
// get rsa public key from server and 
// send encrypted with rsa.publicKey generated aesKey
var aesCreator = require("./node_modules/sttp/src/aes.js")
var aesKey = aesCreator.generateKey();

var AuthDataPacker = sttp.AuthDataPacker;

var packer = new AuthDataPacker(rsaKeys.publicKey);
var authData = packer.pack(aesKey);
// transfer authData using some channel to server

// server:
// get authData from client, decrypt it and save somewhere
var packer = new AuthDataPacker(rsa.privateKey, true); // true - needs to congigure packer for unpacking
var data = packer.unpack(authData);
// save aesKey to correspoing user in database
// and start using DataPacker
```
#### DataPacker
`DataPacker` uses for transfering main information it uses AES-128 for encryption(aesKey is transfering `AuthDataPacker`).
Usage:
```js
var DataPacker = sttp.DataPacker();
var data = { projectName : "sttp", contributors : ["Alik", "Kevin", "Sergey"] };

var packer = new DataPacker(aesKey);
var packedData = packer.pack(data);

// transfer packedData using some channel
// and on other end do the following:
// P.S. use the same aesKey

var packer = new DataPacker(aesKey);
var data = packer.unpack(packedData);

// use data...
```

#### Example

Also you can look at [example](https://github.com/Jeaced/node-server) of using `sttp` in nodejs web application. 


### Contribution
Read [git conventions](https://github.com/alikhil/sttp/wiki/Git-conventions) before.

Make sure that you are using nodejs v6.9.1.
```sh
git clone https://github.com/alikhil/sttp
npm install
```

Run tests:
```sh
sh run_tests.sh
```

