const previousNumber = document.querySelector('#previous-number');
const currentNumber = document.querySelector('#current-number');

const numbers = document.querySelectorAll('.numbers');
const operations = document.querySelectorAll('.operations');
const ac = document.querySelector('#ac');
const plusMinus = document.querySelector('#plus-minus');
const percentage = document.querySelector('#percentage');
const division = document.querySelector('#division');
const multiplication = document.querySelector('#multiplication');
const substraction = document.querySelector('#substraction');
const addition = document.querySelector('#addition');
const equal = document.querySelector('#equal');

let firstNumber = 0; //i numeri selezionati
let arrayNumber = []; //i numeri e gli operatori selezionati 
//ad ogni numero selezionato aggiungo il click
numbers.forEach((number) => {
    number.addEventListener('click', () => {
        firstNumber += number.value; //il primo numero prende il valore del numero selezionato
        console.log(typeof arrayNumber[arrayNumber.length - 1])
        if (!isNaN(arrayNumber.at(-1))) {
            arrayNumber.pop();
        }
        arrayNumber.push(+firstNumber);
        console.log(arrayNumber);
        
        console.log(roundAll(arrayNumber))
        let operation = roundAll(arrayNumber).join('');

        // let operation = arrayNumber.join('');
        
        previousNumber.innerHTML = operation;
        currentNumber.innerHTML = firstNumber;
    })
})

operations.forEach((operation) => {
    operation.addEventListener('click', () => {
        if (arrayNumber.length === 0 && firstNumber === '') {
        } else {
            if (arrayNumber[arrayNumber.length - 1] === '+' ||
                arrayNumber[arrayNumber.length - 1] === '-' ||
                arrayNumber[arrayNumber.length - 1] === '/' ||
                arrayNumber[arrayNumber.length - 1] === '*') {
                arrayNumber.pop();
                arrayNumber.push(operation.value);
            } else {
                arrayNumber.push(operation.value);
            }
            let operationString = arrayNumber.join('');
            previousNumber.innerHTML = operationString;
            console.log(`array : ${arrayNumber}`)
            firstNumber = '';
        }
    })
})

equal.addEventListener('click', () => {
    lastIsNaN(arrayNumber);
    // aggiungo l'ultimo numero digitato e rimuovo valore da firstNumber
    firstNumber = '';
    let result = total(arrayNumber);
    // resetto arrayNumber e ci aggiungo il risultato
    arrayNumber = [];
    arrayNumber.push(result);
    render(result);
    result = 0;
})



function render(result) {
    isInt(result);
}


// FUNZIONANTI

//controlla se il numero è intero
//se intero lo riporta senza virgola, altrimenti con i primi due numeri decimali
function isInt(result){
    if (parseInt(result) != result) {
        currentNumber.innerHTML = result.toFixed(2);
    } else {
        currentNumber.innerHTML = result;
    }
}

//preso un array con numeri e operatori ritorna il risultato
function total(array){
    let finalOperation = '';
     //trasformo l'array in stringa
     for (let i = 0; i < array.length; i++) {
        finalOperation += array[i];
    }
    return eval(finalOperation); //eval svolge le operazioni all'interno della stringa
}

ac.addEventListener('click', () => {
    arrayNumber = [];
    firstNumber = '';
    previousNumber.innerHTML = '';
    currentNumber.innerHTML = 0;
})

// al clic cambia il segno del numero che si sta inserendo
plusMinus.addEventListener('click', () => {
    arrayNumber[arrayNumber.length-1] *= -1;
    currentNumber.innerHTML = arrayNumber[arrayNumber.length-1];
})

percentage.addEventListener('click', ()=>{
    arrayNumber[arrayNumber.length-1] /= 100;
    currentNumber.innerHTML = arrayNumber[arrayNumber.length-1];
})

//controlla se l'ultimo valore di un array è un numero, se non lo è rimuove il valore
function lastIsNaN(array){
    if(isNaN(array[array.length-1])){
        array.pop();
    }
}

function roundAll(array) {
    let numberRounded = array.map((num) => {
      if (!isNaN(num) && num >= 10 && num < 100) {
        return parseFloat(num.toFixed(2));
      } else {
        return num;
      }
    });
  
    return numberRounded;
  }
  