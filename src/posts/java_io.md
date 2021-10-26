---
title: I/O in Java
path: /java/io
---

## I/O model

- blocking IO（阻塞 IO）
- nonblocking IO（非阻塞 IO）
- IO multiplexing（多路复用 IO）
- signal driven IO（信号驱动 IO）

- asynchronous IO（异步 IO）

### Synchronous vs Asynchronous

w.r.t application and kernel

synchronous: user trigger I/O and wait I/O to complete
asynchronous: user trigger I/O and do something else.

### Blocking vs Non-blocking

w.r.t process accessing data.

阻塞指的是当试图对该文件描述符进行读写时，如果当时没有东西可读，或暂时不可写，程序就进入等待状态，直到有东西可读或可写为止。去地铁站充值，发现这个时候充值员碰巧不在，然后我们就在原地等待，一直等到充值员回来为止。

非阻塞指的是如果没有东西可读，或不可写，读写函数马上返回，而不会等待。在银行里办业务时，领取一张小票，之后我们可以玩手机，或与别人聊聊天，当轮到我们时，银行的喇叭会通知，这时候我们就可以去办业务了。

### I/O 模型分类

应用程序向操作系统发出 IO 请求：应用程序发出 IO 请求给操作系统内核，操作系统内核需要等待数据就绪，这里的数据可能来自别的应用程序或者网络。一般来说，一个 IO 分为两个阶段：

等待数据：数据可能来自其他应用程序或者网络，如果没有数据，应用程序就阻塞等待。
拷贝数据：将就绪的数据拷贝到应用程序工作区。
在 Linux 系统中，操作系统的 IO 操作是一个系统调用 recvfrom()，即一个系统调用 recvfrom 包含两步，等待数据就绪和拷贝数据。

### Synchronous blocking I/O

### Synchronous non-blocking I/O

### I/O multiplexing

### Signal driven I/O

### Asynchronous I/O

|       | Blocking          | Non-blocking |
| ----- | ----------------- | ------------ |
| Sync  | read              | NIO          |
| Async | select/poll/epoll | AIO          |

- BIO
- NIO
- AIO

select, poll and epoll

select, each time select will add
