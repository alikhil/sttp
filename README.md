## STTP -  new generation Secure TBM Transfer Protocol.
[![npm version](https://badge.fury.io/js/sttp.svg)](https://badge.fury.io/js/sttp)
[![Build Status](https://travis-ci.org/alikhil/sttp.svg?branch=master)](https://travis-ci.org/alikhil/sttp)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e83c4ca8c0eb4c3cb95673cb2315af2d)](https://www.codacy.com/app/TBM-Team/sttp?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=alikhil/sttp&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/e83c4ca8c0eb4c3cb95673cb2315af2d)](https://www.codacy.com/app/TBM-Team/sttp?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=alikhil/sttp&amp;utm_campaign=Badge_Coverage)
[![Code Climate](https://codeclimate.com/github/alikhil/sttp/badges/gpa.svg)](https://codeclimate.com/github/alikhil/sttp)


STTP works over HTTP and it very similar to TLS. It is a kind of poor copy of HTTPS. 
![sttp-tls-schema](https://habrastorage.org/files/e52/387/364/e5238736493f41489f5df57f94310962.png)
[Picture taken from](https://habrahabr.ru/post/258285/)

### Installation

```sh
npm install sttp
```

### Tutorial

* To use in nodejs backend call `var sttp = require("sttp")`.

* To use in browser attach `bundle.sttp.js` script from `./node_modules/sttp/` directory. And use `sttp` global variable.
```html
<script src="path/to/bundle.sttp.js"></script>
<script type="text/javascript">
    var AuthKeyPacker = sttp.AuthKeyPacker;
    var rsaKeys = sttp.keys.generateRSAKey();
    var packer = new AuthKeyPacker(rsaKeys.public)
    // ...
</script>
```

#### AuthDataPacker
`AuthDataPacker` uses on initializing handshake to share AES-key.
Usage:
```js
var sttp = require("sttp");

// server:
// create and share somehow RSA public key with client
var keys = sttp.keys;
var rsaKeys = keys.generateRSAKey({bits: 512}); // by default 1024
// rsaKeys : { public, private }
// Share rsaKeys.public

// client:
// get RSA public key from server and 
// send encrypted with rsaKeys.public generated aesKey
var aesKey = keys.generateAESKey(16); // 128 bit key

var AuthDataPacker = sttp.AuthDataPacker;

var packer = new AuthDataPacker(rsaKeys.public);
var authData = packer.pack(aesKey);
// transfer authData using some channel to server

// server:
// get authData from client, decrypt it and save somewhere
var packer = new AuthDataPacker(rsaKeys.private);
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

Also you can look at [example](https://github.com/alikhil/sttp-example) of using `sttp` with **express.js** in nodejs web application. 


### Contribution
Read [git conventions](https://github.com/alikhil/sttp/wiki/Git-conventions) before.

Make sure that you are using nodejs 6+
```sh
git clone https://github.com/alikhil/sttp
npm install
```

Run tests:
```sh
npm test
```

