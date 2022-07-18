import VConole from 'vconsole'
export default (ctx) => {
  if (ctx.isDev) {
    // eslint-disable-next-line no-new
    new VConole()
  }
}
