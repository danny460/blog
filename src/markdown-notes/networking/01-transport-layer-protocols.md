---
title: Transport Layer Protocols
path: /networking/transport-layer-protocols
---

## TCP

TCP provides the abstraction of a reliable network running over an unreliable channel. Application layer can use the abstraction for messaging without worrying about lower level detail like: retransmission of lost data, in-order delivery etc. TCP is optimized for accurate delivery.

### TCP Segment

The TCP segment consists of a segment header and

TCP header is the first 20 - 60 bytes of a TCP segment, it contains parameter and state of and end to end TCP socket.

#### Header Structure

The header fields are listed in order:

| size         | field                  | usage                                                                                                                                                                                                                              |
| ------------ | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2 bytes      | source port            | sender's port number                                                                                                                                                                                                               |
| 2 bytes      | destination port       | reciever's port number                                                                                                                                                                                                             |
| 4 bytes      | sequence number        | 2 roles: <ul><li>if SYN flag is 1, this is the initial squence number</li><li>if SYN flag is 0, this is the **accumulated byte number** for the current session.</li></ul>                                                         |
| 4 bytes      | acknowledgement number | valid if ACK flag is set. This number indicate **the next** sequence number that the sender of the ACK is expecting. Acknoledge the receipt of all prior bytes (if any)                                                            |  |
| 4 bits       | data offest            | the size of header, in number of 32-bit words. Minimum header size is 5 words (20 bytes) and maximum is 15 words (60 bytes), allowing up to 40 bytes of options in header. Use this offest to get the location of the actual data. |  |
| 3 bits       | reserved               | for future use, should be set to 0                                                                                                                                                                                                 |
| 9 bits       | flags                  | control flags, see below.                                                                                                                                                                                                          |
| 2 bytes      | Window                 | `rwnd` size, indicating the number of packet the sender is currently willing to recieve (see [Flow Control](#flow-control))                                                                                                        |
| 2 bytes      | Checksum               | the Cyclic Redundancy Check (CRC) checksum. Calculated by sender. Used to verify data integrity. Reciever use this field to verify the data integrity and rejects the data if the check fails                                      |
| 2 bytes      | Urgent pointer         | offset from the sequence number indicating the last urgent data byte                                                                                                                                                               |
| 0 - 40 bytes | Options                | size is 0 to 10 32-bit words.                                                                                                                                                                                                      |

#### More on the flags

| flag     | usage                                                         |
| -------- | ------------------------------------------------------------- |
| NS       | TODO                                                          |
| CWR      | TODO                                                          |
| ECE      | TODO                                                          |
| URG flag | indicates that that the urgent pointer field is significant   |
| ACK flag | used to indicate acknowledgement                              |
| RSH flag | used for TCP push. used primarily in streaming                |
| RST flag | used to reset a TCP connection                                |
| SYN flag | used during 3-way handshake, to synchronize client and server |
| FIN flag | used during termination, indicates end of TCP connection      |

### Reliable transmission

- reordering: rearrange out of order message with sequence number
- retransmission
  - timeout-based retransmission: sender starts timer after it sends the packet.
- error detection
  - CRC checksum

### 3-Way Handshake

All TCP connections begin with a three-way handshake. Before the client or the server can exchange any application data, they must agree on starting packet sequence numbers, as well as a number of other connection specific variables, from both sides:

1. Client: SYN
2. Server: SYN + ACK
3. Client: ACK

Once handshake is complete, application data can begin to flow between client and server.

> **Why do we need 3-way instead of 2-way ?**
>
> A 2-way handshake can only make sure one party establish the initial sequence number (ISN). Since TCP is a bi-directional and fully duplex communication channel, we need a 3-way handshake to make sure both party establish the ISN.

> **What if the last client ACK is lost?**
>
> - On server side. When server send the SYN+ACK segment, the server-side TCP connection status becomse `SYN_RECV`. The server will wait for timeout to retransmit the new SYN + ACK segment. The number of times to retry can be set by modifying `/proc/sys/net/ipv4/tcp_synack_retries` on linux systems. If the server still doesn't recieve an ACK response, server will close the connection after some time.
> - On client side, if client proceed to send data and server is closing the connection, server will respond with `RST`.

### 4-Way Termination

This is how the TCP connection is terminated

1. Client: FIN
2. Server: ACK
3. Server: FIN
4. Client: ACK

> **Note**: After server recieve the last ACK from the client, the connection is terminated. However, the client does not immediately close the request. The client must wait for a 2MSL (Maximum Segment Life) time before terminating. This is to handle cases when the last ACK is not delivered to server. If the client imediatedly closed, it would leave the connection half-closed.

> MSL is configurable, normally 60 seconds

### Flow Control

Ensures that sender will not overwhelm the reciever. Similar to _back pressure_, where the idea is to send feedback to the sender. TCP uses a sliding window (`RWND`) to control the number of bytes in flight (i.e. the bytes sent but not yet `ack`ed).

#### WindowProbe

### Congestion Control

To avoid congestion collapse and achieve high performance. Use sliding window (`CWND`).

- slow start phase (exponential increment)
  - on each RTT
- congestion avoidance phase (when reach `ssthresh`, additive increment)
  - on each RTT
- congestion detection (multiplicative decrement, also change `ssthresh`)
  - on retransmission due to timeout

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

## UDP

### Difference with TCP

- UDP is not reliable, it doesn't need to establish connection before transmitting data (unlike TCP handshake)
- UDP is suitable for many real-time use-case like video streaming, voice call etc.
- UDP is usually used for implementing of new protocols (e.g. QUIC)

### UDP datagram

#### Datagram header structure

| size    | field            | usage                                          |
| ------- | ---------------- | ---------------------------------------------- |
| 2 bytes | Source port      | sender's port number                           |
| 2 bytes | Destination port | reciever's port number                         |
| 2 bytes | Length           | length of datagram **in bytes**, header + data |
| 2 bytes | Checksum         | checksum                                       |

References

- [High Performance Browser Networking, Chapter 2 - Building Block of TCP](https://hpbn.co/building-blocks-of-tcp/)
- [RFC 793 TRANSMISSION CONTROL PROTOCOL](https://tools.ietf.org/html/rfc793)
- https://en.wikipedia.org/wiki/Transmission_Control_Protocol
