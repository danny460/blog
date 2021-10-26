# Service Mesh

## History
Linkered
Istio
    - data plane = envoy
GCP Traffic Director

Kubernetes Pod Sidecar

What do?
Manaage inter-service communication. Lightweight proxy.

- Monolith
- SOA
- Microservice
- Service Mesh

微服务问题
语言碎片化 - 每个语言实现框架 成本高
框架更新困难 - 推动业务调用
协议多样化 - thrift http/1.1 http/2 grpc 以及各种中间件的私有协议 = 需要手动实现
