### Differene between TCP and UDP
- TCP is connection oriented, handshake
- TCP is reliable
- UDP is basically a null protocol, use as a base for other new protocol. like QUIC.
### How does HTTPS work
### Difference between HTTP and HTTPS
### Implement Hash function  
### What are Transactions in RDBS
### Isolation level in MySQL  
### Difference between threads and process
- process is one execution of a program, thread is one execution path of a process.
- process is unit a resource mangment, thread is unit of CPU scheduling.
- Each process has its own address space and can share with other process, threads share the address space of process, but they have their own stack and registers.

### How does context switching work
1. store current register states of process, usually in PCB
2. 

### Database normalization
not normalized database have data redundancy.
#### 1NF
- column value should be single (not like an array of values)
- values stored in column should be of the same domain
- column have unique names
- order does not matter
#### 2NF
- must be in 1NF
- no partial dependency. (all column value is dependent on primary key)
#### 3NF
- must be in 2NF
- no transitive dependency.
#### BCNF
- must be in 3NF
- each functional dependency (x -> y), x should be a super key
#### 4NF
- must be in BCNF
- no multi-valued-dependency


