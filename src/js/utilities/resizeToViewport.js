function resizeToViewport () {
  visualViewport && screen && screen.orientation && visualViewport.addEventListener('resize', function () {
    if (visualViewport.height < (screen.availHeight - (screen.availHeight * 0.10))) {
      document.body.classList.add('lessThanViewportHeight');
    } else {
      document.body.classList.remove('lessThanViewportHeight');
    }

    const fixedHeight = window.visualViewport.height + 'px';

    document.documentElement.style.height = fixedHeight;
    document.documentElement.style.minHeight = fixedHeight;
    document.documentElement.style.maxHeight = fixedHeight;

    document.body.style.height = fixedHeight;
    document.body.style.minHeight = fixedHeight;
    document.body.style.maxHeight = fixedHeight;

    const element = document.body.querySelector('.wrapper');
    if (element) {
      element.style.height = fixedHeight;
      element.style.minHeight = fixedHeight;
      element.style.maxHeight = fixedHeight;
    }

    document.activeElement.scrollIntoView();
    document.documentElement.scrollTop = 0;
  });
}

module.exports = resizeToViewport;
