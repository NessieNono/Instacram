const getIds = Promise.all([fetch(), fetch(), fetch()])
const locations = [1, 2, 4, 7, 9]
const requests = locations.map((n) => api.getUserPost(userId, n))

Promise.all(requests).then(

	)