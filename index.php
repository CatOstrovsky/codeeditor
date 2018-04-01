
<!DOCTYPE html>
<html>
<head>
	<title>Code Editro Console</title>
	<meta charset="utf8">
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="assets/css/style.css">
	<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
	
</head>
<body>
	<!-- .container -->
	<div class="container">
		<!-- #demo-code-edit -->
		<div id="demo-code-edit"></div>
		<!-- /#demo-code-edit -->
	</div>
	<!-- /.container -->

	<footer>
		<script src="https://cloud9ide.github.io/emmet-core/emmet.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.3/ace.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.3/theme-monokai.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.3/mode-php.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.3/mode-css.js"></script>		
		<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.3/mode-html.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.3/mode-javascript.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.3/ext-emmet.js"></script>

		<script src="assets/js/script.js"></script>
		<script>
$("#demo-code-edit").codeEdit({
name: 'Пример перебора массива',
css: `p {
	color:red;
}`,
// js: `console.log("simple code")`,
php: `
    echo "<pre>";
    $array = ["A","B","C","D","E"];
    foreach($array as $key => $value) {
        echo "Привет! Я элемент массива с порядковым номером $key \r";
        echo "Мое значение $value!\r";
        echo "Был рад знакомству! \r\r";
    }
    echo "<p>Спасибо за внимание!</p>";
`,
// html: `
// 	<button type="button" class="btn btn-default">Ну давай же! ткни!</button>
// `,
run: true
})
		</script>
	</footer>
</body>
</html>
