'use strict';

/*================================================
 * 左侧菜单控制
 *===============================================*/
!function () {

  function getStyle(elem, css) {
    return !!window.getComputedStyle
      ? window.getComputedStyle(elem, false)[css]
      : elem.currentStyle[css];
  }

  function animate(elem, css, target, time, callback) {

    var _interval = 10,
      _cssCurrent = parseInt(getStyle(elem, css).match(/^[0-9-]+/)[0]),
      _unit = target.match(/[a-zA-Z%]+$/) === null ? '' : target.match(/[a-zA-Z%]+$/)[0],
      _cssTarget = parseInt(target.match(/^[0-9-]+/)[0]),
      _times = parseInt(time / _interval),
      _cssChange = (_cssTarget - _cssCurrent) / _times,
      _timer = 1;

    clearInterval(elem.animateInterval);

    elem.isAnimate = true;

    elem.animateInterval = setInterval(function () {
      if (_timer < _times) {
        elem.style[css] = (_cssCurrent + _cssChange * _timer) + _unit;
        _timer++;
      } else {
        elem.style[css] = target;
        clearInterval(elem.animateInterval);
        elem.isAnimate = false;
        !!callback && callback();
      }
    }, _interval);
  }

  var _openMenuBtn = document.getElementById('open-mobile-nav'),
    _menu = document.getElementById('mobile-nav-menu'),
    _mask = document.getElementById('mask');

  function showMenu() {
    _mask.style.display = 'block';
    _menu.style.display = 'block';
    animate(_mask, 'opacity', '1', 250);
    animate(_menu, 'left', '0%', 250);
  }

  function hideMenu() {
    animate(_mask, 'opacity', '0', 250, function () {
      _mask.style.display = 'none';
    });
    animate(_menu, 'left', '-280px', 250, function () {
      _menu.style.display = 'none';
    });
  }

  _openMenuBtn.onclick = function () {
    if (_menu.isAnimate || _mask.isAnimate) return false;
    showMenu();
  }

  _mask.onclick = function () {
    if (_menu.isAnimate || _mask.isAnimate) return false;
    hideMenu();
  }
}();
