const title = "Разработка сайтов!",
	  screens = "Простые, Сложные, Интерактивные",
	  screenPrice = 25,
	  rollback = 75,
	  fullPrice = 135600,
	  adaptive = true;

console.log(typeof title, typeof fullPrice, typeof adaptive);
console.log(screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей/ долларов/гривен/юани`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей/ долларов/гривен/юани`);
console.log(screens.toLowerCase().split(", "));
console.log(`Процент отката посреднику за работу (${fullPrice} * (${rollback} / 100))`);