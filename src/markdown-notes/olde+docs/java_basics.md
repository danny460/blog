---
id: java_basics
title: Java Basics
sidebar_label: Basics
---

## Data Types
### Primitive types

There are 8 primitive types in java. Out of them, 4 are integer types and 2 are floating-point types.

- byte/1                    
- short/2                    
- int/4                    
- long/8                    
- float/4                    
- double/8                    
- boolean/~                     
- char/2  (UTF-16 code unit)

**Note**: The size of boolean is VM dependent.

#### Unicode encoding and `char` data type
Java adopts the UTF-16 Unicode encoding sheme. UTF-16 encodes characters in code points. A **code point** is a code value associated with an character in an encoding scheme. In Unicode standard, code points are written in hexadecimal with the prefix *U+*. like *U+0041* represents latin character *"A"*.

UTF-16 is a variable length encoding scheme. A code point can be represnted by either one or two code unit. A **code unit** is the building block in UTF-16. Each code uint is a 16-bit value. 
- The characters in the basic multilingual plane are represented as 1 code unit. 
- The supplementary characters in the additional planes are represented by 2 code units (32-bit), called a **surrogate pair**.

Each of the code unit in a surrogate pair falls into a range of 2048 unused value in the basic multilingual plane, called the **surrogate area** (U+D800 to U+DBFF for the first code point, U+DC00 to U+DFFF for the second code point). This makes it easy for a decoder to differentiate between a normal code unit and one in a surrogate pair, because the ranges of values are mutually exclusive. There would also be no problem either reading forward or reading backward.

In Java, the `char` type holds exact one code unit (16 bits = 2 bytes). So characters in the supplementary plane would require 2 `char`.

### String
#### Strings are immutable
