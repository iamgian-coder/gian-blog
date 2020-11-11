import VConole from 'vconsole';
export default (ctx) => {
  if (ctx.isDev) {
    new VConole();
  }
};
