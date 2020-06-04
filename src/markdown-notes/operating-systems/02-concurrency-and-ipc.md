---
title: Inter-process Communication
path: /operating-system/inter-process-communication
---

## Race Condition and Critical Regions
**Race condition** can happen when two or more processes write or read some shared data. To avoid race condition, we need to enforce **mutual exclusion** on access to shared data. 

The <span class="u">part of program</span> where the shared memory is accessed is called the **critical region**.

## Achieving Mutual Exclusion
There are many apporches to achieve mutual exclu-
sion, so that while one process is busy updating shared memory in its critical region, no other process will enter. There are different hardware and software approaches, some employee a technique called **busy waiting**, where you would continuously test for some condition to become true before entering critical region.

### (1) **Disabling Interrupts** 

This is the simplest solution, to turn off interrupt on CPU will switching to other process in the middle of critical regions. But It is generally unattractive because the waiting time for user process can be arbitrary, and achieves low concurrency. Also it does not work for multiprocessor systems, because disabling interrupt for one CPU does not prevent others from running processes. However, it is convinient for the kernel to disable interrupts for some instructions.

In conclusion this can be useful within the operating system itself, but not for general user processes.

### (2) **Software Approach**

By opting a software approach, the programmer need to code in a way where access to shared data is safe. Examples are Dekker's algorithm and Peterson's algorithm, which uses the idea of taking turns and lock variables.

Below snippet shows Peterson's algorithm, before using shared variables, each process call the `enter_region` method, and after leaving the critical region, call `leave_region`.

```c
#define FALSE 0
#define TRUE 1
#define N 2 // number of processes

int turn;               // whose turn is it?
int interested[N];      // all values initially 0 (FALSE)

void enter_region(int process) {    // process is 0 or 1
    int other = 1 − process;        // the other process
    interested[process] = TRUE;     // show that you are interested
    turn = process;                 // set flag
    while (turn == process && interested[other] == TRUE); // null statement
}

void leave_region(int process) {
    interested[process] = FALSE;
}
```

### (3) **`TSL` and `XCHG`**

the `TSL` (or **Test, and Set Lock**) instruction reads the content of memory word `lock` and stores a non-zero value at the that address. `TSL` operation is indivisible (**atomic**), it will lock the memory bus and prohibit other CPU from accessing the memory word until its done.

`TSL` can be used to implement the lock variable, and with busy waiting we can achieve mutual exclusion. A lock that uses busy waiting is called a **spin lock**

pseudo assembly code showing how it works:
```assembly
enter_region:
    TSL REGISTER,LOCK   | copy value to register and set lock to 1
    CMP REGISTER,#0     | compare lock value with 0
    JNE enter_region    | infinite loop if non-zero, busy waiting
    RET                 | else return (to continue to critical region)

leave_region:
    MOVE LOCK,#0        | set lock back to 0
    RET
```

`XCHG` instruction is an alternative to `TSL`, which exchange content of two memory location, <span class="u">atomically</span>. Intel x86 CPU uses XCHG for low-level synchronization.

### (4) **Semaphore**

Semaphores uses sleep/wake-up instead of busy waiting. A semaphore need to be initialized with a value, and it has 2 **atomic** operations:

- **down**: checks if value > 0. If so, decrement value and continue, else put process to sleep, without completing down.
- **up**: increment value, and choose a sleeping process (if any) to wakeup and complete its down operation.

Semaphore can be use as mutex, or for synchronization.

#### Mutexes

### (5) **Monitor**

With semaphores/mutexes, developer must be very careful or else it could cause subtle errors. Monitors are here to provide a easier and less error-prone way to work with synchronization.

Monitor is a programming language concept, and its special behaviors have to be implemented by the language's compiler.

A monitor is a collection of procedures, variables and data structures that are grouped together in a special kind of module. Proccess can call the procedures but they cannot directly access the internal data. <span class="u">Monitors have an important property that, there can be only one process active in the monitor at any instant.</span>

typically when a process calls a monitor procedure, the compiler will add the check to see if any other process is currently active within the monitor. If so, the calling process will be suspended until the other process left. Else the calling process is allowed to enter.

Additionally we use **condition variables** and `wait`/`signal` operation, to suspend and wakeup processes. To aviod having 2 active processes when wake-up(signal), there are a few solutions:
- Hansen: enforce the rule that whenever a process does a `signal`, it must exit immediately.
- Hoare: if P does signal and wake-up Q, suspend P and let newly awaken Q run.
- MESA: if P signal, P continue to run and only allow the waiting process to run when P exits. (additional condition check is required after the waiting process starts running, because condition could change).

#### Application: Java
In Java, we can use the `synchronized` keyword with `wait`/`notify` to construct the monitor.

### (6) Send/Recieve
Message passing allows passing of more complex message, it uses 2 primitives `send` and `recieve`.

### (7) Barriers
Barrier primitive is a way to synchronize multiple process in phases. Barrier ensures that no process can advance to the next phase util all processes complete the current phase. 


## Concurrency in POSIX Threads
POSIX Threads (usually pthreads), is an execution model independent from language.

pthread_mutex_init
pthread_mutex_init
pthread_mutex_init
pthread_mutex_init
pthread_mutex_init

pthread_cond_init
pthread_cond_init
pthread_cond_init
pthread_cond_init
pthread_cond_init

## IPC Mechanism in Linux
