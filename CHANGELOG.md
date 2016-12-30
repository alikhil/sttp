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