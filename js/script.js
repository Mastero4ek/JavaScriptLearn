'use strict'


const title = document.getElementsByTagName('h1')[0],
	buttonPlus = document.querySelector('.screen-btn'),
	otherItemsPercent = document.querySelectorAll('.other-items.percent'),
	otherItemsNumber = document.querySelectorAll('.other-items.number'),
	
	inputRange = document.querySelector('.rollback input'),
	inputRangeValue = document.querySelector('.rollback .range-value'),

	startBtn = document.getElementsByClassName('handler_btn')[0],
	resetBtn = document.getElementsByClassName('handler_btn')[1],

	totalItems = document.querySelectorAll('.main-total__item > .total-input'),
	total = document.getElementsByClassName('total-input')[0],
	totalCount = document.getElementsByClassName('total-input')[1],
	totalCountOther = document.getElementsByClassName('total-input')[2],
	fullTotalCount = document.getElementsByClassName('total-input')[3],
	totalCountRollback = document.getElementsByClassName('total-input')[4],

	cms = document.querySelector('.cms'),
	cmsHidden = document.querySelector('.hidden-cms-variants'),
	checkCms = cms.querySelector('input[type=checkbox]'),
	selectCms = cmsHidden.querySelector('.main-controls__select > select'),
	optionCms = cmsHidden.querySelector('.main-controls__input');

let screens = document.querySelectorAll('.screen'),
	mainControleSelect = document.querySelectorAll('.screen > .main-controls__select > select'),
	mainControlsInput = document.querySelectorAll('.screen > .main-controls__input > input');

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
		this.addTitle();
		this.getRollback();
		this.addOptionCms();

		startBtn.addEventListener('click', () => {
			this.checkScreens();
		});

		resetBtn.addEventListener('click', () => {
			this.reset();
		});

		buttonPlus.addEventListener('click', this.addScreenBlock);
	},
	addTitle: function() {
		document.title = title.textContent;
	},
	checkScreens: function() {
		screens.forEach((screen, index) => {
			const select = screen.querySelector('select'),
				input = screen.querySelector('input'),
				selectName = select.options[select.selectedIndex].textContent;
			
			if(selectName == "Тип экранов" ||
				input.value == "" ||
				+input.value == 0) return;

			this.start();
		});
	},
	start: function() {
		this.addScreens();
		this.addServices();
		this.addPrices();
		this.showResult();
		this.disabled();
		// appData.logger();
	},
	reset: function() {
		this.enabled();
		this.removeScreens();
		this.clearAppData();
		this.clearInput();
		this.removeOptionCms();
	},
	disabled: function() {
		mainControleSelect.forEach((item) => {
			item.disabled = true;
		});

		mainControlsInput.forEach((item) => {
			item.disabled = true;
		});

		buttonPlus.disabled = true;
		startBtn.style.display = 'none';
		resetBtn.style.display = 'block';
	},
	enabled: function() {
		mainControleSelect.forEach((item) => {
			item.disabled = false;
		});

		mainControlsInput.forEach((item) => {
			item.disabled = false;
		});
		
		buttonPlus.disabled = false;
		startBtn.style.display = 'block';
		resetBtn.style.display = 'none';
	},
	clearInput: function() {
		otherItemsPercent.forEach((item) => {
			const check = item.querySelector('input[type=checkbox]');
			check.checked = false;
		});

		otherItemsNumber.forEach((item) => {
			const check = item.querySelector('input[type=checkbox]');
			check.checked = false;
		});

		mainControleSelect.forEach((item) => {
			item.value = '';
		});

		mainControlsInput.forEach((item) => {
			item.value = '';
		});

		totalItems.forEach((item) => {
			item.value = '0';
		});

		inputRange.value = 0;
		inputRangeValue.textContent = '0%';
	},
	clearAppData: function() {
		this.fullPrice = 0;
		this.rollback = 0;
		this.screenPrice = 0;
		this.screensCount = 0;
		this.servicePercentPrice = 0;
		this.servicePricesNumber = 0;
		this.servicePricesPercent = 0;
		this.servicesPercent = {};
		this.servicesNumber = {};
	},
	showResult: function() {
		total.value = this.screenPrice;
		totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
		fullTotalCount.value = this.fullPrice;
		totalCountRollback.value = this.servicePercentPrice;
		totalCount.value = this.screensCount;
	},
	addScreens: function() {
		screens = document.querySelectorAll('.screen');
		mainControleSelect = document.querySelectorAll('.screen > .main-controls__select > select');
		mainControlsInput = document.querySelectorAll('.screen > .main-controls__input > input');

		screens.forEach((screen, index) => {
			const select = screen.querySelector('select'),
				input = screen.querySelector('input'),
				selectName = select.options[select.selectedIndex].textContent;
			
			this.screens.push({
				id: index,
				name: selectName,
				price: +select.value * +input.value,
				count: +input.value
			});
		});
	},
	removeScreens: function() {
		this.screens.length = 0;

		screens = document.querySelectorAll('.screen');

		for(let i = screens.length - 1; i >= 1; i--) {
			screens[i].remove();
		}
	},
	addServices: function() {
		otherItemsPercent.forEach((item) => {
			const check = item.querySelector('input[type=checkbox]'),
				label = item.querySelector('label'),
				input = item.querySelector('input[type=text]');

				if(check.checked) {
					this.servicesPercent[label.textContent] = +input.value;
				}
		});

		otherItemsNumber.forEach((item) => {
			const check = item.querySelector('input[type=checkbox]'),
				label = item.querySelector('label'),
				input = item.querySelector('input[type=text]');

				if(check.checked) {
					this.servicesNumber[label.textContent] = +input.value;
				}
		});
	},
	addOptionCms: function() {
		selectCms.addEventListener('change', () => {
			switch(true) {

			case selectCms.value == 'other':
				return optionCms.style.display = 'block';

			case +selectCms.value == 50:
				return optionCms.style.display = 'none';
				
			default:
				return optionCms.style.display = 'none';
			}
		});

		checkCms.addEventListener('change', () => {
			if(checkCms.checked) {
				cmsHidden.style.display = 'flex';
			} else {
				selectCms.value = '';
				cmsHidden.style.display = 'none';
				optionCms.style.display = 'none';
			}
		});
	},
	removeOptionCms: function() {
		checkCms.checked = false;
		selectCms.value = '';
		cmsHidden.style.display = 'none';
		optionCms.style.display = 'none';
	},
	addScreenBlock: function() {
		screens = document.querySelectorAll('.screen');
		mainControleSelect = document.querySelectorAll('.screen > .main-controls__select > select');
		mainControlsInput = document.querySelectorAll('.screen > .main-controls__input > input');

		const cloneScreen = screens[0].cloneNode(true);
		screens[screens.length - 1].after(cloneScreen);
	},
	addPrices: function() {
		this.screenPrice = +this.screens.reduce((sum, item) => {
			return sum + +item.price;
		}, 0);

		this.screensCount = +this.screens.reduce((sum, item) => {
			return sum + +item.count;

		}, 0);

		for(let key in this.servicesNumber) {
			this.servicePricesNumber += this.servicesNumber[key];

		}

		for(let key in this.servicesPercent) {
			this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
		}

		if(+selectCms.value == 50) {
			this.fullPrice = (+this.screenPrice + this.servicePricesNumber + this.servicePricesPercent) +
							(+this.screenPrice + this.servicePricesNumber + this.servicePricesPercent) *
							selectCms.value / 100;
		} else {
			this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
		}

		this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100));
	},
	getRollback: function() {
		inputRange.value = 0;
		inputRangeValue.textContent = '0%';

		inputRange.addEventListener('input', () => {
			inputRangeValue.textContent = inputRange.value + '%';
			this.rollback = +inputRange.value;

			totalCountRollback.value = inputRange.value * this.screensCount;
		});
	},
	logger: function() {
		for(let key in this) {
			console.log(key);
		}

		console.log(this.fullPrice);
		console.log(this.servicePercentPrice);
		console.log(this.screens);
		console.log(this.services);
		console.log(this.screenPrice);
	}
}

appData.init();