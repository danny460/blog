# Sorting Algorithmns

## Heapsort

- Time complexity: $O(n\log n)$ both average and worst case.

## Quicksort

- Time Complexity: average $O(n\log n)$, worst case $O(n^2)$.

For quicksort, the key is having optimal pivot selection. Naive implementation taking the first/last element as pivot each time, is sensitive to input. Better option is to select pivot randomly.

### Why is quicksort usually faster in practice

- quick sort doesn't perform unnecessary element swaps.
- cache efficiency.

## Mergesort

- Time Complexity: average $O(n\log n)$, worst case $O(n^2)$.
- Space Complexity: $O(n)$ additional space.

## Comparison

# Graph Alogrithmns

## Dijkstra's alogrithm

shortest path alogrithmn.

### Algorithm

1. Mark all node as unvisited. create a set of all unvisited nodes.
2. Set a initial tentative distance value for all nodes. For the initial node, set the value to 0, and for all other nodes, set the value to infinity.
3. Set the intial node as current node.
4. For the current node, consider all of its unvisited neighbour and calculate the tentative distance. If the tentative value is smaller the currently assigned value, set it to the tentative value. Otherwise, current value is kept.
5. When we done with all neighbouring nodes, mark current node as visited, and remove it from the unvisited set. (visited node will never be checked again)
6. If the destination node has been marked with visisted (if we're finding path between initial and destination node), or if the smallest unvisited node is infinit, stop.
7. Otherwise, select the unvisited node with smallest distance, set it as current node. and repeat from step 4.

Implementation can consider use a priority queue for retrieving unvisited node with smallest distance.

## Bellman-Ford algorithm

shortest path algo.

### Algorithm
