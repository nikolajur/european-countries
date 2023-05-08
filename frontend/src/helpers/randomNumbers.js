const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

const serveArrayOfFour = (required, optionsArray, maxNum) => {
  let array = [];
  array.push(required);

  while (array.length < 4) {
    const randomNumber = generateRandomNumber(0, maxNum);
    if (optionsArray[randomNumber] === required || array.includes(optionsArray[randomNumber])) {
      continue;
    } else {
      array.push(optionsArray[randomNumber]);
    }
  }

  return array;
};

const shuffleArrayOfFour = (array) => {
  let shuffledArray = [];

  for (let i = 0; i < 4; i++) {
    const randomIndex = generateRandomNumber(0, 3 - i);
    shuffledArray.push(array[randomIndex]);
    array.splice(randomIndex, 1);
  }
  return shuffledArray;
};

const sortNumbers = (array) => {
  return array.sort((a, b) => {
    return a - b;
  });
};

export { serveArrayOfFour, shuffleArrayOfFour, sortNumbers };
