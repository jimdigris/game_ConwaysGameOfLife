var cellW = 10;		// ширина одной Ячейки
var cellH = 10;		// высота одной Ячейки


// просчитываем габариты игрового полЯ-сетки
// в зависимости от размера экрана
var sizeWin = {
	"Width": "",		// ширина окна
	"Height": "",		// высота окна
	"canW": "",			// ширина канвы
	"canH": "",			// высота канвы
	"sW": "",			// ширина сетки (Ячеек)
	"sH": "",			// высота сетки (Ячеек)
	"cellW": "",		// ширина одной Ячейки
	"cellH": "",		// высота одной Ячейки
	
	"f_calculation": function(){
		
		// размер окна обраузера
		sizeWin.Width = document.getElementById('world').clientWidth;
		sizeWin.Height = document.getElementById('world').clientHeight;
		
		// вычислЯем размер канвы
		sizeWin.canW = Math.floor(sizeWin.Width);
		sizeWin.canH = Math.floor(sizeWin.Height);
		
		// делаем их четными
		if (sizeWin.canW % 2 != 0){sizeWin.canW -= 1;}
		if (sizeWin.canH % 2 != 0){sizeWin.canH -= 1;}
		

		document.getElementById('world').insertAdjacentHTML("afterBegin", '<canvas id="canvas" width="' + sizeWin.canW + '" height="' + sizeWin.canH + '" ></canvas>');
	
		// рассчитываем габариты сетки в Ячейках
		sizeWin.sW = Math.floor(sizeWin.canW / cellW);
		sizeWin.sH = Math.floor(sizeWin.canH / cellH);		
	},
};
sizeWin.f_calculation();	// запускаем просчет габаритов канвы

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var setkaBec = [];		// игровое поле-сетка-массив (начальнаЯ копиЯ)
var setkaPre = [];		// предыдущее состоЯние игрового поля
var setka = [];			// игровое поле-сетка-массив
var sW = sizeWin.sW;		// ширина сетки (Ячеек)
var sH = sizeWin.sH;		// высота сетки (Ячеек)
var count = 0;		// кол-во жизненных циклов
var timer;			// времЯ повторениЯ жизненного цикла
var speed = 1000;	// скорость таймера цикла


// создаем игровое поле-сетку
// первый запуск (или рестарт) - созданиЯ игрового полЯ
function oneStart(){
	for (var i = 0; i < sW; i++){					// горизонталь
		setka[i] = [];
		for (var j = 0; j < sH; j++){				// вертикаль
			// заполняем пустотой
			setka[i][j] = 0;		
			// размечаем Ячейки
			ctx.strokeStyle = "#d9ecda";
			ctx.strokeRect(i * cellW, j * cellH, cellW, cellH);		
		};
	};
};
oneStart();


// обрабатываем клик мыши по полю
// создаем "нулевую колонию"
canvas.onclick = function(event){
	
	// получаем координаты клика
	var x = event.offsetX;
	var y = event.offsetY;
	
	// определяем в какой Ячейке произошел клик
	var cellX = Math.floor(x / cellW);		// столбец
	var cellY = Math.floor(y / cellH);		// строка
	
	// менЯем статус Ячейки, заполнЯем ее
	setka[cellX][cellY] = 1;	

	// перерисовывем поле
	f_draw();	
};


// перерисовываем игровое поле
function f_draw() {
	ctx.clearRect(0,0,sizeWin.canW,sizeWin.canH);		// очищаем поле

	// проверЯем каждую Ячейку
	for (var i = 0; i < sW; i++){
		for (var j = 0; j < sH; j++){			
			// размечаем Ячейки
			ctx.strokeStyle = "#d9ecda";
			ctx.strokeRect(i * cellW, j * cellH, cellW, cellH);	
				
			// если Ячейка не пуста зарисовываем ее
			if (setka[i][j] == 1){	
				ctx.fillStyle = "#5941a2";
				ctx.fillRect(i * cellW, j * cellH, cellW, cellH);
			};
		};
	};	
};

// перерисовываем игровое поле в конце игры (с другим цветом)
function f_drawEnd() {
	ctx.clearRect(0,0,sizeWin.canW,sizeWin.canH);		// очищаем поле

	// проверЯем каждую Ячейку
	for (var i = 0; i < sW; i++){
		for (var j = 0; j < sH; j++){			
			// размечаем Ячейки
			ctx.strokeStyle = "#d9ecda";
			ctx.strokeRect(i * cellW, j * cellH, cellW, cellH);	
				
			// если Ячейка не пуста зарисовываем ее
			if (setka[i][j] == 1){	
				ctx.fillStyle = "#d9534f";
				ctx.fillRect(i * cellW, j * cellH, cellW, cellH);
			};
		};
	};	
};


// рассчеты нового состоЯниЯ Ячеек
// жизненный цикл
function f_model() {	
	
	var setkaNext = [];	// будущее состоЯние игрового поля
	
	// проверЯем каждую Ячейку
	for (var i = 0; i < sW; i++){

		setkaNext[i] = [];
		
		for (var j = 0; j < sH; j++){	

			var environment = 0;	// соседи
			
			// проверЯем наличие соседей
			if (setka[minsW(i) - 1][j] == 1) {environment++;};	// слева
			if (setka[maxsW(i) + 1][j] == 1) {environment++;};	// справа
			if (setka[i][minsH(j) - 1] == 1) {environment++;};	// сверху
			if (setka[i][maxsH(j) + 1] == 1) {environment++;};	// снизу
			if (setka[minsW(i) - 1][minsH(j) - 1] == 1) {environment++;};	// слева-сверху
			if (setka[maxsW(i) + 1][minsH(j) - 1] == 1) {environment++;};	// справа-сверху
			if (setka[minsW(i) - 1][maxsH(j) + 1] == 1) {environment++;};	// слева-снизу
			if (setka[maxsW(i) + 1][maxsH(j) + 1] == 1) {environment++;};	// справа-снизу
			
			
			// проверЯем столкновение проверки выше с границами полЯ
			// делаем бесконечное замкнутое поле			
			function minsW(ij){	// проверЯет минимальное число в горизонтале
				if (ij == 0){return sW;} else {return ij;}
			};
			
			function minsH(ij){	// проверЯет минимальное число в вертикале
				if (ij == 0){return sH;} else {return ij;}
			};
			
			function maxsW(ij){	// проверЯет максимальное число в горизонтале
				if (ij == sW - 1){return -1;} else {return ij;}
			};
			
			function maxsH(ij){	// проверЯет максимальное число в вертикале
				if (ij == sH - 1){return -1;} else {return ij;}
			};
			

			// условиЯ зарождениЯ/смерти/взрослениЯ клетки
			if (environment == 3){setkaNext[i][j] = 1;}						// зарождаетсЯ жизнь
			if (setka[i][j] == 1 && (environment == 2 || environment == 3)){setkaNext[i][j] = 1;}	// продолжает жить
			if (environment < 2 || environment > 3){setkaNext[i][j] = 0;}	// клетка умирает
		};
	}; 
	
	// проверка на конец игры
	// конец, если "текущее состояние = будущему" или "предыдущее состояние = будущему"
	if (JSON.stringify(setka) === JSON.stringify(setkaNext) || JSON.stringify(setkaPre) === JSON.stringify(setkaNext)){
		document.getElementById('count').style.borderTop = "2px solid #d9534f";
		document.getElementById('count').style.borderBottom = "2px solid #d9534f";
		f_drawEnd();
	} else {	
	
		if (setkaPre != setkaNext){
			setkaPre = setka;					// запоминаем предыдущее состояние
		};			
		
		setka = setkaNext;						// обновлЯем текущее сосотоЯние полЯ	
		f_draw();								// запускаем перерисовку полЯ	
		count++;								// увеличиваем кол-во прожитых циклов	
		document.getElementById('count').innerHTML = "Циклов прожито: " + count;
		timer = setTimeout(f_model, speed);		// запускаем следующий цикл жизни
	};	
};


// запускаем моделирование (жизненные циклы)
document.getElementById('start').onclick = function(){		
	// запоминаем начальное положение
	setkaBec = setka;	
	f_model();
};

// стоп (пауза)
document.getElementById('stop').onclick = function(){
	clearTimeout(timer);
};

// перезапуск
document.getElementById('restart').onclick = function(){
	clearTimeout(timer);
	count = 0;
	document.getElementById('count').innerHTML = "Циклов прожито: " + count;
	document.getElementById('count').style.borderTop = "2px solid #57bedd";
	document.getElementById('count').style.borderBottom = "2px solid #57bedd";
	setka = setkaBec;
	f_draw();
	setTimeout(f_model, 3000);
};	

// очистить поле
document.getElementById('reset').onclick = function(){
	clearTimeout(timer);
	count = 0;
	document.getElementById('count').innerHTML = "Циклов прожито: " + count;
	document.getElementById('count').style.borderTop = "2px solid #57bedd";
	document.getElementById('count').style.borderBottom = "2px solid #57bedd";	
	oneStart();
	f_draw();
};	
	
// скорость меньше
document.getElementById('speedm').onclick = function(){
	speed += 100;
}

// скорость больше
document.getElementById('speedp').onclick = function(){
	speed -= 100;
}		
	