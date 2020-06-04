function insertionSortAsc(arr) {
  for (let j = 1; j < arr.length; j++) {
    let key = arr[j];
    let i = j - 1;
    while (key < arr[i]) {
      arr[i + 1] = arr[i];
      i--;
    }
    arr[i + 1] = key;
  }
}

function insertionSortDesc(arr) {
  for (let j = 1; j < arr.length; j++) {
    let key = arr[j];
    let i = j - 1;
    while (key > arr[i]) {
      // only difference
      arr[i + 1] = arr[i];
      i--;
    }
    arr[i + 1] = key;
  }
}

// test
var arr = [5, 2, 6, 1, 4, 3, 3];
console.log('sorting ascending: ', arr);
insertionSortAsc(arr);
console.log(arr);

var arr = [5, 2, 6, 1, 4, 3, 3];
console.log('sorting descending: ', arr);
insertionSortDesc(arr);
console.log(arr);
