# Memory Model & Management

## Runtime data areas
- Method area (PermaGen)
- Heap
  - Young Generation
    - Eden space
    - Survivor space S0, S1
  - Tenured space
- Per thread data
  - Program counter
  - JVM stack
  - Native method stack

### Stack
Each thread has it's own stack, and can't access stack of another thread.
### Heap
Where the actual objects. Segregated into multiple areas.

## Reference Types
### Strong Reference
The common reference types. Strongly referenced objects are not eligible for GC.

### Soft Reference
A softly referenced object won't be GC'd unless JVM absolutely needs memory.



They are good foundation for cache.

```java
SoftReference<StringBuilder> ref = new SoftReference<>(new StringBuilder());
```

### Weak Reference
Similar to soft reference in a sense that it can be GC'd. However, the main difference is that weak references are GC'd eagerly.

it can be used for caching (although strict eviction), see for example `WeakHashMap<K, V>`.
```java
WeakReference<StringBuilder> weakRef = new WeakReference<>(new StringBuilder());

// then later you can get the actual object, you may get
// null since weak reference isn't strong enough to prevent
// garbage collection.
weakRef.get();
```

### Phantom Reference
The phantom reference is added to the reference queue after the finalize method of its referent is executed.

## Garbage Collection
important idea first:
- The process is triggered automaitcally by Java. It's upto the JVM when and whether or not to do it.
- It's an expensive process. When it runs, all threads in the application are paused.
- calling `System.gc()` does not gurantee a GC, again, it's up to JVM.


GC is implemented in a "Mark and Sweep" way. Java analyzes the references from the stack and "mark" the objects to keep, then "sweep" the unused.

Young Generation
- Eden Space
- Survivor Space - S0 and S1
Tenured Space (Old Generation)
Metaspace (PermGen before Java8)
Code Cache

### Garbage collection types
#### Minor GC
collecting garbage in young generation. 
- always triggered when JVM is unable to allocate space for new Object. 
- minor GCs also trigger stop-the-world pauses.
#### Major GC
cleaning tenured space
#### Full GC
entire heap

### Types of Garbage Collectors

1.**Serial GC** - 

2.**Parallel GC** - 

3.**Mostyl concurent GC** - 

3.1.**Garbage First** - 
high throughput with a reasonable application pause time

3.1.**Concurrent Mark Sweep** - Deperacated as of JDK 9

## Technics for Debugging Memory
- Use VisualVM to make a heap dump, so you can analyze, per class, how much memory it occupies.

- If Java application crashese with `OutOfMemoryError`, run the process with `-XX:HeapDumpOnOutOfMemory` which create a heap dump file when the error happens next time.

- Use `-verbose:gc` option to get the garbage collection output for each GC.
