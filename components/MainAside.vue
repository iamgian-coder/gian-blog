<template>
  <div class="main-aside-container" @click="slideUpAfterClick">
    <main id="main">
      <nuxt />
    </main>
    <aside
      id="aside"
      :class="{ 'tags-active': tagsShouldShow, 'hot-active': hotShouldShow }"
    >
      <div class="hot-articles">
        <div class="tip">
          <div class="title">
            <svg class="icon icon-fire">
              <use xlink:href="#icon-fire"></use>
            </svg>
            热门文章
          </div>
        </div>
        <div class="line"></div>
        <ul class="articles">
          <li v-for="(item, index) in hotArticles" :key="index" class="post">
            <nuxt-link :to="`/article/${item._id}`" class="item">
              <span class="index">{{ index + 1 }}</span>
              <span class="title">{{ item.title }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="tags-container">
        <div class="tip">
          <span class="title">
            <svg class="icon icon-tags">
              <use xlink:href="#icon-tags"></use>
            </svg>
            标签
          </span>
          <div v-if="showActions" class="action">
            <button
              :disabled="tagsNo >= allTagsNo - 1"
              @click.stop="increaseTagsNo"
            >
              下一批
            </button>
            <button :disabled="tagsNo === 0" @click.stop="decreaseTagsNo">
              上一批
            </button>
            <button :disabled="tagsNo === 0" @click.stop="resetTagsNo">
              重置
            </button>
          </div>
        </div>
        <div class="line"></div>
        <div class="tags">
          <nuxt-link v-if="tags.length" to="/" class="tag">
            <span class="circle"></span>
            <span class="name">最新</span>
          </nuxt-link>
          <nuxt-link
            v-for="(item, index) in tags"
            :key="index"
            :to="`/tag/${item.name}`"
            class="tag"
          >
            <span class="circle"></span>
            <span class="name">{{ item.name }}</span>
            <span class="related">{{ item.related }}</span>
          </nuxt-link>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex';

export default {
  props: {
    propRefs: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  computed: {
    ...mapState(['tagsNo', 'hotArticles', 'tagsShouldShow', 'hotShouldShow']),

    ...mapGetters(['showActions', 'tags', 'allTagsNo'])
  },

  methods: {
    ...mapMutations(['increaseTagsNo', 'decreaseTagsNo', 'resetTagsNo']),

    slideUpAfterClick() {
      const payload = this.propRefs.myHeader.$refs;
      if (this.tagsShouldShow) {
        this.$store.dispatch('toggleAsideTags', payload);
      }
      if (this.hotShouldShow) {
        this.$store.dispatch('toggleAsideHot', payload);
      }
      if (payload.searchIcon.classList.contains('active')) {
        this.$store.dispatch('toggleHeaderSearchForm', payload);
      }
    }
  }
};
</script>

<style lang="scss">
#main {
  display: block;
  position: relative;
  z-index: $mainZIndex;
  margin: 0 auto;
  margin-top: $headerHeight;
  max-width: $maxWidth;
  padding: $gapSize * 2;
  padding-top: $gapSize * 2;
}
#aside {
  position: absolute;
  top: $headerHeight;
  left: 0;
  z-index: $headerZIndex - 1;
  width: 100%;
  > .hot-articles,
  > .tags-container {
    display: block;
    position: fixed;
    top: $headerHeight;
    left: 0;
    width: 100%;
    padding: 0 $gapSize * 2;
    background-color: $componentBgc;
    transition: all ease-in 0.1s;
    transform: translateY(-100%);
    @include boxShadow;
    > .tip {
      padding-top: $gapSize * 2;
      > .title {
        display: flex;
        font-size: $tipTtleFS;
        font-weight: bold;
        align-items: center;
        > .icon {
          font-size: 2em;
        }
      }
    }
    > .line {
      display: block;
      margin-top: $gapSize * 2;
      border-top: 1px solid $borderColor;
    }
  }
  > .hot-articles {
    > .tip > .title > .icon-fire {
      fill: $endColor;
    }
    > .articles {
      margin: 0;
      padding: $gapSize * 2 0 $gapSize * 3 0;
      > .post {
        &:not(:first-of-type) {
          margin-top: $gapSize * 1.5;
        }
        > .item {
          display: flex;
          align-items: center;
          > .index {
            padding: 3px 8px;
            text-align: center;
            border-radius: 4px;
            background-color: rgba($postContentColor, 0.5);
          }
          > .title {
            padding-left: 8px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        &:hover {
          > .item {
            > .index {
              @include bgiGradient(bottom);
            }
            > .title {
              @include textGradient;
            }
          }
        }
      }
    }
  }
  > .tags-container {
    > .tip {
      > .title > .icon-tags {
        margin-right: 6px;
        fill: $endColor;
      }
      > .action {
        margin-top: $gapSize * 1.5;
        height: 30px;
        > button {
          &:not(:first-of-type) {
            margin-left: $gapSize;
          }
          padding: 8px 12px;
          font-size: $tagTipActionBtnFS;
          color: inherit;
          border: none;
          outline: none;
          border-radius: 4px;
          background-color: $tagTipActionBgc;
          cursor: pointer;
          &:disabled {
            color: $bodyBgc;
            cursor: not-allowed;
          }
          &:not(:disabled) {
            &:hover {
              @include bgiGradient(right);
            }
          }
        }
      }
    }
    > .tags {
      display: flex;
      margin-top: $gapSize * 2;
      padding-left: $gapSize * 2 - 2px;
      font-size: $postMetaFS;
      flex-flow: row wrap;
      justify-content: flex-start;
      align-items: center;
      align-content: center;
      > .tag {
        flex: 0 0 auto;
        position: relative;
        margin-bottom: $gapSize * 2;
        margin-right: max($postMetaFS * 2, $gapSize * 4);
        min-width: $postMetaFS * 2;
        height: $postMetaFS * 2;
        padding: 0 8px;
        line-height: $postMetaFS * 2;
        background-color: $postTagBgc;
        text-transform: uppercase;
        &::before,
        &::after {
          content: '';
          position: absolute;
          top: 0;
          z-index: 2;
          width: $postMetaFS;
          height: $postMetaFS * 2;
          border: $postMetaFS solid transparent;
          border-left: 0;
        }
        &::before {
          left: -$postMetaFS;
          border-color: transparent $postTagBgc;
        }
        &::after {
          right: -$postMetaFS;
          border-color: $postTagBgc transparent;
        }
        &.nuxt-link-exact-active,
        &:hover {
          &::before {
            border-color: transparent $beginColor;
          }
          &::after {
            border-color: $endColor transparent;
          }
          @include bgiGradient(right);
        }
        > .circle {
          position: absolute;
          z-index: 2;
          top: 50%;
          left: -2px;
          width: 6px;
          height: 6px;
          border: 1px solid $linkColor;
          border-radius: 50%;
          transform: translateY(-50%);
        }
        > .name,
        > .related {
          display: inline-block;
        }
      }
    }
  }
  &.tags-active {
    > .tags-container {
      transform: translateY(0);
    }
  }
  &.hot-active {
    > .hot-articles {
      transform: translateY(0);
    }
  }
}
@media screen and (min-width: $aside-breakpoint-1) {
  .app > .main-aside-container {
    display: flex;
    margin: 0 auto;
    max-width: $maxWidth;
    #main {
      flex: 1 1 auto;
      width: calc(70% - #{$gapSize} * 2);
    }
    #aside {
      flex: 0 0 auto;
      position: static;
      width: 30%;
      margin-top: $headerHeight;
      padding-right: $gapSize * 2;
      > .hot-articles,
      > .tags-container {
        transform: translateY(0);
        @include boxShadow;
        @include borderRadius;
      }
      > .hot-articles {
        position: static;
        margin: $gapSize * 2 0;
      }
      > .tags-container {
        position: sticky !important;
        top: $headerHeight + $gapSize * 2 !important;
        left: 0;
      }
    }
  }
}

/* IE9 , IE10 ,IE11 rule sets go here */
@media screen and (min-width: 0\0) {
  .app > .main-aside-container {
    #aside {
      > .hot-articles {
        > .articles {
          > .post {
            &:hover {
              > .item {
                > .title {
                  background-image: none !important;
                  background-clip: unset !important;
                }
              }
            }
          }
        }
      }
      > .tags-container {
        position: relative;
        top: 0 !important;
      }
    }
  }
}
</style>
