<template>
  <style>
    .flag{{index}}{{tail}}::after {
      background-image: radial-gradient(
          circle farthest-side at 50% 50%,
          hsla(0, 0%, 0%, 0.75),
          hsl(0, 0%, 0%) 75%,
          hsl(0, 0%, 8.2%)
        ),
        url('/img/demo.jpg');
      background-position: center,-80px -80px;
    }
  </style>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0
    },
    tail: {
      type: String,
      default: ''
    }
  }
};
</script>
