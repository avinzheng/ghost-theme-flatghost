/**
 * @author  Avin Cheng
 * @desc    Common JS for theme FlatGhost.
 * @license MIT
 */
'use strict';

/**
 * Mobile Menu
 */
!function () {
  var btn = document.getElementById('show-mobile-menu'),
    menu = document.getElementById('mobile-menu'),
    mask = document.getElementById('menu-mask'),
    inner = document.getElementById('menu-inner');

  // show menu
  btn.onclick = function () {
    menu.style.display = 'block';
    setTimeout(function () {
      mask.style.opacity = .35;
      inner.style.transform = 'translateX(0)';
      inner.style.webkitTransform = 'translateX(0)';
      inner.style.mozTransform = 'translateX(0)';
    }, 0);
  };

  // hide menu
  mask.onclick = function () {
    mask.style.opacity = .01;
    inner.style.transform = 'translateX(-280px)';
    inner.style.webkitTransform = 'translateX(-280px)';
    inner.style.mozTransform = 'translateX(-280px)';
    setTimeout(function () {
      menu.style.display = 'none';
    }, 280);
  };
}();
