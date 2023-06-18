export default defineEventHandler((event) => {
	const query = [...event.node.req.url.split('/')].pop()
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

	const popular =  $fetch(`${config.apiBaseUrl}/discover/tv?api_key=${config.apiKey}&with_origin_country=US|GB&without_genres=10763&language=en-US&page=1&sort_by=popularity.desc&first_air_date.gte=2022-06-01&first_air_date.lte=${currentDate()}`, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${config.apiKey}`
		}
	})

	const onTheAirTv =  $fetch(`${config.apiBaseUrl}/discover/tv?api_key=${config.apiKey}&with_origin_country=US|GB&without_genres=10763|10764&language=en-US&page=1&sort_by=popularity.desc&air_date.lte=${futureDate()}`, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${config.apiKey}`
		}
	})

	const curAirTv =  $fetch(`${config.apiBaseUrl}/discover/tv?api_key=${config.apiKey}&with_origin_country=US|GB&without_genres=10763&language=en-US&page=1&sort_by=popularity.desc&air_date.lte=${futureDate()}&air_date.gte=${currentDate()}`, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${config.apiKey}`
		}
	})

	if(query === 'popular') {
		return popular
	} else if(query === 'airing') {
		return curAirTv
	} else if(query === 'today') {
		return onTheAirTv
	} else {
		throw createError({
			statusCode: 404,
			statusMessage: 'Page Not Found',
			fatal: true
		  })
	}
})