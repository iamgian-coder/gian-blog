<template>
  <div class="archive-container">
    <div v-for="[year, value] in dataSource" :key="year" class="year">
      <p class="year-name">{{ year }}</p>
      <ul v-for="(v2, i2) in value[0]" :key="i2" class="mds">
        <li class="m">{{ getMonth(v2) }} - {{ v2 }}月</li>
        <li v-for="(v3, i3) in value[1][i2]" :key="i3" class="d">
          <nuxt-link :to="`/article/${v3._id}`" class="c">
            <span class="date">{{ v3.postAt.substring(5, 10) }}</span>
            <span class="title">{{ v3.title }}</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const MONTHS = [
  null,
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const gqlArticleArchives = `query articleArchives {
  getArticleArchives {
    _id {
      year
      month
    }
    docs {
      _id
      title
      postAt
    }
  }
}`;

const aggregateData = (data) => {
  if (data) {
    const finalMap = new Map();
    for (const item of data) {
      const { year, month } = item._id;
      const docs = item.docs;
      let mda = finalMap.get(year);
      if (mda) {
        mda[0].push(month);
        mda[1].push(docs);
      } else {
        mda = [[], []];
        mda[0].push(month);
        mda[1].push(docs);
        finalMap.set(year, mda);
      }
    }
    return finalMap;
  }
};

export default {
  asyncData({ $axios, $apipathMain, error }) {
    return $axios
      .$post($apipathMain, {
        query: gqlArticleArchives
      })
      .then(({ data }) => {
        return {
          dataSource: aggregateData(data.getArticleArchives)
        };
      })
      .catch((err) => {
        const code = parseInt(err.response && err.response.status);
        error({ statusCode: code });
      });
  },

  data() {
    return {
      dataSource: {}
    };
  },

  methods: {
    getKey(item) {
      const { year, month } = item._id;
      return year + month;
    },

    getMonth(key) {
      return MONTHS[key];
    }
  }
};
</script>

<style lang="scss">
/* IE9 , IE10 ,IE11 rule sets go here */
@media screen and (min-width: 0\0) {
  .archive-container {
    > .year {
      > .mds {
        > .d {
          &:hover {
            > .c {
              > .title {
                background-image: none !important;
                background-clip: unset !important;
              }
            }
          }
        }
      }
    }
  }
}
.archive-container {
  padding: $gapSize * 2;
  border-radius: 8px;
  background-color: $componentBgc;
  @include borderRadius;
  @include boxShadow;
  > .loading {
    @keyframes skeleton-loading {
      0% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0 50%;
      }
    }
    > div {
      margin: 8px 0;
      width: 90%;
      &:nth-of-type(2n + 1) {
        width: 75%;
      }
      &:last-of-type {
        width: 50%;
      }
      height: 0.6rem;
      background-image: linear-gradient(
        90deg,
        rgba(211, 211, 211, 0.8) 0,
        rgba(211, 211, 211, 0) 25%,
        rgba(211, 211, 211, 0.8) 50%,
        rgba(211, 211, 211, 0)
      );
      background-size: 400% 100%;
      background-position: 100% 50%;
      animation: skeleton-loading 1.4s ease infinite;
    }
  }
  > .year {
    &:not(:last-of-type) {
      margin-bottom: $gapSize * 2;
      padding-bottom: $gapSize * 2;
      border-bottom: 1px solid $borderColor;
    }
    > .year-name {
      font-size: 18px;
      font-weight: bold;
    }
    > .mds {
      padding: 0;
      > .m {
        margin-bottom: $gapSize;
        padding-left: 0.5em;
        font-size: 16px;
        line-height: 2em;
        font-weight: bold;
      }
      > .d {
        margin-bottom: $gapSize * 2;
        padding-left: 1em;
        font-size: 16px;
        > .c {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          > .date {
            flex: 0 0 auto;
            padding: 4px 7px;
            border-radius: 4px;
            background-color: rgba($postContentColor, 0.5);
          }
          > .title {
            flex: 0 1 auto;
            position: relative;
            padding-left: $gapSize;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        &:hover {
          > .c {
            > .date {
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
}
</style>
