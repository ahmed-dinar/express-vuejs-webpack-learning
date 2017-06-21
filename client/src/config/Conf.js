

export default {
	install(Vue, config){
	  Vue.mixin({
	    created: function () {
	      this.$config = config;
	    }
	  });
	}
};