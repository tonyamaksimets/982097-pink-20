var sliderControlsList = document.querySelectorAll('.slider__control-oder');
var slidesList = document.querySelectorAll('.slider__slide');
var sliderControlPrev = document.querySelector('.slider__control-direction--prev');
var sliderControlNext = document.querySelector('.slider__control-direction--next');

var addSliderControlClickHandler = function(sliderControl, slide) {
  sliderControl.addEventListener('click', function() {
    for (var j = 0; j < sliderControlsList.length; j++) {
      sliderControlsList[j].classList.remove('slider__control-oder--current');
      slidesList[j].classList.remove('slider__slide--current');
    };

    sliderControl.classList.add('slider__control-oder--current');
    slide.classList.add('slider__slide--current');
  });
};

for (var i = 0; i < sliderControlsList.length; i++) {
  addSliderControlClickHandler(sliderControlsList[i], slidesList[i]);
}

sliderControlPrev.addEventListener('click', function() {
    for (var k = 0; k < sliderControlsList.length; k++) {
      if (sliderControlsList[k].classList.contains('slider__control-oder--current')) {
        sliderControlsList[k].classList.remove('slider__control-oder--current');
        sliderControlsList[k - 1].classList.add('slider__control-oder--current');
        slidesList[k].classList.remove('slider__slide--current');
        slidesList[k - 1].classList.add('slider__slide--current');

        sliderControlNext.removeAttribute('disabled');

        if ((k - 1) === 0) {
          sliderControlPrev.setAttribute('disabled', 'true');
        }
        break;
      }
    }
});

sliderControlNext.addEventListener('click', function() {
    for (var l = 0; l < sliderControlsList.length; l++) {
      if (sliderControlsList[l].classList.contains('slider__control-oder--current')) {
        sliderControlsList[l].classList.remove('slider__control-oder--current');
        sliderControlsList[l + 1].classList.add('slider__control-oder--current');
        slidesList[l].classList.remove('slider__slide--current');
        slidesList[l + 1].classList.add('slider__slide--current');

        sliderControlPrev.removeAttribute('disabled', 'true');

        if ((l + 1) === (sliderControlsList.length - 1)) {
          sliderControlNext.setAttribute('disabled', 'true');
        }
        break;
      }
    }
});
