const center = {};
let listenAction;
center.install = Vue => {
  Vue.directive('center', {
    inserted(el, binding) {


    },
    update(el) {
      el.children[0].style.cssText += "top:" + (document.documentElement.clientHeight - el.clientHeight) / 2 + "px;";
    },
    unbind() {

    }
  });
};

export default center;
