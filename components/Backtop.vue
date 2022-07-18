<template>
  <svg id="backtop" class="icon" @click.stop="backtop">
    <use xlink:href="#icon-arrow-up2" />
  </svg>
</template>

<script>
export default {
  mounted() {
    window.addEventListener('scroll', this.throttle(this.toggleBacktop));
  },

  methods: {
    throttle(fn, cycle) {
      let previous = 0;
      let timer;
      const fnCallTarget = (oThis = null, args = []) => {
        previous = +new Date();
        fn.apply(oThis, args);
      };
      return (...args) => {
        if (!previous) {
          fnCallTarget(null, args);
        } else {
          clearTimeout(timer);
          const now = +new Date();
          const elapse = now - previous;
          if (elapse >= cycle) {
            fnCallTarget(null, args);
          } else {
            timer = setTimeout(fnCallTarget, cycle - elapse);
          }
        }
      };
    },

    toggleBacktop() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const target = document.getElementById('backtop');
      let classNameString = 'icon';
      if (scrollTop >= 500) {
        classNameString += ' active';
      }
      target.setAttribute('class', classNameString);
    },

    scrollYTo(position) {
      let currentScrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (cb) => {
          return setTimeout(cb, 17);
        };
      }
      const step = () => {
        const distance = position - currentScrollTop;
        if (Math.abs(distance) > 1) {
          currentScrollTop = currentScrollTop + distance / 5;
          window.scrollTo(0, currentScrollTop);
          requestAnimationFrame(step);
        } else {
          window.scrollTo(0, position);
        }
      };
      step();
    },

    backtop() {
      this.scrollYTo(0);
    }
  }
};
</script>

<style lang="scss">
#backtop {
  position: fixed;
  z-index: $toTopZIndex;
  right: -16px;
  bottom: 100px;
  width: 40px;
  height: 40px;
  padding: 8px;
  font-size: $toTopFS;
  @include bgiGradient(top);
  border-radius: 50%;
  visibility: hidden;
  opacity: 0;
  cursor: pointer;
  transition: right 0.3s, visibility 0.3s, opacity 0.3s;
  &.active {
    right: 40px !important;
    visibility: visible !important;
    opacity: 1 !important;
  }
}
</style>
