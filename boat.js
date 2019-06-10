const Sequelize = require('sequelize');
const sequelize = new Sequelize('dockyard', 'sjs', 'sjs', {
	dialect: 'mysql'
});

const Boat = sequelize.define('Boat', {
	name: { type: Sequelize.STRING, field: 'name' },
	type: { type: Sequelize.ENUM, values: ['sail', 'boat'], field: 'type' },
	length: { type: Sequelize.DECIMAL(10, 2), field: 'length' },
	workDescription: { type: Sequelize.TEXT, field: 'work_description' },
	photo: { type: Sequelize.STRING, field: 'photo' },
	arrivalDate: { type: Sequelize.DATE, field: 'arrival_date' },
	deliveryDate: { type: Sequelize.DATE, field: 'delivery_date' },
}, {
	tableName: 'boat',
	timestamps: false,
});

const Worker = sequelize.define('Worker', {
	name: { type: Sequelize.STRING, field: 'name' },
	phone: { type: Sequelize.STRING, field: 'name' },
	photo: { type: Sequelize.STRING, field: 'photo' },
}, {
	tableName: 'worker',
	timestamps: false,
});

const BoatWorker = sequelize.define('Boat', {}, {
	tableName: 'boat_worker',
	timestamps: false,
});

Boat.belongsToMany(Worker, {through: 'BoatWorker'});

const q = async () => {
	let result = await Boat.findByPk(1);
	const boat = { ...result.dataValues };
	console.log(boat);
	result = await Worker.findByPk(1);
	const worker = { ...result.dataValues };
	console.log(worker);
}

q();