const fullscreen = {};
let listenAction;
fullscreen.install = Vue => {
  Vue.directive('fullscreen', {
    inserted(el, binding) {
      el.children[0].style.cssText = "width:" + el.parentElement.clientWidth + "px;";
      el.children[0].style.cssText += "height:" + el.parentElement.clientHeight + "px;";
      el.children[0].style.cssText += "left:" + el.parentElement.offsetLeft + "px;";
      el.children[0].style.cssText += "position: absolute;";
      el.children[0].style.cssText += "top:" + el.parentElement.offsetTop + "px;";
    },
    update(el) {

    },
    unbind() {

    }
  });
};

export default fullscreen;
