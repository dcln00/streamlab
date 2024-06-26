export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()

	function futureDate() {
		let future = new Date()
		future.setDate(future.getDate('') + 30)

		return future.toISOString().slice(0, 10).toString()
	}

	function currentDate() {
		let current = new Date()

		return current.toISOString().slice(0, 10).toString()
	}

	const popularMovies = await $fetch(`${config.apiBaseUrl}/discover/movie?api_key=${config.apiKey}&region=US&language=en-US&page=1&sort_by=popularity.desc&primary_release_date.lte=${currentDate()}`, {
		headers: {
			'Authorization': `Bearer ${config.apiKey}`
		}
	})

	const upcomingMovies = await $fetch(`${config.apiBaseUrl}/discover/movie?api_key=${config.apiKey}&include_adult=true&region=US&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&primary_release_date.gte=${currentDate()}&primary_release_date.lte=${futureDate()}`, {
		headers: {
			'Authorization': `Bearer ${config.apiKey}`
		}
	})

	const movieGenres = await $fetch(`${config.apiBaseUrl}/genre/movie/list?api_key=${config.apiKey}`, {
		headers: {
			'Authorization': `Bearer ${config.apiKey}`
		}
	})

	const trendingMovies = await $fetch(`${config.apiBaseUrl}/trending/movie/day?api_key=${config.apiKey}`, {
		headers: {
			'Authorization': `Bearer ${config.apiKey}`
		}
	})

	const popularTv = await $fetch(`${config.apiBaseUrl}/discover/tv?api_key=${config.apiKey}&with_origin_country=US|GB&without_genres=10763&language=en-US&page=1&sort_by=popularity.desc&first_air_date.gte=2022-06-01&first_air_date.lte=${currentDate()}`, {
		headers: {
			'Authorization': `Bearer ${config.apiKey}`
		}
	})

	const onTheAirTv = await $fetch(`${config.apiBaseUrl}/discover/tv?api_key=${config.apiKey}&with_origin_country=US|GB&without_genres=10763|10764&language=en-US&page=1&sort_by=popularity.desc&air_date.lte=${futureDate()}`, {
		headers: {
			'Authorization': `Bearer ${config.apiKey}`
		}
	})

	const curAirTv = await $fetch(`${config.apiBaseUrl}/discover/tv?api_key=${config.apiKey}&with_origin_country=US|GB&without_genres=10763&language=en-US&page=1&sort_by=popularity.desc&air_date.lte=${futureDate()}&air_date.gte=${currentDate()}`, {
		headers: {
			'Authorization': `Bearer ${config.apiKey}`
		}
	})

	return { popularMovies, upcomingMovies, movieGenres, trendingMovies, popularTv, onTheAirTv, curAirTv }
})