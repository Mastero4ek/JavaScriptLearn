let title = prompt("Как называется ваш проект"),
	screens = prompt("Какие типы экранов нужно разработать?", "Простые / Сложные / Интерактивные"),
	screenPrice = +prompt("Сколько будет стоить данная работа?", "12000"),
	service1 = prompt("Какой дополнительный тип услуги нужен?"),
	servicePrice1 = +prompt("Сколько это будет стоить?"),
	service2 = prompt("Какой дополнительный тип услуги нужен?"),
	servicePrice2 = +prompt("Сколько это будет стоить?"),
	adaptive = confirm("Нужен ли адаптив на сайте?");
	
const fullPrice = screenPrice + servicePrice1 + servicePrice2,
	rollback = 75,
	servicePercentPrice = fullPrice - (fullPrice * (rollback / 100));

console.log(typeof title, typeof fullPrice, typeof adaptive);
console.log(screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей/ долларов/гривен/юани`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей/ долларов/гривен/юани`);
console.log(screens.toLowerCase().split(", "));
console.log(`Процент отката посреднику за работу (${fullPrice} * (${rollback} / 100))`);

console.log(Math.ceil(servicePercentPrice));

switch(true) {
	case fullPrice >= 30000:
		console.log("Даем скидку в 10%");
		break

	case fullPrice >= 15000 && fullPrice < 30000:
		console.log("Даем скидку в 5%");
		break

	case fullPrice < 15000 && fullPrice >= 0:
		console.log("Скидка не предусмотрена");
		break
		
	default:
		console.log("Что то пошло не так");
		break
}