var digit=0;
const $checkVal3 = document.getElementById('digit3');
const $checkVal4 = document.getElementById('digit4');

function deterDigit(){
if ($checkVal3.checked == true){
  digit=digit+3;
}
else{
  digit=digit+4;
}
}

function makeRandom(){
  $gameStart.disabled=true;
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
  if ($checkVal3.checked == true){
    $checkVal4.disabled=true;
  }
  else{
    $checkVal3.disabled=true;
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
const $restart = document.getElementById('restart');

$inputNumber.addEventListener("keyup",function(event){
  if(event.keyCode==13){
    event.preventDefault();
    $btn.click();
  }
});


function guessNumber(){
  const table = document.getElementById('result');
  const newRow = table.insertRow();
  const input= $inputNumber.value.split('');
  const set = new Set(input);
  if (numList==''){
    alert("게임 시작 버튼을 눌러주세요!");
    $inputNumber.value = "";
  }
  else if ($inputNumber.value.length != digit){    
    alert(`${digit}자리 숫자를 입력해 주세요.`);
  }
  else if(input.length !== set.size){
    alert("중복된 숫자가 있어요!");
    $inputNumber.value = "";
  }
  else{
    step++;
  let ball=0;
  let strike=0;
  //input1.value
  // console.log(input);
  //document.write(input1);
  if (numList.join('') == input.join('')){
    alert(`[정답 : ${input.join('')}] [점수 : ${10-step}점]   홈런!`);
      const newCell1 = newRow.insertCell(0);
      const newCell2 = newRow.insertCell(1);
      const newCell3 = newRow.insertCell(2);
      newCell1.style.color='red';
      newCell2.style.color='red';
      newCell3.style.color='red';
      // Cell에 텍스트 추가
      newCell1.innerText = `${step}`;
      newCell2.innerText = `${input.join('')}`;
      newCell3.innerText = `HomeRun`;
      
      $restart.style.display='block';
      $restart.addEventListener('click',restart);        return;
      return;
    }
    else{
    for (let i=0; i<digit; i++){
    if (numList[i] == input[i]){
      strike++;
    }
    else{
      for (let j=0; j<digit; j++){
        if (numList[i] == input[j]){
          ball++;
        }
      }
    }
  }}

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

function restart(){
  const table = document.getElementById('result');
  $inputSet.style.display = 'none';
  $startText.style.display = 'none';
  for(let i=0; i < step; i++){
     table.deleteRow(-1);
  }
    table.style.display='none'
    $restart.style.display='none';
    $inputNumber.value = "";
    $checkVal3.disabled=false;
    $checkVal4.disabled=false;
    $gameStart.disabled=false;
    digit=0
    numList=[];
    textList=[];
    step = 0;
    $gameStart.addEventListener('click',makeRandom);
    $btn.addEventListener('click', guessNumber);
}

$gameStart.addEventListener('click',makeRandom);
$btn.addEventListener('click', guessNumber);