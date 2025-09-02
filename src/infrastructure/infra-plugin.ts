import Infrastructure from './index';

export default {
  install: function (Vue: any) {
    Vue.config.globalProperties.$infra = Infrastructure;
    Vue.provide('infra', Infrastructure);
  },
};
