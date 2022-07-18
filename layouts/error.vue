<template>
  <div class="error-wrapper">
    <div class="status-code">
      <span v-for="(value, index) in numbers" :key="index">{{ value }}</span>
    </div>
    <div class="status-des">
      {{ description }}
    </div>
    <div class="backhome">
      <nuxt-link to="/">返回首页</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line
  props: ['error'],

  layout: 'default',

  computed: {
    statusCode() {
      const { error } = this;
      return (error && error.statusCode) || 500;
    },

    numbers() {
      return ('' + this.statusCode).split('');
    },

    description() {
      const statusCode = this.statusCode;
      return statusCode === 404
        ? '奇怪,我找不到你要的呀😟'
        : statusCode >= 400 && statusCode < 500
        ? '等等,查询参数有问题呀😮'
        : '抱歉,我遇到一些意外的情况😭';
    }
  }
};
</script>

<style lang="scss">
.error-wrapper {
  font-size: 24px;
  color: $textColor;
  text-align: center;
  > .status-code {
    font-size: 150px;
    font-weight: bold;
    > span {
      text-shadow: 0px 0px 2px #686868, 0px 1px 1px #ddd, 0px 2px 1px #d6d6d6,
        0px 3px 1px #ccc, 0px 4px 1px #c5c5c5, 0px 5px 1px #c1c1c1,
        0px 6px 1px #bbb, 0px 7px 1px #777, 0px 8px 3px rgba(100, 100, 100, 0.4),
        0px 9px 5px rgba(100, 100, 100, 0.1),
        0px 10px 7px rgba(100, 100, 100, 0.15),
        0px 11px 9px rgba(100, 100, 100, 0.2),
        0px 12px 11px rgba(100, 100, 100, 0.25),
        0px 13px 15px rgba(100, 100, 100, 0.3);
      transition: all 0.1s linear;
      &:hover {
        text-shadow: 0px 0px 2px #686868, 0px 1px 1px #fff, 0px 2px 1px #fff,
          0px 3px 1px #fff, 0px 4px 1px #fff, 0px 5px 1px #fff, 0px 6px 1px #fff,
          0px 7px 1px #777, 0px 8px 3px #fff, 0px 9px 5px #fff,
          0px 10px 7px #fff, 0px 11px 9px #fff, 0px 12px 11px #fff,
          0px 13px 15px #fff;
      }
    }
  }
  > .status-des {
    line-height: 2em;
  }
  > .backhome {
    display: block;
    padding-top: 30px;
    font-weight: bold;
    > a {
      display: inline-block;
      &:hover {
        @include textGradient;
      }
    }
  }
}
</style>
