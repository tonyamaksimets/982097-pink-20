var tariffsControlsList = document.querySelectorAll('.tariffs__control');
var tariffsTable = document.querySelector('.tariffs__table');
var tariffsCell = document.querySelector('.tariffs__table td');
var tariffsServiceList = document.querySelectorAll('.tariffs__service');

var addTariffsControlClickHandler = function(tariffsControl, tariffsControlNumber) {
  tariffsControl.addEventListener('click', function() {
    tariffsTable.style.left = - tariffsControlNumber * tariffsCell.offsetWidth + 20 + 'px';

    for (var k = 0; k < tariffsServiceList.length; k++) {
      tariffsServiceList[k].style.left = tariffsControlNumber * tariffsCell.offsetWidth  + 'px';
      tariffsServiceList[k].style.transform = 'none';
    };

    for (var j = 0; j < tariffsControlsList.length; j++) {
      tariffsControlsList[j].classList.remove('tariffs__control--current');
    };

    tariffsControl.classList.add('tariffs__control--current');
  });
};

for (var i = 0; i < tariffsControlsList.length; i++) {
  addTariffsControlClickHandler(tariffsControlsList[i], i);
}
