const gqlArticleTags = `query allArticleTags {
  getArticleTags {
    name
    related
  }
}
`

const gqlHotArticles = `query hotArticles($limit: Int!) {
  getHotArticles(limit: $limit) {
    _id
    title
  }
}
`

const showTagsCount = 10

const hotArticlesCount = 5

export const state = () => ({
  allTags: [],
  hotArticles: [],
  tagsNo: 0,
  tagsShouldShow: false,
  hotShouldShow: false,
})

export const mutations = {
  setAllTags(state, payload) {
    state.allTags = payload
  },

  setHotArticles(state, payload) {
    state.hotArticles = payload
  },

  increaseTagsNo(state) {
    state.tagsNo += 1
  },

  decreaseTagsNo(state) {
    state.tagsNo -= 1
  },

  resetTagsNo(state) {
    state.tagsNo = 0
  },

  toggleTagsShouldShow(state) {
    state.tagsShouldShow = !state.tagsShouldShow
  },

  toggleHotShouldShow(state) {
    state.hotShouldShow = !state.hotShouldShow
  },
}

export const actions = {
  nuxtServerInit({ dispatch }) {
    return Promise.all([
      dispatch('getAllTags'),
      dispatch('getHotArticles'),
    ]).catch((err) => {
      console.log(err)
    })
  },

  getAllTags({ commit }) {
    return this.$axios
      .$post(this.$apipathMain, {
        query: gqlArticleTags,
      })
      .then(({ data }) => {
        commit('setAllTags', data.getArticleTags)
      })
  },

  getHotArticles({ commit }) {
    return this.$axios
      .$post(this.$apipathMain, {
        query: gqlHotArticles,
        variables: {
          limit: hotArticlesCount,
        },
      })
      .then(({ data }) => {
        commit('setHotArticles', data.getHotArticles)
      })
  },

  async toggleAsideTags({ dispatch, commit, state }, payload) {
    const { labelTags, searchIcon } = payload
    const { hotShouldShow } = state
    if (hotShouldShow) {
      await dispatch('toggleAsideHot', payload)
    }
    if (searchIcon.classList.contains('active')) {
      await dispatch('toggleHeaderSearchForm', payload)
    }
    labelTags.classList.toggle('active')
    commit('toggleTagsShouldShow')
  },

  async toggleAsideHot({ dispatch, commit, state }, payload) {
    const { labelHot, searchIcon } = payload
    const { tagsShouldShow } = state
    if (tagsShouldShow) {
      await dispatch('toggleAsideTags', payload)
    }
    if (searchIcon.classList.contains('active')) {
      await dispatch('toggleHeaderSearchForm', payload)
    }
    labelHot.classList.toggle('active')
    commit('toggleHotShouldShow')
  },

  async toggleHeaderSearchForm({ dispatch, state }, payload) {
    const { searchIcon, searchFormContainer, searchForm } = payload
    const { tagsShouldShow, hotShouldShow } = state
    if (tagsShouldShow) {
      await dispatch('toggleAsideTags', payload)
    }
    if (hotShouldShow) {
      await dispatch('toggleAsideHot', payload)
    }
    searchIcon.classList.toggle('active')
    const isShowForm = searchFormContainer.classList.toggle('active')
    if (isShowForm) {
      const fnSetFormInputFocus = () => {
        searchForm.children[0].focus()
      }
      setTimeout(() => {
        fnSetFormInputFocus()
      }, 200)
    }
  },
}

export const getters = {
  showActions: ({ allTags }) => allTags && allTags.length > showTagsCount,

  tags: ({ allTags, tagsNo }) => {
    return allTags.slice(tagsNo * showTagsCount, (tagsNo + 1) * showTagsCount)
  },

  allTagsNo: ({ allTags }) => Math.ceil(allTags.length / showTagsCount),
}
