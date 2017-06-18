
var faker = require('faker');
var _ = require('lodash');

module.exports = {

	users: function(){

		return [
			{
				username: 'winterfell',
				name: 'Jon Snow',
				about: 'I know Nothing!',
				country: faker.address.country(),
				email: faker.internet.email(),
				phone: faker.phone.phoneNumber(),
				role: 'nothing',
				password: '1234'
			},
			{
				username: 'admin',
				name: faker.name.findName(),
				country: faker.address.country(),
				email: faker.internet.email(),
				phone: faker.phone.phoneNumber(),
				role: 'admin',
				password: '1234'
			}
		];
	},

	countries: function(total) {

		total = total ? total : 10;

		return _.map( _.times(total), function(){
			return {
				name: faker.address.country(),
				latitude: faker.address.latitude(),
				longitude: faker.address.longitude(),
				countryCode: faker.address.countryCode()
			};
		});
	},

	members: function(total){

		total = total ? total : 10;

		return _.map( _.times(total), function(){
			return {
				name: faker.name.findName(),
				country: faker.address.country(),
				email: faker.internet.email(),
				phone: faker.phone.phoneNumber()
			};
		});
	}

};