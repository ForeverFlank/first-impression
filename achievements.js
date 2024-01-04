var achievementStrings = {
    'ia01': ['100', 'สะสม 100 impressions'],
    'ia02': ['k', 'สะสม 1,000 impressions'],
    'ia03': ['เป็นล้านเลยหรอพี่', 'ละสม 1,000,000 impressions'],
    'ia04': ['อยู่ภายในใจเป็นหมื่นล้านคำ', 'ละสม 10,000,000,000 impressions'],
    'im01': ['First Impression', 'ซื้อ First Impression'],
    'im02': ['ห้ะ อะไรนะ', 'ซื้อ Second Impression'],
    'mp01': ['I remember', 'รีเซ็ตทุก impression เพื่อแปลงเป็น memory points']
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