# Message Queue

## Characteristics and Benefits
What capability does MQ provides to a system? What are the benefits? We try to answer these questions before going to detailed analysis and comaprision between different MQs.

### Decoupling
The producer-consumer pattern natrually decouples the production of data and the processing to perform **asynchronously**.

### Granualar Scalability
Message queues make it possible to scale precisely where you need to. When workloads peak, multiple instances of your application can all add requests to the queue without risk of collision (流量削峰). As your queues get longer with these incoming requests, you can distribute the workload across a fleet of consumers. Producers, consumers and the queue itself can all grow and shrink on demand.

## Features
### Push or Pull Delivery (Pub/Sub messaging)
### Schedule or Delay Delivery
### Exactly-Once Delivery
### At-Least-Once Delivery
### FIFO Queues
### Dead-letter Queues
### Ordering
### Poison-pill Messages
### Security

Availability

Duplicated Consumption

Persistence


## Apache Kafka
functionalities
- To publish (write) and subscribe to (read) streams of events, including continuous import/export of your data from other systems.
- To store streams of events durably and reliably for as long as you want.
- To process streams of events as they occur or retrospectively.

### Kafka is a partitioned system
Kafka is a partitioned system so not all servers have the complete data set. Topics are split into a **pre-defined number of partitions**, P, and each partition is replicated with some **replication factor**, N.

All systems of this nature have the question of how a particular piece of data is assigned to a particular partition. Kafka clients directly control this assignment, the brokers themselves enforce no particular semantics of which messages should be published to a particular partition. **Rather, to publish messages the client directly addresses messages to a particular partition, and when fetching messages, fetches from a particular partition.** If two clients want to use the same partitioning scheme they must use the same method to compute the mapping of key to partition.

#### System architecture
Kafka run as a cluster of one or more servers that can span across multiple datacenters or cloud regions:
- Brokers: storage layer
- Kafka Connect: import and export data with integration to existing data systems such as relational databases, other Kafka clusters etc.

A Kafka cluster is highly scalable and fault-tolerant: if any of its servers fails, the other servers will take over their work to ensure continuous operations without any data loss.

#### Ordering
Kafka guarantees that any consumer of a given topic-partition will always read that partition's events in exactly the same order as they were written.