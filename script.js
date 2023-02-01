const title = getTitle(prompt("Как называется ваш проект")),
	screens = prompt("Какие типы экранов нужно разработать?", "Простые / Сложные / Интерактивные"),
	screenPrice = +prompt("Сколько будет стоить данная работа?", "12000"),
	service1 = prompt("Какой дополнительный тип услуги нужен?"),
	servicePrice1 = +prompt("Сколько это будет стоить?"),
	service2 = prompt("Какой дополнительный тип услуги нужен?"),
	servicePrice2 = +prompt("Сколько это будет стоить?"),
	adaptive = confirm("Нужен ли адаптив на сайте?");

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

const getAllServicePrices = function(price1, price2) {
	return price1 + price2;
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

const allServicePrices = getAllServicePrices(servicePrice1, servicePrice2),
	fullPrice = getFullPrice(screenPrice, allServicePrices),
	rollback = 75,
	servicePercentPrice = fullPrice - (fullPrice * (rollback / 100));

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(screens.toLowerCase().split(", "));
console.log(getRollbackMessage(fullPrice));
console.log(getServicePercentPrices(fullPrice, rollback));