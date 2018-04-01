require("ace/ext/emmet");

jQuery.fn.extend({
	codeEdit: function(config)
	{
		return this.each((i,e)=>{initCodeEditor(config,e)});
	}
});

function initAce( element, language )
{
	editor = ace.edit($(element).get(0)),
	lang = ace.require("ace/mode/"+language).Mode;

	editor.setTheme("ace/theme/monokai");
	editor.setOption("enableEmmet", true);
	editor.session.setMode(new lang());

	return editor;
}

function setError(text) {
	console.error(text);
	return false;
}


function initCodeEditor(config,el)
{
	if(typeof(config) != 'object') return setError("Config varible type is object required! Current config has type "+typeof(config));
	
	let counter = $(".code-editor").length,
	js = (config.hasOwnProperty('js')) ? config.js : null,
	html = (config.hasOwnProperty('html')) ? config.html : null,
	php = (config.hasOwnProperty('php')) ? config.php : null,
	css = (config.hasOwnProperty('css')) ? config.css : null,
	element = $(`
		<div class="code-editor" id="editor_${counter}">
			<div class="code-editor_title">
				<p class="code-editor_title_text">Пример кода перебор массива</p>
				<div class="code-editor_title_titles for-html-php">
					<input type="radio" name="php" value="1" id="usePhp_${counter}">
					<label for="usePhp_${counter}">PHP</label>
					<input type="radio" name="php" value="0" id="useHtml_${counter}">
					<label for="useHtml_${counter}">HTML</label>
				</div>
				<div class="code-editor_title_titles for-css">CSS</div>
				<div class="code-editor_title_titles for-js">JS</div>
			</div>
			<div class="php-html"></div>
			<div class="css"></div>
			<div class="js"></div>
			<div class="output"><iframe frameborder="0">Empty Result</iframe></div>
			<div class="controls">
				<a href="#" class="run">Выполить код</a>
			</div>
		</div>
		`),
	phpAce = null,
	htmlAce = null,
	jsAce = null,
	cssAce = null;

    // Вставляем
    $(el).append(element);
    element = $(`#editor_${counter}`);

    elements = {
    	phphtml: element.find(".php-html"),
    	css: element.find(".css"),
    	js: element.find(".js")
    };

    // Если пользователь мудак
    if(!php && !html && !css && !js) return setError("Config doesn't have any programming language key (js,css,html,php)");

    // Удаляем лишнее
    if(!php && !html) element.find(".for-html-php, .php-html").remove();
    if(!css) element.find(".for-css, .css").remove();
    if(!js) element.find(".for-js, .js").remove();

    // Вставляем значения  и инициализируем 
    if(php || html){
    	elements.phphtml.text(php);
    	if(html) elements.phphtml.text(html);
    	var current = (html) ? "html" : "php",
    	aceInitVar = initAce(elements.phphtml, current);

    	if(current == "html"){
    		htmlAce = aceInitVar;
    		element.find(`#useHtml_${counter}`).prop("checked", true);
    	}else{
    		phpAce = aceInitVar;
    		element.find(`#usePhp_${counter}`).prop("checked", true);
    	}

    	element.find(`#useHtml_${counter}, #usePhp_${counter}`).on('change', function(event) {
    		event.preventDefault();
    		var language = (element.find('input[name="php"]:checked').val() == "1") ? "php" : "html";
    		lang = ace.require("ace/mode/"+language).Mode;

    		if(language == "php"){
    			phpAce = htmlAce;
    			htmlAce = null;
    			phpAce.session.setMode(new lang());
    		}else{
    			htmlAce = phpAce;
    			phpAce = null;
    			htmlAce.session.setMode(new lang());
    		}
    	});

    }
    
    if(css){
    	elements.css.text(css);
    	cssAce = initAce(elements.css, "css");
    } 
    if(js){
    	elements.js.text(js);
    	jsAce = initAce(elements.js, "javascript");
    }

   
    var btn =  element.find('.run');

	$(btn).on('click', function(event) {
		event.preventDefault();
		var editors = {php: phpAce, html: htmlAce, js: jsAce, css: cssAce},
		data = {};

		for(editor in editors){
			var key = (editor == "php") ? "code" : editor;
			if(editors[editor])	data[key] = editors[editor].getValue();
		}

		if(data["code"]){
			data["code"] = data["code"].replace('<?php', '');
			data["code"] = data["code"].replace('?>', '');
		}

		$.ajax({
			url: 'api.php',
			type: 'POST',
			dataType: 'json',
			data: data,
		})
		.done(function(data) {
			if(data.error)	return alert("Error!");
			$(element).find("iframe").get(0).src = "data:text/html;charset=utf-8,"+data.output;
		})
		.fail(function() {
			alert("Error!");
		});
	});

	if(config.hasOwnProperty('run') && config.run == true) $(btn).trigger('click');
}

