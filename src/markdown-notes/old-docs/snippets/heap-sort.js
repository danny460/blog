/**
 * heae sort with max heap
 * @param {*} arr
 */
function heapSort(arr) {
  makeMaxHeap(arr);

  for (let heapSize = arr.length; heapSize > 1; ) {
    // switch root and last element in heap
    // and decrease heap size
    let largest = arr[0];
    arr[0] = arr[heapSize - 1];
    arr[heapSize - 1] = largest;
    heapSize--;

    shiftDownMax(arr, heapSize, 0);
    console.debug(arr);
  }
}

// bottom up
function makeMaxHeap(arr) {
  let len = arr.length;
  for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
    shiftDownMax(arr, len, i);
  }
  console.debug(arr);
}

// shift down
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

var arr = [5, 2, 6, 1, 4, 3, 3];
console.log('orginal: ', arr);
heapSort(arr);
console.log('sorted: ', arr);
