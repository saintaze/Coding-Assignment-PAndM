// FACTORIAL 

function factorial(num) {
  if(num === 0 || n === 1) return 1;
  return num * factorial(num - 1);
}


// QUESTIONS MARKS

function questionsMarks(str){
  let questionMarks = 0;
  let num = null;
  for(let i = 0; i < str.length; i++){
    const char = str[i];
    if(!isNaN(parseInt(char))) {
      if(num === null){
        num = parseInt(char);
      }else{
        if(questionMarks === 3 && num + parseInt(char) === 10){
          return true;
        }else{
          questionMarks = 0;
          num = parseInt(char);
          continue;
        }
      }
    };
    if(num !== null && char === '?') questionMarks++;
  }
  return false;
}

// PRIME NUMBERS

function isPrimeNumber(num) { 
  if (num <= 1 || num % 2 === 0 && num > 2) return false; 
  for(let i = 3; i <= Math.sqrt(num); i += 2) { 
    if(num % i === 0) return false; 
  }
  return true;
}

function getPrimeNumbersTo(number){
  let primeNums = [];
  for(let i = 2; i <= number; i++){
    if(isPrimeNumber(i)) primeNums.push(i);
  }
  return primeNums.join();
}


// TREE CONSTRUCTOR 

function constructTree(strArr){
  const childrenCount = {};
  for(let i = 0; i < strArr.length; i++){
    const pair = strArr[i].split(',').map(n => parseInt(n));
    if(childrenCount[pair[1]] === undefined) childrenCount[pair[1]] = 0;
    if(++childrenCount[pair[1]] > 2) return 'false';
  }
  return 'true';
}