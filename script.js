'use strict'

const appData = {
	title: '',
	screens: [],
	screenPrice: 0,
	adaptive: true,
	rollback: 75,
	allServicePrices: 0,
	fullPrice: 0,
	servicePercentPrice: 0,
	services: {},
	start: function() {
		appData.asking();
		appData.addPrices();
		appData.getFullPrice();
		appData.getServicePercentPrices();
		appData.getTitle();
		appData.logger();
	},
	isNumber: function(num) {
		return !isNaN(parseFloat(num)) &&
			   isFinite(num) &&
			   !(num.startsWith(' ') || num.endsWith(' '));
	},
	isString: function(str) {
		return typeof str == 'string' &&
			   isNaN(str) &&
			   !(str.startsWith(' ') || str.endsWith(' '));
	},
	asking: function() {
		do {
			appData.title = prompt("Как называется ваш проект", "Калькулятор верстки");
		}
		while(!appData.isString(appData.title));

		for(let i = 0; i < 2; i++) {
			let name = '';
			let price = 0;

			do {
				name = prompt("Какие типы экранов нужно разработать?");
			}
			while(!appData.isString(name));

			do {
				price = prompt("Сколько будет стоить данная работа?");
			}
			while(!appData.isNumber(price));

			appData.screens.push({id: i, name: name, price: price});
		}

		for(let i = 0; i < 2; i++) {
			let name = '';
			let price = 0;

			do {
				name = prompt("Какой дополнительный тип услуги нужен?");
			}
			while(!appData.isString(name));

			do {
				price = prompt("Сколько это будет стоить?");
			} while(!appData.isNumber(price));

			appData.services[i + 1 + ' ' + name] = +price;
		}
		
		appData.adaptive = confirm("Нужен ли адаптив на сайте?");
	},
	addPrices: function() {
		appData.screenPrice = +appData.screens.reduce(function(sum, item) {
			return sum + +item.price;
		}, 0);

		for(let key in appData.services) {
			appData.allServicePrices += appData.services[key];
		}
	},
	getFullPrice: function() {
		appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
	},
	getServicePercentPrices: function() {
		appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
	},
	getTitle: function() {
		appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substr(1).toLowerCase();
	},
	getRollbackMessage: function(price) {
		switch(true) {
			case price >= 30000:
				return "Даем скидку в 10%";

			case price >= 15000 && price < 30000:
				return "Даем скидку в 5%";

			case price < 15000 && price >= 0:
				return "Скидка не предусмотрена";
				
			default:
				return "Что то пошло не так";
		}
	},
	logger: function() {
		for(let key in appData) {
			console.log(key);
		}

		console.log(appData.fullPrice);
		console.log(appData.servicePercentPrice);
		console.log(appData.screens);
		console.log(appData.services);
		console.log(appData.screenPrice);
	}
}

appData.start();