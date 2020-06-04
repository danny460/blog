function quickSort(A, l, r) {
  // first call
  if (arguments.length === 1) {
    (l = 0), (r = A.length - 1);
  }

  if (l < r) {
    let q = partition(A, l, r);
    quickSort(A, l, q - 1);
    quickSort(A, q + 1, r);
  }
}

// move A[r] to the correct location
// return location.
function partition(A, l, r) {
  let pivot = A[r];

  let i = l - 1;
  for (j = l; j < r; j++) {
    if (A[j] <= pivot) {
      i++;
      let temp = A[i];
      A[i] = A[j];
      A[j] = temp;
    }
  }
  i++;
  A[r] = A[i];
  A[i] = pivot;
  console.debug(A, l, r);
  return i;
}

var arr = [5, 2, 6, 1, 4, 3, 3];
console.log('orginal: ', arr);
quickSort(arr);
console.log('sorted: ', arr);
