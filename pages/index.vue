<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="articles-container">
    <article
      v-for="(item, index) in response.docs"
      :key="index"
      class="article"
      :class="`flag${index}home`"
    >
      <after-bgc :index="index" tail="home" />
      <nuxt-link :to="`/article/${item._id}`" class="title">
        <h2>{{ item.title }}</h2>
      </nuxt-link>
      <nuxt-link
        :to="`/article/${item._id}`"
        class="content"
        v-html="item.markdown"
      />
      <div class="meta">
        <div class="tags">
          <nuxt-link
            v-for="(citem, cindex) in item.tags"
            :key="cindex"
            :to="`/tag/${citem}`"
            class="tag"
          >
            <span class="circle"></span>
            {{ citem }}
          </nuxt-link>
        </div>
        <div class="vld">
          <span class="views">
            <svg class="icon icon-eye">
              <use xlink:href="#icon-eye"></use>
            </svg>
            {{ item.views || 0 }}
          </span>
          <span class="liked">
            <svg class="icon icon-thumb-up">
              <use xlink:href="#icon-thumb-up"></use>
            </svg>
            {{ item.liked || 0 }}
          </span>
          <time :datetime="`${item.postAt}`" class="date">
            <svg class="icon">
              <use xlink:href="#icon-date"></use>
            </svg>
            {{ item.postAt.substring(0, 10) }}
          </time>
        </div>
      </div>
    </article>
    <client-only>
      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </client-only>
  </div>
</template>

<script>
import AfterBgc from '~/components/ItemAfterBgc'

const gqlArticlesByPage = `query articlesByPage($page: Int!, $limit: Int!) {
  getArticlesByPage(page: $page, limit: $limit, where: {}, sort: {}) {
    docs {
      _id
      title
      markdown
      tags
      views
      liked
      postAt
    }
    totalDocs
    page
    limit
    hasNextPage
    nextPage
  }
}
`

const limit = 10

export default {
  components: {
    AfterBgc,
  },

  asyncData({ $axios, $apipathMain, error }) {
    return $axios
      .$post($apipathMain, {
        query: gqlArticlesByPage,
        variables: {
          page: 1,
          limit,
        },
      })
      .then(({ data }) => {
        return { response: data.getArticlesByPage }
      })
      .catch((err) => {
        const code = parseInt(err.response && err.response.status)
        error({ statusCode: code })
      })
  },

  data() {
    return {
      response: {},
    }
  },

  mounted() {
    this.response.docs.forEach((doc) => {
      doc.markdown = this.$md.render(doc.markdown)
    })
  },

  methods: {
    async infiniteHandler($state) {
      const { hasNextPage, nextPage, limit, docs, totalDocs } = this.response
      const { $axios, $apipathMain } = this
      if (hasNextPage) {
        const { data } = await $axios.$post($apipathMain, {
          query: gqlArticlesByPage,
          variables: {
            page: nextPage,
            limit,
          },
        })
        const response = data.getArticlesByPage
        const { docs: newDocs, ...others } = response
        this.response = { docs: docs.concat(newDocs), ...others }
        $state.loaded()
        if (!response.hasNextPage) {
          $state.complete()
        }
      } else {
        totalDocs && $state.loaded()
        $state.complete()
      }
    },
  },
}
</script>

<style lang="scss">
/* IE9 , IE10 ,IE11 rule sets go here */
@media screen and (min-width: 0\0) {
  .articles-container {
    > .article {
      &:hover {
        > .title {
          background-image: none !important;
          background-clip: unset !important;
        }
      }
    }
  }
}
.articles-container {
  > .article {
    position: relative;
    z-index: 2;
    margin-bottom: $gapSize * 2;
    padding: $gapSize * 2;
    background-color: $componentBgc;
    @include borderRadius;
    @include boxShadow;
    &::before,
    &::after {
      content: '';
      position: absolute;
      opacity: 0.5;
    }
    &::before {
      z-index: -2;
      top: 8px;
      left: 8px;
      width: 50px;
      height: 50px;
      background: radial-gradient(
          circle farthest-side at 0 0,
          $beginColor,
          $beginColor 49%,
          $endColor 50%,
          $componentBgc 95%,
          $componentBgc
        )
        0 0 / cover no-repeat;
      @include borderRadius;
    }
    &::after {
      z-index: -1;
      top: 58px;
      left: 8px;
      width: calc(100% - 8px - 8px);
      height: calc(100% - 58px - 1px);
      background-position: 0 0;
      background-size: cover;
      background-repeat: no-repeat;
    }
    > .title {
      display: inline-block;
      font-size: $postTitleFS;
    }
    > .content {
      display: -webkit-box;
      position: relative;
      z-index: 2;
      overflow: hidden;
      font-size: $postContentFS;
      color: $postContentColor;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      word-break: break-word;
    }
    > .meta {
      display: flex;
      font-size: $postMetaFS;
      flex-direction: column;
      justify-content: center;
      > .tags {
        display: flex;
        margin-top: $gapSize * 2;
        padding-left: $gapSize * 2 - 2px;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: center;
        align-content: center;
        > .tag {
          position: relative;
          margin-bottom: 16px;
          margin-right: 32px;
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
        }
      }
      > .vld {
        color: $postContentColor;
        > .views,
        > .liked,
        > .date {
          display: inline-flex;
          align-items: center;
          > .icon {
            margin-right: 4px;
          }
        }
        > .views,
        > .liked {
          float: left;
          margin-right: $gapSize * 2;
        }
        > .date {
          float: right;
        }
      }
    }
    &:hover {
      > .title {
        @include textGradient;
      }
      &::before,
      &::after {
        opacity: 1;
      }
    }
  }
}
</style>
