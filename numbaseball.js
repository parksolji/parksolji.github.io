var digit=0;
function deterDigit(){
const $checkVal = document.getElementById('digit3');
if ($checkVal.checked == true){
  digit=digit+3;
}
else{
  digit=digit+4;
}
}


function makeRandom(){
  deterDigit();
  for (let i=1; i<digit+1; i++){
    randomNum = Math.floor(Math.random()*(9-1)+1);
    if (numList.includes(randomNum)){
      i--;
    }
    else{
      numList.push(randomNum);
    }
  }
  $inputSet.style.display = 'block';
  $startText.style.display = 'block';
}

numList=[];
textList=[];
let step = 0;

const $startText = document.getElementById('startText');
const $gameStart = document.getElementById('start')
const $num = document.getElementById('number')
const $inputSet = document.getElementById('inputSet');
const $btn = document.getElementById('submit');
const $inputNumber = document.getElementById('input');

$inputNumber.addEventListener("keyup",function(event){
  if(event.keyCode==13){
    event.preventDefault();
    $btn.click();
  }
});

function guessNumber(){
  const table = document.getElementById('result');
  const newRow = table.insertRow();
  if (numList==''){
    alert("게임 시작 버튼을 눌러주세요!");
    $inputNumber.value = "";
  }
  else if ($inputNumber.value.length != digit){    
    alert(`${digit}자리 숫자를 입력해 주세요.`);
  }

  else{
    step++;
  let ball=0;
  let strike=0;
  //input1.value
  const input= $inputNumber.value.split('');
  // console.log(input);
  //document.write(input1);
  for (let i=0; i<3; i++){
    if (numList.join('') == input.join('')){
      alert(`[정답 : ${input.join('')}] [점수 : ${10-step}점]   홈런!`);
      return;
    }
    else if (numList[i] == input[i]){
      strike++;
    }
    else{
      for (let j=0; j<3; j++){
        if (numList[i] == input[j]){
          ball++;
        }
      }
    }
  }

  // printText=`${step} : ${input.join('')}\t[${strike}strike ${ball}ball] \t \n`;
  // textList.push(printText);
  // $inputText.innerText = textList.join('');
  table.style.display = 'block';
  
  const newCell1 = newRow.insertCell(0);
  const newCell2 = newRow.insertCell(1);
  const newCell3 = newRow.insertCell(2);
  
  // Cell에 텍스트 추가
  newCell1.innerText = `${step}`;
  newCell2.innerText = `${input.join('')}`;
  newCell3.innerText = `${strike}strike ${ball}ball`;
  $inputNumber.value = "";
}
}

$gameStart.addEventListener('click',makeRandom);
$btn.addEventListener('click', guessNumber);