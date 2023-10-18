'use strict';

// Create im tabs
let ordinal = ['Second', 'Third', 'Forth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'];
let base = (n) => `<div class="tab" id="im${n}">
<div class="width-55">
  <p style="margin-top: 0;">${ordinal[n - 2]}</p>
  <div class="space-between">
    <div class="flex-start width-45">
      <p id="im${n}Mult" class="tab-text">1</p>
      <p class="tab-text">&nbsp;×</p>
    </div>
    <p id="im${n}Total" class="tab-text width-45 center">0</p>
  </div>  
</div>
<button id="im${n}Button" onclick="imBuy(${n})" class="tab-button width-40">0</button>
</div>`;
let imDiv = document.getElementById('ims');
for (var i = 2; i <= 10; i++) {
    imDiv.insertAdjacentHTML('beforeend', base(i));
}
for (var i = 1; i <= 10; i++) {
	imLevels.push(new ImLevel(i,
    new Decimal(0),
    new Decimal(0),
    imLevelsInitMult[i-1],
    false,
    false));
}

// button ripple
const buttons = document.getElementsByTagName('button');
for (const button of buttons) {
    button.addEventListener('click', createRipple);
}