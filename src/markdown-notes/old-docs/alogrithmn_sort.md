Comparison sort determines the sort order by performing comparison. It can be proved that the has a lower bound of Ω(_n_lg_n_)
| | |
| -------------- | ---- |
| insertion sort | n^2 |
| merge sort | nlgn |
| heap sort | nlgn |
| quick sort | nlgn |
| bucket sort |
| radix sort |

## Comparison Sort

### Insertion Sort

```js
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = arr[i - 1];
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}
```

### Merge Sort

### Heap Sort

**Heap**
A heap is essentially an almost complete tree: with node filled from left to right on all levels except maybe the last level. A heap can be represented using an array `A`.

**Max-heap and Min-heap**
A max-heap is an heap that has the property: the value of the parent node is always greater its child node. The inverse is a min-heap. We can use min heap to implement the [priority queue (**TODO**)](). We can use a binary max-heap to implement the heap sort algorithm.

```js
// move the root of the max-heap to the correct location
// then reduce heap size.
function heapSort(arr) {
  makeMaxHeap(arr);

  for (let heapSize = arr.length; heapSize > 1; ) {
    let largest = arr[0];
    arr[0] = arr[heapSize - 1];
    arr[heapSize - 1] = largest;
    heapSize--;

    shiftDownMax(arr, heapSize, 0);
    console.debug(arr);
  }
}

// Make arr a max-heap in place, from bottom up
// with the shfit-down alogrithmn.
function makeMaxHeap(arr) {
  let len = arr.length;
  // Math.floor(len / 2) - 1 would be the last non-leaf node
  // so we don't start with trivial leaf nodes.
  for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
    shiftDownMax(arr, len, i);
  }
  console.debug(arr);
}

// require the left and right subtree of i node to be
// max-heap, then shift i down to the right location in
// the heap.
function shiftDownMax(arr, heapSize, i) {
  let l = 2 * i + 1;
  let r = 2 * i + 2;

  let largest = i;
  if (l < heapSize && arr[l] > arr[largest]) {
    largest = l;
  }
  if (r < heapSize && arr[r] > arr[largest]) {
    largest = r;
  }

  if (largest !== i) {
    let temp = arr[largest];
    arr[largest] = arr[i];
    arr[i] = temp;
  }
}
```

## Counting Sort
