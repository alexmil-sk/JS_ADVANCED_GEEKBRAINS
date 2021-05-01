var number = []; //Четырехзначное число, загадываемое компьютера
var attempts = 0;//Число попыток

generateNumber(); //Генерация неповторяющихся значений массива
alert(number.join(''));//Преобразование массива в строку через метод join()
guessNumber();

function generateNumber() {
	var min = 1;
	var max = 9;
	//number = (Math.random() * 10000).toFixed();

	for (var i = 0; i < 4; i++) {
		var part = Math.round(Math.random() * (max - min) + min);//Округляем до ближайшего целого и устанавливаем диапазон от мин до макс
		//Первое число всегда уникально
		if (i == 0) {
			number[0] = part;
		} else {//Пока не сгенерируется уникальное число, генерируем новые случайные числа
			while (number.indexOf(part) != -1) {//Элемент найден
				part = Math.round(Math.random() * (max - min) + min);
			}
			number[i] = part;
		}
	}
}

function guessNumber() {
	var result = prompt('Введите число (-1 - закончить игру)', 0);
	var gameIsRunning = true;//Проверка на то, что игра идет

	//Пока игрок не угадал число
	while (gameIsRunning) {
		//Выход из игры
		if (parseInt(result) == -1) {
			gameIsRunning = false;
			//Игрок ввел некорректные данные
		} else if (parseInt(result) == 0 || isNaN(parseInt(result))) {
			alert('Вы не ввели число');
			//Запрашиваем снова
			result = prompt('Введите число (-1 - закончить игру)', 0);
		} else if (result.length != 4) {
			alert('Вы ввели некорректное число');
			result = prompt('Введите число (-1 - закончить игру)', 0);
			//Проверяем число
		} else {
			var answer = checkNumber(result); //answer [false,1,1]
			if (answer[0]) {
				//Число угадано
				alert('Поздравляем! Вы угадали число. Количество попыток: ' + attempts);
				//Останавливаем игру
				gameIsRunning = false;
			} else {
				//Следующий код
				result = prompt('Быки: ' + answer[1] + ' Коровы: ' + answer[2] + 'Введите число (-1 - закончить игру)', 0);
			}
		} 
	}
}

function checkNumber(myresult) {//1234
		//"1234".split('') => [1234]
	
	//Каждая проверка увеличивает количество попыток на 1

	attempts++;
	//Массив результата
	//0 - общий результат
	//1 - быки
	//2 - коровы
	var answer = [false, 0, 0];//Массив исхода игры. Если угадал, то true, если не угадал, то false. По умолчанию, что не угадал. Следующие значения - это счетчик быков и коров.
	//Раскладываем число на разряды
	console.log(myresult);
	console.log(number);

	/*
	s = '1,2,3,4';
	mas = s.split(',');
	*/

	//var ranks = myresult.split('');//Массив, полученный из введенного числа

	for (var i = 0; i < myresult.length; i++) {//1234
		//если по индексу значения совпадают, то это бык
		if (parseInt(myresult[i]) == number[i]) {
			answer[1]++;
		}
		//если число вообще есть в массиве, то это корова
		else if (number.indexOf(parseInt(myresult[i])) != -1) {
			answer[2]++;
		}
	}
	//Если набралось четыре быка, то это победа
	if (answer[1] == 4) {
		answer[0] = true;
	}
	return answer;
}
