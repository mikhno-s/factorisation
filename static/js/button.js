// document.write ('<table width="100%" border="1">');
// for (i=1; i<6; i++) {
//     document.writeln("<tr>");
//     for (j=1; j<6; j++) document.write("<td>" + i + j + "<\/td>");
//     document.writeln("<\/tr>");
// }
// document.write ("<\/table> ");

function findFactors() {

	var xhr = new XMLHttpRequest();

	xhr.open('GET', '/api/getFactors', true);

	xhr.send();

	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) return;

		
		button.innerHTML = 'Найти множители';

		if (xhr.status != 200) {
			// обработать ошибку
			alert(xhr.status + ': ' + xhr.statusText);
		} else {
				// вывести результат
				rJson = JSON.parse(xhr.responseText);
				rJson.Result.forEach(function(e) {
					// result.innerHTML += e + "";
				});
		}
	}
	button.innerHTML = 'Загружаю...';
}

