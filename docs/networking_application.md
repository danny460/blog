---
id: networking_application
title: Application Layer
sidebar_label: Application Layer
---

## HTTP

### URI
HTTP relies on the Uniform Resource Identifier (URI) standard for requesting target resource. A URI can be classified as a locator(URL), a name(URN), or both. 

In addition to identify the resource, URL also specify the location of the resource by specifying the access mechanism (e.g. network location)

Example
- URL: *http://www.ietf.org/rfc/rfc2396.txt*
- URN: *urn:oasis:names:specification:docbook:dtd:xml:4.1.2*

![URI, URL and URN](/img/docs/uri-url-urn.png)

See:
- [RFC-3986 URI](https://tools.ietf.org/html/rfc3986)

### Messaging
#### Client request
![Sample Request](/img/docs/http-request.png)
Status line format
```
request-method resource-URI http-versions
```

header format
```
header-name: val1, val2, ...
```
#### Server response
![Sample Response](/img/docs/http-response.png)


### HTTP Method
|         |     |
| ------- | --- |
| GET     |     |
| POST    |     |
| PUT     |     |
| PATCH   |     |
| HEAD    |     |
| OPTIONS |     |

### HTTP response status codes

#### 3XX Redirection Messages
This class of status code indicates that further action needs to be taken by the **user agent** in order to fufill the request. The action required MAY be carried out by the user agent without interaction with the user if and only if the method used **in the second request** is GET or HEAD. 

<nav class="no-bullet">

`301 Moved Permanently`
- Indicates that the URI of the requested resource has been changed permanently. Any future references to this resource should use the new permanent URI. The new permanent URI should be given in the Location field in response.

`302 Found`
- Indicates that the URI of the requested resource has been changed *temporarily*. 

`307 Temporary Redirect`
- Same semantics as `302 Found`, except that the user agent must not change the HTTP method used in the following requests.

`308 Permanent Redirect`
- Same semantics as `301 Moved`, except that the user agent must not change the HTTP method used in the following requests.
</nav>

## HTTPS

### X.509
In cryptography, X.509 is the standard defining the format of **public key certificate**. X.509 is used in TLS/SSL, which is the basis for HTTPS. They can also be used for offline applications such as electronic signatures.

#### Certificate path validation algorithm
X.509 defines a certificate path validation alogrithm, which allows a certificate to be signed by intermediate CA certificates, which are, in turn, signed by other certificate, eventually reaching a **trust anchor**. 

The alogrithm can verify a given certificate path from the subject certificate leading up to a trusted root certificate.

## HTTP/2
- byte framing
  - stream
  - message
  - frame
- multiplexed request/response
  - one connection
- server push
  - PUSH_PROMISE
- header compression
- flow control
  - SETTING


## REST
REST stands for Representational State Transfer. It is an architectural style which defines a set of constraints for web services. Alternatives are RPC and SOAP.

Services conforming to REST style are said to be RESTful web services.

### Architectural principles
The set of REST architectural principles is defined as:

<nav class="no-bullet">

**Client-Server architecture**
- hello

**Communicate Statelessly**
- stateless applications are easier to scale.

**Cacheablity**
- hello

**Layered system**
- hello

**Code on demand**
- hello

**Uniform interface**
- hello
</nav>
