'use strict'


const title = document.getElementsByTagName('h1')[0],
	buttonPlus = document.querySelector('.screen-btn'),
	otherItemsPercent = document.querySelectorAll('.other-items.percent'),
	otherItemsNumber = document.querySelectorAll('.other-items.number'),
	
	inputRange = document.querySelector('.rollback input'),
	inputRangeValue = document.querySelector('.rollback .range-value'),

	startBtn = document.getElementsByClassName('handler_btn')[0],
	resetBtn = document.getElementsByClassName('handler_btn')[1],

	total = document.getElementsByClassName('total-input')[0],
	totalCount = document.getElementsByClassName('total-input')[1],
	totalCountOther = document.getElementsByClassName('total-input')[2],
	fullTotalCount = document.getElementsByClassName('total-input')[3],
	totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

const appData = {
	title: '',
	screens: [],
	screenPrice: 0,
	adaptive: true,
	rollback: 0,
	servicePricesPercent: 0,
	servicePricesNumber: 0,
	fullPrice: 0,
	servicePercentPrice: 0,
	servicesPercent: {},
	servicesNumber: {},
	screensCount: 0,
	init: function() {
		appData.addTitle();
		appData.getRollback();
		startBtn.addEventListener('click', appData.start);
		buttonPlus.addEventListener('click', appData.addScreenBlock);
	},
	addTitle: function() {
		document.title = title.textContent;
	},
	start: function() {
		appData.addScreens();
		appData.addServices();
		appData.addPrices();
		appData.showResult();
		// appData.logger();
	},
	showResult: function() {
		total.value = appData.screenPrice;
		totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
		fullTotalCount.value = appData.fullPrice;
		totalCountRollback.value = appData.servicePercentPrice;
		totalCount.value = appData.screensCount;
	},
	addScreens: function() {
		screens = document.querySelectorAll('.screen');

		screens.forEach(function(screen, index) {
			const select = screen.querySelector('select'),
				input = screen.querySelector('input'),
				selectName = select.options[select.selectedIndex].textContent;
			
			if((selectName == "Тип экранов" && +input.value >= 0) ||
				input.value === "Количество экранов") {

				appData.init();
			} else {
				appData.screens.push({
					id: index,
					name: selectName,
					price: +select.value * +input.value,
					count: +input.value
				 });
			};
		});
	},
	addServices: function() {
		otherItemsPercent.forEach(function(item) {
			const check = item.querySelector('input[type=checkbox]'),
				label = item.querySelector('label'),
				input = item.querySelector('input[type=text]');

				if(check.checked) {
					appData.servicesPercent[label.textContent] = +input.value;
				}
		});

		otherItemsNumber.forEach(function(item) {
			const check = item.querySelector('input[type=checkbox]'),
				label = item.querySelector('label'),
				input = item.querySelector('input[type=text]');

				if(check.checked) {
					appData.servicesNumber[label.textContent] = +input.value;
				}
		});
	},
	addScreenBlock: function() {
		screens = document.querySelectorAll('.screen');

		const cloneScreen = screens[0].cloneNode(true);
		screens[screens.length - 1].after(cloneScreen);
	},
	addPrices: function() {
		appData.screenPrice = +appData.screens.reduce(function(sum, item) {
			return sum + +item.price;
		}, 0);

		appData.screensCount = +appData.screens.reduce(function(sum, item) {
			return sum + +item.count;
		}, 0);

		for(let key in appData.servicesNumber) {
			appData.servicePricesNumber += appData.servicesNumber[key];
		}

		for(let key in appData.servicesPercent) {
			appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
		}

		appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;

		appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
	},
	getRollback: function() {
		inputRange.value = 0;
		inputRangeValue.textContent = '0%';

		inputRange.addEventListener('input', () => {
			inputRangeValue.textContent = inputRange.value + '%';
			appData.rollback = +inputRange.value;

			totalCountRollback.value = inputRange.value * appData.screensCount;
		});
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

appData.init();