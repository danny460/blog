# HTTP

# HTTPS

## X.509
In cryptography, X.509 is the standard defining the format of **public key certificate**. X.509 is used in TLS/SSL, which is the basis for HTTPS. They can also be used for offline applications such as electronic signatures.

### Certificate path validation algorithm
X.509 defines a certificate path validation alogrithm, which allows a certificate to be signed by intermediate CA certificates, which are, in turn, signed by other certificate, eventually reaching a **trust anchor**. 

The alogrithm can verify a given certificate path from the subject certificate leading up to a trusted root certificate.