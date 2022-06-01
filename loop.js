let index = 0;
let array = [0, 1, 2];

while (index < array.length) {
  console.log(`Both the index and current array position are ${array[index]}`);
  index++;
}

function perfectSquares(num) {
  for (let idx = 0; idx < num; idx++) {
    console.log(idx ** 2);
  }
}

function perfectSquares2(num) {
  let index = 0;
  while (index < num) {
    console.log(index ** 2);
    index++;
  }
}

perfectSquares2(100);
