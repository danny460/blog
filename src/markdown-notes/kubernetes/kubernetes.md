---
title: Kubernetes (K8s)
path: /k8s
---

## Architecture
- node (minions)
  - node is where your application runs on
- cluster
  - multiple nodes form cluster
- master
  - master is a node, it monitor and orchestrate

Components
- API Server: cli, management ui talks with api server
- etcd: distributed key-value store, implment locks
- kubelet: agent runs on each node in cluster
- Container runtime: underline runtime to run container (e.g. docker, rkt, cri-o) 
- Controller: brain of orchestration, respond to down load
- Scheduler:  distribute work to containers

Master & worker nodes
master
- kube-apiserver
- etcd
- controller
- scheduler

worker
- container runtime
- kubelet

`kubectl`
cli tool for managing k8s cluster






## Core
### Pods
usually one container application per pod, multiple pods per node.

you can have multiple container per pod, but in this case, they should be tightly coupled. One needs another to run, one dies with anther.

pod handles shared volume, network automatically.

**deploy pod**
```
kubectl run nginx --image nginx
```

**list pods**
```
kubectl get pods
```

**create pods via YAML**

`pod-definition.yml`
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
    type: front-end
spec: 
  containers:
    - name: nginx-container
      image: nginx
```

### Replica sets
Replication controller is the old way. New recommendation to use replica set.

#### create replication controller
`rc-definition.yml`
```yaml
apiVersion: v1
kind: ReplicationController
metadata: 
  name: myapp-rc
  labels:
    app: myapp
    type: front-end
spec:
  template: # copied from our pod-definition above
    metadata:
      name: myapp-pod
      labels:
        app: myapp
        type: front-end
    spec: 
      containers:
        - name: nginx-container
          image: nginx
  replicas: 3 # how many pod replica we need
```
then
```
kubectl create -f rc-definition.yml
```
view created rc and pods:
```
kubectl get replicationcontroller
kubectl get pods
```

#### Create replica set
`replicaset-definition.yml`
```yaml
apiVersion: apps/v1 # note the difference
kind: ReplicaSet
metadata:
  name: myapp-replicaset
spec:
  template: # same
    metadata:
      name: myapp-pod
      labels:
        app: myapp
        type: front-end
    spec: 
      containers:
        - name: nginx-container
          image: nginx
  replicas: 3
  selector:
    matchLabels:
      type: front-end  
  # replica set use selector to identify which pods fall under it
  # replica set can also manage pods not created by the replica set.
```
then
```
kubectl create -f replicaset-definition.yml
```
view created replica set and pods:
```
kubectl get replicaset
kubectl get pods
```


#### Labels and selectors
Replica set can monitor existing pods, that's why it use selectors and why labels are useful.

#### Scaling
modify definition file and then run
```
kubectl replace -f replicaset-definition.yml
```
or directly without editing the file (file content will not change)
```
kubectl scale --replicas=6 -f replicaset-definition.yml
```
or similarly, but with type and name
```
kubectl scale --replicas=6 replicaset myapp-replicaset
```

### Deployments
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  #...
spec:
  template:
    # ...
  replicas:
  selector:
```

## Configuration

### Command and args

### Config Maps

### Secrets

### Resource requirements and limits

### Taints and Tolerances
- Tainted node only accept nodes with the right toleration.
- Doesn't prevent pod with the right toleration to schedule on untainted nodes.
> effect is that a node can accept some pods but not other pods.

### Node affinity
- Pod with affinity (via label selector) can only (or preferred) be scheduled to matching node. 
- Doesn't prevent pod without affinity to be scheduled on these nodes.
> effect is that the pod can go on some nodes but not other nodes.

(need to use both taints/toleration and node affinity, if you need guarantee a node only accept some pod, and these pod can only be scheduled on said node).

## Security

### Docker Security
#### Linux Capabilities
