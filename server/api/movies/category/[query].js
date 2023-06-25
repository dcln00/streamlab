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

	const popular =  $fetch(`${config.apiBaseUrl}/discover/movie?api_key=${config.apiKey}&region=US&language=en-US&page=1&sort_by=popularity.desc&primary_release_date.lte=${currentDate()}`, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${config.apiKey}`
		}
	})

	const trending =  $fetch(`${config.apiBaseUrl}/${query}/movie/day?api_key=${config.apiKey}`, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${config.apiKey}`
		}
	})

	const upcoming =  $fetch(`${config.apiBaseUrl}/discover/movie?api_key=${config.apiKey}&include_adult=true&region=US&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&primary_release_date.gte=${currentDate()}&primary_release_date.lte=${futureDate()}`, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${config.apiKey}`
		}
	})

	if(query === 'popular') {
		return popular
	} else if(query === 'trending') {
		return trending
	} else if(query === 'upcoming') {
		return upcoming
	} else {
		throw createError({
			statusCode: 404,
			statusMessage: 'Page Not Found',
		  })
	}
})