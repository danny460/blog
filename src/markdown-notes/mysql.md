---
title: MySQL
path: /mysql
---

# MySQL
## Arch

## Transactions
A transaction is an atomic set of SQL queries, a single unit of work. Either all of them are executed or none.

```SQL
START TRANSACTION;
SELECT balance FROM checking WHERE customer_id = 123;
UPDATE checking SET balance = balance - 200.00 WHERE customer_id = 123;
UPDATE savings SET balance = balance + 200.00 WHERE customer_id = 123;
COMMIT;
```

### ACID
the criteria that a well-behaved transaction processing system must meet:
- Atomicity
- Consistency
- Isolation
- Durability

### Isolation level
Isolation level is related to transactions and concurrency. It defines how to sperate each transaction from other concurrently running transactions. 

The SQL standard defines four isolation levels, with specific rules for which changes are and aren't visible inside and outside a transaction:
| Level                           | Description                                                                                                                                                                                                                                                                                                                                    | Lock    |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `READ UNCOMMITED`               | The lowest level. Basically no isolation. Transactions can view the results of uncommited transactions (aka. *dirty read*). This level is rarely used in practice.                                                                                                                                                                             | no lock |
| `READ COMMITTED`                | Transaction will see only chances made by transactions that were already commited, and its changes won't be visible to others until it has commited. However, this level allows *nonrepeatable read*, which means you can run the same `SELECT` statement twice and see different results, because they each use a different snapshot of data. |         |
| `REPEATABLE READ` (**default**) | Gurantees same results from multiple read in a transaction. Still allows *phantom read*, which can happen when we read a range of rows but another transaction inserted a new row in the range. The inserted row will be read by current transaction, so called phantom. (InnonDB has **MVCC** to solve this problem).                         | lock write |
| `SERIALIZABLE`                  | The highest level. Gurantees no phantom read by locking every row it reads, forcing transactions to be ordered.                                                                                                                                                                                                                                | S lock for read, X lock for write        |

Note that higher isolation level operates with more overheads, so generally the performance and concurrency is worse. It's always a trade-off. 

#### Difference between non-repeatable read & phantom read:
- In `READ COMMITED`, read doesn't place lock. Update and delete of selected role can still happen, consequently you would read different results in subsequent reads. 
- In `REPEATABLE READ`, read locks rows from updating/deletion, but it does not prevent insertion. Insertion can still happen which would results in phantom read in subsequent reads.

#### MVCC (multi-version concurrency control)
Store 2 hidden value with each row, one for

## Locking

### Optimistic lock
乐观锁（Optimistic Lock），顾名思义，就是很乐观，每次去拿数据的时候都认为别人不会修改，所以不会上锁，但是在提交更新的时候会判断一下在此期间别人有没有去更新这个数据。乐观锁适用于读多写少的应用场景，这样可以提高吞吐量。

乐观锁一般来说有以下2种方式：
1. 使用数据版本（Version）记录机制实现，这是乐观锁最常用的一种实现方式
2. 使用时间戳（timestamp）

Java中的atomic包就是乐观锁的一种实现，AtomicInteger 通过CAS（Compare And Set）操作实现线程安全的自增。

### Pessimistic lock
顾名思义，就是很悲观，每次去拿数据的时候都认为别人会修改，所以每次在拿数据的时候都会上锁，这样别人想拿这个数据就会block直到它拿到锁。

Java的 `synchronized` 就属于悲观锁的一种实现，每次线程要修改数据时都先获得锁，保证同一时刻只有一个线程能操作数据，其他线程则会被block。

### MySQL隐式和显示锁定
MySQL InnoDB采用的是两阶段锁定协议（two-phase locking protocol）。在事务执行过程中，随时都可以执行锁定，锁只有在执行 `COMMIT`或者`ROLLBACK`的时候才会释放，并且所有的锁是在同一时刻被释放。前面描述的锁定都是隐式锁定，InnoDB会根据事务隔离级别在需要的时候自动加锁。

另外，InnoDB也支持通过特定的语句进行显示锁定，这些语句不属于SQL规范：

SELECT ... LOCK IN SHARE MODE

SELECT ... FOR UPDATE


## Storage Engines

### InnoDB
### MyISAM

### Main difference: InnoDB & MyISAM
- InnoDB has row-level locking, MyISAM only have full table lock.
- InnoDB has support for transactions.
- InnoDB has foreign key and constraints.

## Indexing
Indexes are data structures the storage engines use to lookup rows quickly. 

```SQL
CREATE INDEX myindex ON order_table(product_id, create_date);
```
or with unique constraint
```SQL
CREATE UNIQUE INDEX myindex ON order_table(product_id, create_date);
```

### BTREE Index
BTREE here is refering a class of index MySQL uses. However, the actual data structure used differs among storage engines. For example, NDB uses T-Tree and InnoDB uses B+Tree.

#### Data Structure: B-Tree
B-Tree is a self-balancing m-ary tree (m > 2). B-tree maintains sorted data and allow searches, insert, delete in `O(logN)` time. B-Tree is commonly used in file systems and databases.

> **Note: Why not use a balanced binary tree?** - Each node in a B-Tree can represent much more data, which reduce the height of the tree. Because database need to read data from disk storage in to memory, a reduced height means less disk I/O and better performance.

#### Data Structure: B+Tree
B+Tree is a variation of B-Tree:
- number of key is the same as number of children
  - This is unlike B-Tree, where a node with `n` keys has `n + 1` children. In B+Tree, the key represent the maximum value a child can have.
- non-leaf node are only used for indexing and not data reading.
- leaf nodes have all the data, and each leaf node has a pointer to the adjacent node (as a linked list).

The advantage of using B+Tree:
- In practice, because B+Tree's non-leaf node hold less data, a storage page can store more entries per node. This reduces the height of the tree by more, and leads to less disk I/O.
- The leaf nodes is a sorted linked list, makes it more efficient to search range of data.

### Hash Index
Implemented using hash table.
Memory storage engine

### Cluster Index
Cluster index is not a index, but it is rather about how the index is stored. InnoDB stores the index and the rows together in the same structure (in leaf pages). InnoDB clusters the data by the primary key. 

## Optimizing index


## MySQL vs MongoDB?
- Fixed schema vs dynamic schema.
- Mongodb is document-oriented. stores data in json format (BSON)
- MySQL is vertically scalable, while mongodb is horizontally scalable.
  - MySQL master-slave structure scales read, but write is still limitation. MongoDB sharding distribute both read and write.
- MySQL has table-based relational structure.

## MySQL scaling

## RDBS Database normalization
not normalized database have data redundancy.

### 1NF
column value should be single (not like an array of values)
values stored in column should be of the same domain
column have unique names
order does not matter
### 2NF
must be in 1NF
no partial dependency. (all column value is dependent on primary key)
### 3NF
must be in 2NF
no transitive dependency.
### BCNF
must be in 3NF
each functional dependency (x -> y), x should be a super key
### 4NF
must be in BCNF
no multi-valued-dependency
