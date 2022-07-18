<template>
  <footer id="footer">
    <address>
      <p>All rights reserved</p>
      <p>Code by <a href="/">Gian</a></p>
      <p>
        Copyright&copy;&nbsp;2019&nbsp;
        <a href="/">I'm Gian</a>
      </p>
    </address>
  </footer>
</template>

<style lang="scss">
#footer {
  position: relative;
  margin-top: $gapSize * 4;
  padding: 1em;
  text-align: center;
  color: $postContentColor;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    @include bgiGradient(right);
  }
  > address {
    > p {
      line-height: 1.8;
      > a {
        @include textGradient;
        /* IE9 , IE10 ,IE11 rule sets go here */
        @media screen and (min-width: 0\0) {
          background-image: none !important;
          background-clip: unset !important;
        }
      }
    }
  }
}
</style>
