---
id: networking_transport
title: Transport Layer
sidebar_label: Transport Layer
---

## TCP

TCP provides the abstraction of a reliable network running over an unreliable channel. Application layer can use the abstraction for messaging without worrying about lower level detail like: retransmission of lost data, in-order delivery etc. TCP is optimized for accurate delivery.

### 3-Way Handshake

All TCP connections begin with a three-way handshake. Before the client or the server can exchange any application data, they must agree on starting packet sequence numbers, as well as a number of other connection specific variables, from both sides.

<nav class="no-bullet">

SYN

- Client initiates by sending a SYN packet with randomly picked sequence number _x_ , TCP flags and options.
-

SYN ACK

- Server increments _x_ by 1, pick its own random sequence y, appends its own set of flags and options, and dispatcheds the SYN ACK response.

ACK

- Client increment _x_ and _y_ by 1 and completes the handshake by sending the last ACK packet.

Once handshake is complete, application data can begin to flow between client and server.

</nav>

### Flow Control

### Congestion Control - slow-start

### Congestion Avoidance

### TCP Optimization

<nav class="no-bullet">

Reuse connection

- TODO:

TCP Fast Open

- limited usecase.

window scaling

- `sysctl -w net.inet.tcp.win_scale_factor=4`

increase intial congestion window

- Increasing the initial cwnd size on the server to the new RFC 6928 value of 10 segments (IW10) is one of the simplest ways to improve performance for all users and all applications running over TCP. For Linux, IW10 is the new default for all kernels above 2.6.39

disable slow-start restart (SSR)

- TCP implements a slow-start restart(SSR) mechanism which resets the congestion window of a connection after it has been idle for a defined period of time. The setting can be disabled on Linux platforms:
  - `sysctl -w net.ipv4.tcp_slow_start_after_idle=0`

</nav>
