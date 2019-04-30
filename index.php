<!doctype html>
<html lang="ru">
<head> 
    <title>Conway's Game of Life</title>
    <meta name="description" content="Игра «Жизнь» (англ. Conway's Game of Life) — клеточный автомат, придуманный английским математиком Джоном Конвеем в 1970 году." />
    <meta name="author" content="Web-Vluki" />
    <meta name="copyright" content="(c) Web-Vluki" />
    
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    
    <link rel="stylesheet" href="assets/font-awesome-4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="assets/bootstrap-3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/bootstrap-3.3.7/css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
    
    <script src="assets/jquery/jquery-3.3.1.min.js"></script>
    <script src="assets/bootstrap-3.3.7/js/bootstrap.min.js"></script>
    
    <!--[if IE]>
    <script>
        document.createElement('header');
        document.createElement('nav');
        document.createElement('main');
        document.createElement('section');
        document.createElement('article');
        document.createElement('aside');
        document.createElement('footer');
    </script>
    <![endif]-->
</head>
<body>
	<div class="container-fluid">
		<div class="row">
			<div class="col-xs-12 col-md-2 management">
				<h1>Conway's</h1>
				<div class="des">Game of Life</div>
				<div class="icon">
					<i class="fa fa-bug" aria-hidden="true"></i>
					<i class="fa fa-bug" aria-hidden="true"></i>
					<i class="fa fa-bug" aria-hidden="true"></i>
					<i class="fa fa-bug" aria-hidden="true"></i>
					<i class="fa fa-bug" aria-hidden="true"></i>
					<i class="fa fa-bug" aria-hidden="true"></i>
					<i class="fa fa-bug" aria-hidden="true"></i>
					<i class="fa fa-bug" aria-hidden="true"></i>
				</div>
				<button id="start" type="button" class="btn btn-success">пуск</button>
				<button id="stop" type="button" class="btn btn-info">пауза</button>
				<button id="restart" type="button" class="btn btn-warning">перезапуск</button>	
				<button id="reset" type="button" class="btn btn-danger">очистить</button>
				<button id="speedm" type="button" class="btn btn-primary">скорость -</button>
				<button id="speedp" type="button" class="btn btn-primary">скорость +</button>
				<div id="count">Циклов прожито: </div>
				<div id="help">Вы можете прочитать: <a href="https://ru.wikipedia.org/wiki/%D0%98%D0%B3%D1%80%D0%B0_%C2%AB%D0%96%D0%B8%D0%B7%D0%BD%D1%8C%C2%BB" target="_blank"> "Описание и правила игры в Википедии"</a>.</div>
			</div>
			<div class="col-xs-12 col-md-10 nop">
				<div id="world"></div>	
			</div>			
		</div>
	</div>	
	<script src="assets/js/life.js"></script>
	<?php include $_SERVER['DOCUMENT_ROOT']."/assets/php/metrika.php"; ?>
</body>
</html>
