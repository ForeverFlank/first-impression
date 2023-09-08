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
var div = document.getElementById('ims');
for (var i = 2; i <= 10; i++) {
    div.insertAdjacentHTML('beforeend', base(i));
}
for (var i = 1; i <= 10; i++) {
	imLevels.push(new ImLevel(i,
    new Decimal(0),
    new Decimal(0),
    new Decimal(2 ** (1 - i)),
    false,
    false));
	setText(`im${i}Button`, format(imLevels[i - 1].cost()));  
}
for (var i = 10; i > imUnlocked; i--) {
 	document.getElementById(`im${i}`).style.display = 'none';
}

// button ripple
const buttons = document.getElementsByTagName('button');
for (const button of buttons) {
    button.addEventListener('click', createRipple);
}