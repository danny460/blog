---
title: Multi-threading and Concurrency in Java
path: /java/multithreading-concurrency
---

# Multithreading Concurrency

## Thread
### Thread lifecycle & state
- `NEW`: created but not yet started execution.
- `RUNNABLE`: either ready to run or currently running.
- `BLOCKED`: A thread in the blocked state is waiting for a monitor lock, entering/re-entering synchronized block.
- `WAITING`: waits for another thread on a condition. When this condition is fulfilled, the scheduler is notified and the waiting thread is moved to runnable state.
- `TIMED_WAITING`: waiting for some thread to perform some action for a specific period
- `TERMINATED`: either exists normally or due to error

### Java Threading Model

## `CAS`
Compare-and-swap (CAS) is a single atomic operation (in assembly level), to compare the value at given memory location with an expected value, if and only if the current memory value is the same as the expected value, it set the memory value to a new value. For example, in linux x86, the operation can be performed by `CMPXCHG`. If the value doesn't match, the write will fail. 

In java, the implementation of the `Atomic` types such as `AtomicInteger` relies on Compare-and-swap mechanism and `volatile` variable. It uses a loop a keep testing the update with `CAS` until it succeed. It is much like a spin-lock.

CAS is an optimistic locking mechanism. Note in multi-processor system, the atomicity that `CMPXCHG` provides is not enough, we also need to lock the memory bus.

### ABA problem
CAS need to check if the value has changed from the expected value. 

Consider a scenario where a value is updated by another thread from `A` to `B` then back to `A`. When we use CAS to test the value, we would get the conclusion that the value has not changed, which is incorrect. 

One solution to ABA problem is to use tagged reference (similar idea to multi-version version control in InnoDB). Each time the value is modified, we increment the tag value.

Java use this solution, see [`java.util.concurrent.atomic.AtomicStampedReference`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/atomic/AtomicStampedReference.html).

## `synchronized` keyword
Ensure atomicity and visibility.Every java object can implicitly act as a lock for purpose of synchronization using `synchronized` keyword. These built in locks are called *intrinsic locks* or *monitor locks*. Using `synchronized` is the only way to acquire an intrinsic locks. Intrinsic locks act as mutexes (mutual exclusion locks), which means at most one thread may own the lock.

Since JDK 6, the synchronized lock has been optimized to be less heavy.

### JDK 1.6 optimizations
- **Adaptive spinning**
  - This is an optimization to employ a 2-phase spin-then-block strategy. Threads contending locks initially attempt to spin for a few times before blocking. It uses metrics to determine whether to spin or block in the future adaptively. 
- **Llock coarsening**
  - reduces the amount of synchronization work (lock, unlock) by enlarging an existing synchronized region.
- **Biased locking**
  - Static analysis to decide if locking is required. If it is not possible to have shared access, the lock can be cancelled


### Class level lock
`synchronized` can only be used with methods or code blocks, but we can use it to implement locking at various levels. 

Below code examples shows implementation of a class level lock, which locks access across all instances. Class level lock should be used to keep static data thread safe. 
```java
public class SomeClass {

  public void doSomething() {
    synchronized(SomeClass.class) {
      // thread safe code
    }
  }

}
```
or put `synchronized` keyword on static method
```java
public class SomeClass {
    // must be a static method
    public synchronized static void doSomething(){
      // thread safe code
    }
}
```
or use a static varialbe as lock:
```java
public class SomeClass {
  public static final Object LOCK = new Object();

  public void doSomething() {
    synchronized (LOCK) {
      // thread safe code
    }
  }
}
```


### Object level lock
Object level lock is mechanism when we want to synchronize access such that only one thread can execute the code block on a given instance at anytime. This should always be done to make instance level data thread safe.

```java
public class Demo {
  // only non-static method
  public synchronized void doThing(){}
}
```
or
```java
public class Demo {
  public void doThing() {
    // only non-static code blocks
    synchronized (this) {
      // thread safe code
    }
  }

}
```
or use an instance variable as lock:
```java
public class Demo {
  private final Object lock = new Object();

  public void doThing() {
    synchronized (lock) {
      // thread safe code
    }
  }
}
```

## `volatile` keywoard
`volatile` is used to ensure visibility, when a field is declared `volatile`, the java memory model ensures that all threads see a consistent value. change from one thread is visible in another. Doesn't ensure atomicity.

Using `volatile` is lighter than `synchronized`, but of course it's usecase is more limited.

Use cases:
- when you only need to get the value or set the value, it is not suitable for getAndOperate kind of operation.

### Memory barrier
JVM add a barrier instruction when reading/writing `volatile`. Memory barrier is a CPU instruction that ensures the ordering of instruction and visibility. 


## `Atomic types`
atomic types implement atomicity with CAS and `volatile`.

## Wait and notify
`wait()`, `notify()` and `notifyAll` are isntance methods used for thread synchronization. They are defined on `java.lang.Object`, so callable for all object instances.

can only be called in a synchronized block. It releases the lock on the object so that another thread can jump in an acquire the lock.

- `wait()`: 
  - `wait` method can only be called when it owns the object's monitor (i.e. in a `synchronized` block/function). Calling `wait()` causes current thread to wait indefinitely until another thread invokes `notify` for this object or invokes `notifyAll`.
- `wait(long timeout)`:
  - we can specify a timeout after which thread will be woken up automatically. A thread can be woken up before reaching the timeout using notify() or notifyAll().
- `wait(long timeout, int nanos)`:
  - same with higher precision.
- `notify()`:
  - used for waking up **one thread** that is waiting for the access to this object's monitor. The choice of exactly which thread to wake is non-deterministic.
- `notifyAll`:
  - used for waking up **all threads** that are waiting for the access to this object's monitor.

Normally we do additional time of condition check after a thread wakes up, to make sure the execution condition is satisfied.

### Difference: wait and sleep
- wait is used for synchronization, while sleep is not. sleep is more for controlling of execution time 
- wait release lock, while sleep doesn't (when inside synchronized block of course)

## Locks
A lock is a more flexible and sophisticated thread synchronization mechanism than `synchronized` block. The *Lock interface* has been around since JDK 1.5. It's defined under the `java.util.concurrent.locks` package. 

Difference betwen `synchronized`
- Lock is more flexible. `synchronized` is fully contained within one method. but Lock API's `lock()` and `unlock()` operation can be separated in different methods.
- `synchronized` block doesn't support fairness. But we can achieve fairness with the Lock API.
- `tryLock`

### ReentrantLock

## Task Execution
### Executor Framework

## Why Thread pool
- lower resource consumption. Reusing thread to lower the cost of creating and destroy threads.
- faster response time, because we save the cost of creating thread.
- centralized management of thread. As thread is a limited resource, creating threads without proper management can lower system stability.

## Types of thread pool
provided by executor framework, we have 4 types:
- `FixedThreadPool`
  - always fixed size
- `SingleThreadExecutor`
  - only 1 thread
- `CachedThreadPool`
  - dynamic size
- `ScheduledThreadPollExecutor`
  - for delayed execution, or periodic execution

## ThreadPoolExecutor
- core size
- maximum size
- keep alive time

### Life cycle and state transitioning
- `RUNNING`: accept new task and process queued tasks
- `SHUTDOWN`: don't accept new tasks, but process queued tasks
- `STOP`: don't accept or process any tasks, also interrupt in-progress tasks.
- `TIDYING`: all tasks have terminated, workerCount is zero, the thread transitioning to state `TIDYING` and run the `terminated()` hook
- `TERMINATED`: `terminated()` completed

### Rejection Policy
When does a rejection happen?
1. 
2. The work queue is full, and creating new thread also fails (resource saturated).

`RejectedExecutorHandler` implementations
- `AbortPolicy`: throws `RejectedExecutionException`
- `DiscardPolicy`: silently discard rejected task, it's a no-op implementation
- `DiscardOldestPolicy`: discards the oldest unhandled task, and retry the current rejected task
- `CallerRunsPolicy`: execute the rejected task in caller thread
