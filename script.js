'use strict'

const appData = {
	title: '',
	screens: '',
	screenPrice: '',
	adaptive: true,
	rollback: 75,
	service1: '',
	service2: '',
	getTitle: function() {
		appData.title = appData.title.trim();
		return appData.title.charAt(0).toUpperCase() + appData.title.slice(1).toLowerCase();
	},
	isNumber: function(num) {
		return !isNaN(parseFloat(num)) &&
		isFinite(num) &&
		!(num.startsWith(' ') || num.endsWith(' '));
	},
	showTypeOf: function(variable) {
		console.log(variable, typeof variable);
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
	getServicePercentPrices: function(price1, price2) {
		return price1 - (price1 * (price2 / 100));
	},
	getAllServicePrices: function() {
		let sum = 0;

		for(let i = 0; i < 2; i++) {
			if(i === 0) {
				appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
			} else if(i === 1) {
				appData.service2 = prompt("Какой дополнительный тип услуги нужен?");
			}

			do {
				sum = prompt("Сколько это будет стоить?");
			} while(!appData.isNumber(sum));
			sum = +sum;
		}
		
		return sum + sum;
	},
	getFullPrice: function(price1, price2) {
		return price1 + price2;
	},
	asking: function() {
		appData.title = appData.getTitle(prompt("Как называется ваш проект", "Калькулятор верстки"));
		appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые / Сложные / Интерактивные");
		
		do {
			appData.screenPrice = prompt("Сколько будет стоить данная работа?");
		}
		while(!appData.isNumber(appData.screenPrice));
		appData.screenPrice = +appData.screenPrice;

		appData.adaptive = confirm("Нужен ли адаптив на сайте?");
	},
	logger: function() {
		for(let key in appData) {
			console.log(key);
		}

		appData.showTypeOf(appData.title);
		appData.showTypeOf(appData.screenPrice);
		appData.showTypeOf(appData.adaptive);

		console.log(appData.screens.toLowerCase().split(", "));
		console.log(appData.getRollbackMessage(appData.fullPrice));
		console.log(appData.getServicePercentPrices(appData.fullPrice, appData.rollback));
	},
	start: function() {
		appData.asking();
		appData.title = appData.getTitle();
		appData.allServicePrices = appData.getAllServicePrices();
		appData.fullPrice = appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
		appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
		appData.logger();
	}
}

appData.start();