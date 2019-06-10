const fs = require('fs');
const readline = require('readline');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('undead', 'sjs', 'sjs', {
	dialect: 'mysql'
});

const Murder = sequelize.define('Murder', {
	country: { type: Sequelize.STRING, field: 'country' },
	murder: { type: Sequelize.INTEGER, field: 'murder' },
}, {
	tableName: 'undead',
	timestamps: false,
});

const murderArray = [];

const processLine = (line) => {
	const fieldArray = line.split(',');
	return { 
		'country': fieldArray[1],
		'murder': parseInt(fieldArray[2])
	};
}

const loadFile = (fileName, loadingArray) => { 
	const rl = readline.createInterface({
		input: fs.createReadStream(fileName)
	});
	return rl.on('line', line => {
		loadingArray.push(processLine(line));
	});
}

basicStats = () => {
	const stats = {
		'sum': 0,
		'avg': 0,
		'count': 0,
		'max': 0,
		'min': 10000,
		'maxCountry': null,
		'minCountry': null,
	}
	murderArray.map(({country, murder}) => {
		stats.sum += murder;
		stats.count++;
		if (murder > stats.max) {
			stats.max = murder;
			stats.maxCountry = country;
		}
		if (murder < stats.min) {
			stats.min = murder;
			stats.minCountry = country;
		}
	});
	stats.avg = stats.sum / stats.count;
	console.log(stats);
}

writeToDB = async () => {
	murderArray.map(async ({country, murder}) => {
		await Murder.create({
			country,
			murder
		});
	});
}


loadFile('undead.csv', murderArray).on('close', () => {
	murderArray.shift();
	basicStats();
	writeToDB();
});

