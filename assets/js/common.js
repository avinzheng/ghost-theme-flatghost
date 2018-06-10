/** ----------------------------------------------------------------------------
 * @desc    Common JS for theme FlatGhost
 * @author  Avin Cheng
 * @license MIT
 ** --------------------------------------------------------------------------*/
'use strict';

/**
 * Mobile Navigation
 */
!function () {
  var btn = document.getElementById('show-mobile-nav'),
    menu = document.getElementById('mobile-nav'),
    mask = document.getElementById('mobile-nav-mask'),
    inner = document.getElementById('mobile-nav-inner');

  // show nav
  btn.onclick = function () {
    menu.style.display = 'block';
    setTimeout(function () {
      mask.style.opacity = .35;
      inner.style.transform = 'translateX(0)';
      inner.style.webkitTransform = 'translateX(0)';
      inner.style.mozTransform = 'translateX(0)';
    }, 0);
  };

  // hide nav
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

/**
 * for Prism - A Syntax Highlight Tool
 * Must run before 'prism.js'
 */
(function () {
  var _pres = document.getElementsByTagName('pre');
  for (var i = 0, l = _pres.length; i < l; i ++) {
    _pres[i].className = 'line-numbers ' + _pres[i].className;
  }
}());
