export default ({ filter }, { services }) => {
	filter("items.items.update", async (input, meta, { schema, accountability }) => {

		const { ItemsService } = services;
		const myCollection = new ItemsService(meta.collection, { schema, accountability });
		const item = await myCollection.readOne(meta.keys[0], { fields: ['*.*.showfields'] });
		const result = await Object.entries(item).reduce(async (acc, [key, value]) => {
			const fieldType = schema.collections[meta.collection].fields[key].special
			let add = []
			if (fieldType.includes('m2m')) {
				let padd = []
				let tadd = []
				let sadd = []

				let todelete = []
				if (Object.hasOwn(input, key)) {//this field is changing ( presented in input) 
					todelete = input[key].delete
					tadd = await input[key].create.reduce(async (acc, el) => {
						const inputCollection = new ItemsService(key, { schema, accountability });
						const res = await inputCollection.readOne(el[`${key}_id`].id, { fields: ['*'] })
						if (Object.hasOwn(res, 'showfields')) {
							sadd = !!res.showfields ? res.showfields : []
						}

						return acc.concat(sadd.filter(item => acc.indexOf(item) < 0))
					}, [])

				}
				if (!!value) {//not empty
					padd = value.reduce((acc, el) => {

						const madd = !!el[`${key}_id`].showfields && !todelete.includes(el.id) ? el[`${key}_id`].showfields : [] //has showfields and not to be deleted
						return acc.concat(madd.filter(item => acc.indexOf(item) < 0))
					}, [])
				}
				add = tadd.concat(padd.filter((item) => tadd.indexOf(item) < 0))


			} else if (fieldType.includes('m2o')) { //o2m case
				if (Object.hasOwn(input, key)) {//this field is changing ( presented in input) 

					if (!!input[key]) { //not case of clearing  -just another or new value 
						const inputCollection = new ItemsService(key, { schema, accountability });
						const res = await inputCollection.readOne(input[key], { fields: ['*'] })
						if (Object.hasOwn(res, 'showfields')) {
							add = !!res.showfields ? res.showfields : []
						}
					}
				} else {

					if (!!value) {//not empty already
						add = !!value.showfields ? value.showfields : [] //has showfield
					}

				}
			}


			const e = await acc


			return await e.concat(add.filter((item) => e.indexOf(item) < 0))
		}, [])


		input.visiblefields = result.toString()
		return input

	});

};
