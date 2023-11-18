var achievementStrings = {
    'ia01': ['100', 'สะสม 100'],
    'ia02': ['k', 'สะสม 1,000'],
    'ia03': ['เป็นล้านเลยหรอพี่', 'ละสม 1,000,000'],
    'im01': ['First', 'ซื้อสิ่งแรก'],
    'mp01': ['I remember', 'รีเซ็ตทุกอย่างที่ผ่านมาเพื่อแปลงเป็น memory']
};
let acBase = (ach) => `<div class="tab" style="margin-bottom: .5em;">
  <div>
    <p style="margin-top: 0;">${ach[0]}</p>
    <p class="tab-text">${ach[1]}</p>
  </div>
</div>`;


let acDiv = document.getElementById('acDiv');
for (let i in achievementStrings) {
    acDiv.insertAdjacentHTML('beforeend', acBase(achievementStrings[i]));
}