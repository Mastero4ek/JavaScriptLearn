let title,
	screens,
	screenPrice,
	adaptive,
	service1,
	service2;

//проверяем являются ли введеные данные числом
const isNumber = function(num) {
	return !isNaN(parseFloat(num)) && isFinite(num);
}

const asking = function() {
	title = getTitle(prompt("Как называется ваш проект", "Калькулятор верстки"));
	screens = prompt("Какие типы экранов нужно разработать?", "Простые / Сложные / Интерактивные");
	
	do {
		screenPrice = prompt("Сколько будет стоить данная работа?");
	}
	while(!isNumber(screenPrice));

	adaptive = confirm("Нужен ли адаптив на сайте?");
}

const showTypeOf = function (variable) {
	console.log(variable, typeof variable);
}

const getRollbackMessage = function(price) {
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
}

const getAllServicePrices = function() {
	let sum = 0;

	for(let i = 0; i < 2; i++) {
		if(i === 0) {
			service1 = prompt("Какой дополнительный тип услуги нужен?");
		} else if(i === 1) {
			service2 = prompt("Какой дополнительный тип услуги нужен?");
		}

		do {
			sum = prompt("Сколько это будет стоить?");
		} while(!isNumber(sum));
	}
	
	return +sum + +sum;
}

function getFullPrice(price1, price2) {
	return price1 + price2;
}

function getServicePercentPrices(price1, price2) {
	return price1 - (price1 * (price2 / 100));
}

function getTitle(str) {
	str = str.trim();
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

asking();

const allServicePrices = getAllServicePrices(),
	fullPrice = getFullPrice(+screenPrice, allServicePrices),
	rollback = 75,
	servicePercentPrice = fullPrice - (fullPrice * (rollback / 100));

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(screens.toLowerCase().split(", "));
console.log(getRollbackMessage(fullPrice));
console.log(getServicePercentPrices(fullPrice, rollback));