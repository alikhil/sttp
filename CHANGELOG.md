## [2.1.0] - 2016-12-30
### Adds
    - Browser version of sttp in bundle.sttp.js

## [2.0.1] - 2016-12-30
### Fixes
    - Typo in index.js that makes impossible to use AuthKeyPacker

## [2.0.0] - 2016-12-30
**Incomatible with older versions**
### Changed
    - Moves AES implementation to outer package zaes-js
    - Replaces inner compresser with lz-string.js
    - Replaces inner rsa implementation with node-rsa
    - Removes unused code(hash, utils)
    - Changes module start script
### Adds 
    - keys module for generating AES and RSA keys
### Removed
    - Own RSA, AES and compression implementations