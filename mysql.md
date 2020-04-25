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
- In practice, because B+Tree's non-leaf node hold less data, a storage page can store more nodes. This reduces the height of the tree by more, and leads to less disk I/O.
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

