import Vue from 'vue';

import InfiniteLoading from 'vue-infinite-loading';

Vue.use(InfiniteLoading, {
  props: {
    distance: 300,
    spinner: 'default'
  },
  slots: {
    noMore: '就这些,没有啦😀',
    noResults: '奇怪,我找不到你要的呀😟'
  }
});
