var newPostControlsList = document.querySelectorAll('.new-post__control');
var newPostSettingList = document.querySelectorAll('.new-post__setting');

var newPostRangeList = document.querySelectorAll('.new-post__range');
var newPostToggleList = document.querySelectorAll('.new-post__toggle');
var newPostInputList = document.querySelectorAll('.new-post__setting-input');

var addNewPostControlClickHandler = function(newPostControl, newPostSetting) {
  newPostControl.addEventListener('click', function() {
    for (var j = 0; j < newPostControlsList.length; j++) {
      newPostControlsList[j].classList.remove('new-post__control--current');
      newPostSettingList[j].classList.remove('new-post__setting--current');
    }

    newPostControl.classList.add('new-post__control--current');
    newPostSetting.classList.add('new-post__setting--current');
  });
};

for (var i = 0; i < newPostControlsList.length; i++) {
  addNewPostControlClickHandler(newPostControlsList[i], newPostSettingList[i]);
}


var addNewPostRangeClickHandler = function(newPostRange, newPostToggle, newPostInput) {
  var rangeClientCoords = newPostRange.getBoundingClientRect();

  newPostToggle.onmousedown = function(event) {
    event.preventDefault();

    var toggleClientCoords = newPostToggle.getBoundingClientRect();
    var shiftX = event.clientX - toggleClientCoords.left;
    var right = newPostRange.offsetWidth - newPostToggle.offsetWidth;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
      var newLeft = event.clientX - shiftX - rangeClientCoords.left;

      if (newLeft < 0) {
        newLeft = 0;
      }

      if (newLeft > right) {
        newLeft = right;
      }

      newPostToggle.style.left = newLeft/right * 100 + '%';
      newPostInput.value = Math.round(newLeft/right * 100);
    }

    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }
  };

  newPostToggle.ondragstart = function() {
    return false;
  };
};

for (var k = 0; k < newPostRangeList.length; k++) {
  addNewPostRangeClickHandler(newPostRangeList[k], newPostToggleList[k], newPostInputList[k]);
}
