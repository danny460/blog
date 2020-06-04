# Threads
Traditonally in operating systems, each process has its own addresss space and a single thread of control. However, in some situations, it is desirable to have multiple threads of control in the same address space. Introducing...Threads.

## POSIX threads (Pthreads)
To make it possible to write portable threaded programs, IEEE has defined a
standard for threads in IEEE standard 1003.1c. The threads package it defines is
called `Pthreads`. POSIX thread is an interface, a standard. Its implementation is availalble on many different operating systems.

| Thread call          | Description                                          |
| -------------------- | ---------------------------------------------------- |
| `pthread_create`       | Create a new thread                                  |
| `pthread_exit`         | Terminate the calling thread                         |
| `pthread_join`         | Wait for a specific thread to exit                   |
| `pthread_yield`        | Release the CPU to let another thread run            |
| `pthread_attr_init`    | Create and initialize a thread’s attribute structure |
| `pthread_attr_destroy` | Remove a thread’s attribute structure                |

## Implementing threads
There are two main places to implement threads: user space and the kernel. A hybrid implementation is also possible. They each have their advantages and disadvantages.

## User threads
The first method is to put the threads package entirely in user space. The kernel
knows nothing about them. As far as the kernel is concerned, it is managing
ordinary, single-threaded processes.

When threads are managed in user space, each process needs its own private
`thread table` to keep track of the threads in that process.

**Advantages**
- The obvious advantage is that user-level threads can be implemented on systems that does not natively support threads.

**Disadvantages**
- If a thread causes a page fault, the kernel, unaware of even the existence of threads, naturally blocks the entire process until the disk I/O is complete, even though other user-level threads might be runnable.

- If a thread starts running, no other thread in that process will ever run unless the first thread voluntarily gives up the CPU.

## Kernel threads
For kernel threads, when a thread wants to create a new thread or destroy an existing thread, it makes a kernel call, which then does the creation or
destruction by updating the kernel thread table.

Due to the relatively greater cost of creating and destroying threads in the kernel, some systems take an environmentally correct approach and recycle their
threads. When a thread is destroyed, it is marked as not runnable, but its kernel
data structures are not otherwise affected.

**Disadvantages**
- Cost of system calls is substantial.

## Hybrid implementation
Various ways have been investigated to try to combine the advantages of user-level
threads with kernel-level threads. One way is use kernel-level threads and
then multiplex user-level threads onto some or all of them.

> Java, for example, have a hybrid threading model. each user thread is mapped with one kernel thread.
