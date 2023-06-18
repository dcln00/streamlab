export default {
	scrollBehavior() {
	  return { top: 0 }
	},

	// routes: (_routes) => [
	// 	{
	// 	  name: 'home',
	// 	  path: '/',
	// 	  component: () => import('~/pages/index.vue').then(r => r.default || r)
	// 	}, 
	// 	{
	// 		name: 'movie',
	// 		path: `/movie/${routes.params}`,
	// 		component: () => import('~/pages/movie/:[id].vue')
	// 	}
	//   ],
  }