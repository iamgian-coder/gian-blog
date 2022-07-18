// Inject $apipathMain in Vue, context and store.
export default ({ $config }, inject) => {
  inject('apipathMain', $config.apipathMain)
  inject('apipathViews', $config.apipathViews)
  inject('apipathLiked', $config.apipathLiked)
}
