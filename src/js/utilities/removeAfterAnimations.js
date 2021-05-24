function autofocus () {
  const autofocusElement = document.querySelector('[autofocus]');
  autofocusElement && autofocusElement.focus();
}

function removeAfterAnimations (vnode) {
  vnode.dom.style.width = vnode.dom.offsetWidth + 'px';
  vnode.dom.style.height = vnode.dom.offsetHeight + 'px';
  vnode.dom.style.top = vnode.dom.offsetTop + 'px';
  vnode.dom.style.left = vnode.dom.offsetLeft + 'px';
  vnode.dom.style.position = 'fixed';

  vnode.dom.classList.add('exit');
  return new Promise(function (resolve) {
    vnode.dom.addEventListener('animationend', () => {
      setTimeout(autofocus);
      resolve();
    });
  });
}

module.exports = removeAfterAnimations;
