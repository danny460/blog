---
title: Process and thread
path: /operating-system/process-and-thread
---

A process is just an instance of an executing program, including the current
values of the program counter, registers and variables.

Processes that stay in the background to handle some activity such as email are called **daemons**.

> In linux, the `ps` program can be used to list hte running processes.

## Process Creation

Technically, in all these cases, a new process is created by having an existing
process execute a process creation system call. That process may be a running user
process, a system process invoked from the keyboard or mouse, or a batch-manager
process. What that process does is execute a system call to create the new
process. This system call tells the operating system to create a new process and indicates, directly or indirectly, which program to run in it.

> In linux, there is only one system call to create a new process: `fork`. This call create an exact clone of the calling process. After the fork, the tow processes, have the same memory image, same environment strings, same open files. Usually, the child process then execute `execve` or similar system call to change its memory image and run a new program.
>
> Why take the two step approach? The reason is to allow the child to manipulate its file descriptors after the `fork` but before teh `execve` in order to accomplish redirection of `stdin`, `stdout` and `stderr` (???????????????????)

## Process Termination

1. Normal exit (voluntary).
2. Error exit (voluntary).
3. Fatal error (involuntary).
4. Killed by another process (involuntary).

Most process terminates because they have finished their job, in this case, a compiled program would have a system call to notify the OS.

> In linux, the system call is `exit`.

In some systems (e.g., UNIX), a process can tell the operating system that it wishes to handle certain errors itself, in which case the process is signaled (interrupted) instead of terminated when one of the errors occurs.

The fourth reason a process might terminate is that the process executes a system
call telling the operating system to kill some other process. In UNIX this call
is `kill`.

References

- Modern Operating Systems, Chapter 2 Process and threads

## Process Hierarchies

In UNIX, a process and all of its children and further descendants together
form a **process group**. When a user sends a signal from the keyboard, the signal is
delivered to all members of the process group currently associated with the
keyboard (usually all active processes that were created in the current window).
Individually, each process can catch the signal, ignore the signal, or take the default
action, which is to be killed by the signal.

UNIX initializes itself when it is started, just after the computer is booted.
A special process, called `init`, is present in the boot image

## Process Implementation

To implement the process model, the operating system maintains a table (an
array of structures), called the `process table`, with one entry per process. (Some
authors call these entries `process control blocks`).

> In the Linux kernel, each process is represented by a `task_struct` in a doubly-linked list, the head of which is `init_task`.
> In user mode, the process table is visible to normal users under `/proc` directory.

### Zombie process

This is a concept for Unix-like systems. A process is a zombie process if it has completed execution (via `exit` system call) but still has an entry in the process table, in terminated states. The cause is that the parent process doesn't ignore nor handle the `SIGCHLD` signal.

If the zombie process's parent exit, the zombie process will become orphan and adopt by the init process. Then it's entry can be cleared. However, in case of a long running parent process, zombie process entry can't be removed and will consume system resources.

1. handle SIGCHLD properly
2. fork twice and kill parent.

## Scheduling

FCFS
SJF
