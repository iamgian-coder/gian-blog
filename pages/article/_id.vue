<template>
  <article
    v-if="article"
    class="thearticle"
    :class="`flag${index}${article._id}`"
  >
    <after-bgc :index="index" :tail="article._id" />

    <h1 class="title">{{ article.title }}</h1>

    <div class="meta">
      <div class="tags">
        <nuxt-link
          v-for="(citem, cindex) in article.tags"
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
          {{ article.views || 0 }}
        </span>
        <span class="liked" @click.stop="like">
          <svg class="icon icon-thumb-up">
            <use xlink:href="#icon-thumb-up"></use>
          </svg>
          {{ article.liked || 0 }}
        </span>
        <time :datetime="`${article.postAt}`" class="date">
          <svg class="icon">
            <use xlink:href="#icon-date"></use>
          </svg>
          {{ article.postAt.substring(0, 10) }}
        </time>
      </div>
    </div>

    <div
      class="content markdown-body hljs"
      v-html="$md.render(article.markdown)"
    />

    <div class="actionbar">
      <div v-if="prevnext && prevnext.length" class="prevnext">
        <nuxt-link
          v-if="prevnext[0]"
          class="item"
          :title="prevnext[0].title"
          :to="prevnext[0]._id"
        >
          &lt;&lt;上一篇&nbsp;{{ prevnext[0].title }}
        </nuxt-link>
        <nuxt-link
          v-if="prevnext[1]"
          class="item"
          :title="prevnext[1].title"
          :to="prevnext[1]._id"
        >
          &gt;&gt;下一篇&nbsp;{{ prevnext[1].title }}
        </nuxt-link>
      </div>
      <div v-else class="prevnext">暂无</div>
      <div class="thumb" :class="{ didL: didL }" @click.stop="likeById">
        <transition name="in-out-translate-fade" mode="in-out">
          <span :key="didL" class="liked">
            {{ didL ? '已赞' : '给赞' }}
          </span>
        </transition>
        <svg class="icon">
          <use xlink:href="#icon-thumb-up"></use>
        </svg>
      </div>
    </div>
  </article>
</template>

<script>
import AfterBgc from '~/components/ItemAfterBgc';
import 'highlight.js/styles/monokai.css';

import '@/assets/sass/md2css.scss';

const gqlArticleById = `query articleById($id: ID!) {
  getArticleById(id: $id) {
    _id
    title
    postAt
    views
    liked
    tags
    markdown
  }
}`;

const gqlArticlePrevNext = `query articlePrevNext($id: ID!) {
  getPrevNextRelated(id: $id) {
    _id
    title
  }
}`;

const DIDLS = 'DIDLS';

export default {
  components: {
    AfterBgc
  },

  async asyncData({ $axios, $apipathMain, req, params, error }) {
    const { id } = params;
    const p1 = $axios
      .$post($apipathMain, {
        query: gqlArticleById,
        variables: { id }
      })
      .then(({ data }) => {
        const article = data.getArticleById;
        if (article) {
          return { ok: true, article };
        }
        return { statusCode: 404 };
      });

    const p2 = $axios
      .$post($apipathMain, {
        query: gqlArticlePrevNext,
        variables: { id }
      })
      .then(({ data }) => {
        const prevnext = data.getPrevNextRelated;
        return { prevnext };
      });

    const result = await Promise.all([p1, p2]).catch((err) => {
      const code = parseInt(err.response && err.response.status);
      error({ statusCode: code });
    });

    const [p1r, p2r] = result;

    if (p1r.ok) {
      return { article: p1r.article, prevnext: p2r.prevnext };
    }

    error({ statusCode: p1r.statusCode });
  },

  data() {
    return {
      article: null,
      prevnext: [],
      didL: false,
      index: 0
    };
  },

  validate({ params }) {
    return !!params.id;
  },

  mounted() {
    if (this.article) {
      this.$axios.post(`${this.$apipathViews}/${this.article._id}`);
    }
    this.didL = this.checkDidL();
  },

  methods: {
    checkDidL() {
      const idsStr = localStorage.getItem(DIDLS);
      const idsArray = idsStr ? idsStr.split(':') : [];
      if (!idsArray.length) {
        return false;
      }
      return idsArray.includes(this.article._id);
    },

    addToIdList() {
      const idsStr = localStorage.getItem(DIDLS);
      if (!idsStr) {
        localStorage.setItem(DIDLS, this.article._id);
      } else {
        localStorage.setItem(DIDLS, idsStr + ':' + this.article._id);
      }
    },

    removeFromList() {
      const idsStr = localStorage.getItem(DIDLS);
      if (idsStr) {
        const idsArray = idsStr.split(':');
        const index = idsArray.indexOf(this.article._id);
        if (index > -1) {
          idsArray.splice(index, 1);
          localStorage.setItem(DIDLS, idsArray.join(':'));
        }
      }
    },

    likeById() {
      if (this.didL) {
        this.$axios
          .post(`${this.$apipathLiked}/${this.article._id}/m`)
          .then(() => {
            this.didL = false;
            this.removeFromList();
          });
      } else {
        this.$axios
          .post(`${this.$apipathLiked}/${this.article._id}/i`)
          .then(() => {
            this.didL = true;
            this.addToIdList();
          });
      }
    }
  }
};
</script>

<style lang="scss">
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-10px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(10px);
  }
}
.thearticle {
  position: relative;
  z-index: 2;
  padding: $gapSize * 2;
  @include borderRadius;
  @include boxShadow;
  background-color: $componentBgc;
  > .markdown-body {
    .table-of-contents {
      &::before {
        display: block;
        font-size: 24px;
        font-weight: bold;
        content: '文章目录';
      }
      ol,
      dl,
      ul {
        counter-reset: item;
      }
      li {
        display: block;
        &::before {
          content: counters(item, '.');
          counter-increment: item;
        }
      }
      .nav-link-title {
        &:hover {
          text-decoration: none !important;
          @include textGradient;
        }
      }
    }
  }
  > .title {
    margin-bottom: 0;
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
          width: 0;
          height: 0;
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
  > .content {
    margin-top: $gapSize * 2;
    color: $postContentColor;
    background-color: rgba($componentBgc, 0.25);
  }
  > .actionbar {
    display: flex;
    height: 64px;
    justify-content: space-between;
    align-items: center;
    > .prevnext {
      color: $postContentColor;
      > .item {
        display: -webkit-box;
        position: relative;
        left: 0;
        height: 32px;
        line-height: 32px;
        font-weight: 500;
        color: inherit;
        transition: left 0.2s;

        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        &:hover {
          left: 8px;
          @include textGradient;
        }
      }
    }
    > .thumb {
      position: relative;
      z-index: 1;
      top: 10px;
      width: 64px;
      height: 64px;
      text-align: center;
      flex: 0 0 auto;
      cursor: pointer;
      > .liked {
        position: absolute;
        z-index: 1;
        top: -6px;
        left: 0;
        width: 64px;
        color: $postContentColor;
        font-weight: 500;
        text-align: center;
      }
      > .icon {
        position: absolute;
        z-index: 1;
        top: 50%;
        left: 50%;
        width: 32px;
        height: 32px;
        transform: translate(-50%, -50%);
        fill: $postContentColor;
      }
      &:not(.didL):hover {
        > .liked {
          animation: shake 1s 1;
        }
      }
      &.didL {
        > .icon {
          fill: $endColor;
        }
      }
    }
    .in-out-translate-fade-enter-active,
    .in-out-translate-fade-leave-active {
      transition: all 0.3s;
    }
    .in-out-translate-fade-enter,
    .in-out-translate-fade-leave-active {
      opacity: 0;
    }
    .in-out-translate-fade-enter {
      transform: translateX(3em);
    }
    .in-out-translate-fade-leave-active {
      transform: translateX(-3em);
    }
  }
  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-position: 0 0;
    background-size: cover;
    background-repeat: no-repeat;
    @include borderRadius;
    @include boxShadow;
  }
}
</style>
