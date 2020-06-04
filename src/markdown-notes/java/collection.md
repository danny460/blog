---
title: Java Collection Framework
path: /java/collection-framework
---

## Strucutre

## List
### ArrayList

## Map
### `HashMap`
This is a binned (bucketed) hash table (array of linkedlists). However, when bins get too large, they are transformed into bins of TreeNodes (R-B Tree).

#### Bucket 
hash table uses a hash function to compute an index, also called a *hash code*, into an array of *buckets*. Ideally the hash function will assign each key to a unique bucket, but practically most hash function have *hash collisions*.

#### Implementation
After JDK 1.8, the internall data structure is an array of linkedlist node, when the number of collision in the bucket exceeds a limit, the linkedlist is replaced with a red-black tree.

hash function
```java
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```
This spread the impact of higher bits downwards.

**The length of internal array is power of 2**, because it is used as a mask to get the bucket. 

```java
(n - 1) & hash // n is the table length
// n - 1 & hash will give the mask to generate value from 0 to n - 1
// this is like hash % n
```

when table size grow (based on a threshold decided by the capacity and load factor), rehashing of existing element is needed. 

##### `hashCode` and `equals`


##### Why is it not thread safe
Usually happens during resize. The state can be inconsistent.

### ConcurrentHashMap


