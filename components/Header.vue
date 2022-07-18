<template>
  <header id="header">
    <div class="content">
      <nav class="navbar">
        <nuxt-link to="/" class="item">
          首页
          <svg class="icon icon-home">
            <use xlink:href="#icon-home"></use>
          </svg>
        </nuxt-link>
        <nuxt-link to="/archive" class="item">
          归档
          <svg class="icon icon-archive">
            <use xlink:href="#icon-archive"></use>
          </svg>
        </nuxt-link>
      </nav>
      <div class="navbar-extra">
        <div ref="labelTags" class="label-tag" @click.stop="toggleAsideTags">
          标签
          <svg class="icon icon-arrow-down2">
            <use xlink:href="#icon-arrow-down2"></use>
          </svg>
          <svg class="icon icon-arrow-up2">
            <use xlink:href="#icon-arrow-up2"></use>
          </svg>
        </div>

        <div ref="labelHot" class="label-hot" @click.stop="toggleAsideHot">
          热门
          <svg class="icon icon-fire">
            <use xlink:href="#icon-fire"></use>
          </svg>
        </div>

        <div
          ref="searchIcon"
          class="search-icon"
          @click.stop="toggleHeaderSearchForm"
        >
          <svg class="icon icon-search">
            <use xlink:href="#icon-search"></use>
          </svg>
          <svg class="icon icon-cross">
            <use xlink:href="#icon-cross"></use>
          </svg>
        </div>

        <div ref="searchFormContainer" class="form-container">
          <form
            ref="searchForm"
            class="search-form"
            role="search"
            @submit.prevent="fetchPostsByKeyword"
          >
            <input
              v-model="keyword"
              class="search-form__input"
              type="text"
              placeholder="输入关键字搜索"
              @focus.stop="addFocusClass"
              @blur.stop="removeFocusClass"
            />
            <input class="search-form__submit" type="submit" value="搜索" />
          </form>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data: () => {
    return {
      keyword: ''
    };
  },

  methods: {
    toggleAsideTags() {
      this.$store.dispatch('toggleAsideTags', this.$refs);
    },

    toggleAsideHot() {
      this.$store.dispatch('toggleAsideHot', this.$refs);
    },

    toggleHeaderSearchForm() {
      return this.$store.dispatch('toggleHeaderSearchForm', this.$refs);
    },

    fetchPostsByKeyword() {
      const keyword = this.keyword;
      if (!/^\s*$/.test(keyword)) {
        this.toggleHeaderSearchForm().then(() => {
          this.$router.push({
            path: `/search/${encodeURIComponent(keyword)}`
          });
        });
      }
    },

    addFocusClass() {
      this.$refs.searchForm.classList.add('focus');
    },

    removeFocusClass() {
      this.$refs.searchForm.classList.remove('focus');
    }
  }
};
</script>

<style lang="scss">
@media screen and (max-width: $header-breakpoint-1) {
  #header > .content {
    > .navbar > .item > .icon {
      display: none !important;
    }
    > .navbar-extra {
      > .label-tag,
      > .label-hot {
        > .icon {
          display: none !important;
        }
      }
    }
  }
}

#header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: $headerZIndex;
  width: 100%;
  height: $headerHeight;
  background-color: $componentBgc;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.48),
    0 6px 16px 0 rgba(0, 0, 0, 0.32), 0 9px 28px 8px rgba(0, 0, 0, 0.2);
  > .content {
    display: flex;
    max-width: $maxWidth;
    height: $headerHeight;
    margin: 0 auto;
    padding: 0 $gapSize * 2;
    font-size: $menuFS;
    line-height: $headerHeight;
    > .navbar {
      flex: 1 0 auto;
      display: flex;
      justify-content: space-evenly;
      > .item {
        // 之前内部加了h1标签
        flex: 1 1 auto;
        display: block;
        position: relative;
        text-align: center;
        > .icon-home,
        > .icon-archive {
          display: inline-block;
          position: relative;
          top: 3px;
        }
        > .icon-home {
          left: -6px;
        }
        > .icon-archive {
          left: -3px;
        }
        &::after {
          content: '';
          position: absolute;
          z-index: 2;
          width: 100%;
          height: $headerItemBottomLineHeight;
          left: 0;
          bottom: 0;
          @include bgiGradient;
          transition: all 0.2s;
          transform: scaleX(0);
        }
        &:hover,
        &.nuxt-link-exact-active {
          &::after {
            transform: scaleX(1);
          }
          > .icon {
            fill: $endColor;
          }
        }
        > h1 {
          margin: 0;
          font-size: 1.5rem;
        }
      }
    }
    > .navbar-extra {
      flex: 1 1 auto;
      display: flex;
      justify-content: center;
      > .label-tag,
      > .label-hot,
      > .search-icon {
        position: relative;
        text-align: center;
        &::after {
          content: '';
          position: absolute;
          z-index: 2;
          width: 100%;
          height: $headerItemBottomLineHeight;
          left: 0;
          bottom: 0;
          @include bgiGradient;
          transition: all 0.2s;
          transform: scaleX(0);
        }
        &:hover,
        &.active {
          &::after {
            transform: scaleX(1);
          }
        }
        &.active {
          > .icon {
            fill: $endColor;
          }
        }
      }
      > .label-tag {
        flex: 1 0 auto;
        cursor: pointer;
        > .icon-arrow-down2 {
          display: inline-block;
          position: relative;
          top: 3px;
          left: -6px;
        }
        > .icon-arrow-up2 {
          display: none;
        }
        &.active {
          > .icon-arrow-down2 {
            display: none;
          }
          > .icon-arrow-up2 {
            display: inline-block;
            position: relative;
            top: 3px;
            left: -6px;
          }
        }
      }
      > .label-hot {
        flex: 1 0 auto;
        cursor: pointer;
        > .icon-fire {
          display: inline-block;
          position: relative;
          top: 3px;
          left: -4px;
        }
        &.active {
          & > .icon-fire {
            fill: $endColor;
          }
        }
      }
      > .search-icon {
        flex: 0 0 auto;
        width: $searchIconWidth;
        font-size: $searchIconFS;
        cursor: pointer;
        > .icon-cross {
          display: none;
        }
        > .icon-search {
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        &.active {
          > .icon-search {
            display: none;
          }
          > .icon-cross {
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
      > .form-container {
        position: absolute;
        top: $headerHeight;
        left: 0;
        right: 0;
        z-index: 1;
        padding: 32px 16px;
        visibility: hidden;
        opacity: 0;
        transition: all 0.2s;
        transform: translateX(100%);
        &.active {
          visibility: visible;
          opacity: 1;
          @include boxShadow;
          background-color: rgba($componentBgc, 0.85);
          transform: translateX(0);
        }
        > .search-form {
          display: flex;
          height: $formHeight;
          padding: $formBorderWidth;
          font-size: $formFS;
          border-radius: $formBorderRadius;
          align-items: stretch;
          &:focus-within,
          &.focus {
            background-image: linear-gradient(to right, $beginColor, $endColor);
            > .search-form__input {
              border-color: transparent;
            }
          }
          > .search-form__input {
            flex: 1 1 auto;
            width: 100%;
            height: 100%;
            padding-left: 0.6em;
            font-size: $formFS;
            color: #fff;
            background-color: $componentBgc;
            border: 1px solid $borderColor;
            border-right: 0;
            outline: 0;
            outline: none;
            border-radius: $formBorderRadius 0 0 $formBorderRadius;
          }
          > .search-form__submit {
            flex: 0 1 auto;
            width: $formSubmitWidth;
            height: 100%;
            padding: 0 0.6em;
            font-size: $formFS;
            letter-spacing: 4px;
            color: #fff;
            @include bgiGradient(right);
            border: 0;
            outline: 0;
            outline: none;
            border-radius: 0 $formBorderRadius $formBorderRadius 0;
            cursor: pointer;
          }
        }
      }
    }
  }
}

@media screen and (min-width: $header-breakpoint-2) {
  #header > .content > .navbar-extra {
    > .search-icon {
      display: none;
    }
    > .form-container {
      display: flex;
      position: static;
      z-index: auto;
      padding: 0;
      visibility: visible;
      opacity: 1;
      transform: translateX(0);
      flex: 1 1 auto;
      align-items: center;
      > .search-form {
        flex: 1 1 auto;
      }
      &.active {
        background-color: transparent;
        box-shadow: none;
      }
    }
  }
}

@media screen and (min-width: $aside-breakpoint-1) {
  #header > .content > .navbar-extra {
    > .label-tag,
    > .label-hot {
      display: none;
    }
  }
}
</style>
