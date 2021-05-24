function resizeToViewport () {
  visualViewport && visualViewport.addEventListener('resize', function () {
    if (visualViewport.height < (screen.availHeight - (screen.availHeight * 0.10))) {
      document.body.classList.add('lessThanViewportHeight');
    } else {
      document.body.classList.remove('lessThanViewportHeight');
    }

    const element = document.body.querySelector('.wrapper');
    if (element) {
      element.style.height = window.visualViewport.height + 'px';
    }
    element.scrollTop = 0;
  });
}

module.exports = resizeToViewport;
