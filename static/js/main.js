function colorize(e) {
	for (i = 0; i < tbl_html.rows[0].cells.length; i++) {
		for (j = 0; j < tbl_html.rows.length; j++ ) {
			if (tbl_html.rows[j].cells[i].innerHTML == e) {
				tbl_html.rows[j].cells[i].style.cssText = "background-color: yellow" 
				return
			}
		}
	}
}

function findFactors() {
	try {
		saveRows()
	} catch (e) {
		
	}
	var table = []
	tbl_html = document.getElementById('data_table');
	for (i = 0; i < tbl_html.rows[0].cells.length; i++) {
		table.push([])
		for (j = 0; j < tbl_html.rows.length; j++ ) {
			tbl_html.rows[j].cells[i].style.cssText = "background-color: white" 
			table[i][j] = parseFloat(tbl_html.rows[j].cells[i].innerHTML)
		}
	}

	r = {}
	r.Data = table
	r.Result = parseFloat(document.getElementById('result').value)

	var xhr = new XMLHttpRequest();

	xhr.open('POST', '/api/getFactors', true);
	xhr.send(JSON.stringify(r));

	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) return;

		
		button.innerHTML = 'Найти множители';

		if (xhr.status != 200) {
			alert(xhr.status + ': ' + xhr.statusText);
		} else {
			factors = document.getElementById('factors')
			factors.innerHTML = "";
			rJson = JSON.parse(xhr.responseText);
			rJson.Result.forEach(function(e) {
				colorize(e)
				factors.innerHTML += e + " ";
			});
		}
	}
	button.innerHTML = 'Загружаю...';
}

function editRows() {
	var tbl = document.getElementById('data_table');
	for (i = 0; i < tbl.rows.length; i++) {
		for (j = 0; j < tbl.rows[i].cells.length; j++ ) {
			cellContent = ''
			doc = null
			doc = document.getElementById(i + "_" + j) 
			if (doc != null) {
				continue
			};
			cellContent = tbl.rows[i].cells[j].innerHTML
			tbl.rows[i].cells[j].innerHTML = "<input type='text' id=\""+ i + "_" + j + "\" value=\""+ cellContent + "\"></input>"
		}
	}
	document.getElementById("save").disabled = false;
	document.getElementById("addRow").disabled = false;
	document.getElementById("addColumn").disabled = false;
	document.getElementById("deleteRows").disabled = false;
	document.getElementById("deleteColumns").disabled = false;
}

function saveRows() {
	var tbl = document.getElementById('data_table'), 
			i, j;
	for (i = 0; i < tbl.rows.length; i++) {
		for (j = 0; j < tbl.rows[i].cells.length; j++ ) {
			cellContent = document.getElementById(i + "_" + j).value;
			tbl.rows[i].cells[j].innerHTML = cellContent
		}
	}
	document.getElementById("save").disabled = true;
	document.getElementById("addRow").disabled = true;
	document.getElementById("addColumn").disabled = true;
	document.getElementById("deleteRows").disabled = true;
	document.getElementById("deleteColumns").disabled = true;
}


// append row to the HTML table
function appendRow() {
	var tbl = document.getElementById('data_table'), 
			row = tbl.insertRow(tbl.rows.length),      // append table row
			i;
	// insert table cells to the new row
	for (i = 0; i < tbl.rows[0].cells.length; i++) {
		createCell(row.insertCell(i), (tbl.rows.length-1) + "_" + i, 'row');
	}
}

// append column to the HTML table
function appendColumn() {
	var tbl = document.getElementById('data_table'), // table reference
			i;
	// open loop for each row and append cell
	for (i = 0; i < tbl.rows.length; i++) {
		createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length), i + "_" + (tbl.rows[0].cells.length-1), 'col');
	}
}

// delete table rows with index greater then 0
function deleteRows() {
	var tbl = document.getElementById('data_table'), // table reference
			lastRow = tbl.rows.length - 1,             // set the last row index
			i;
	tbl.deleteRow(lastRow);
}

// delete table columns with index greater then 0
function deleteColumns() {
	var tbl = document.getElementById('data_table'), // table reference
			lastCol = tbl.rows[0].cells.length - 1,    // set the last column index
			i, j;
	// delete cells with index greater then 0 (for each row)
	for (i = 0; i < tbl.rows.length; i++) {
		tbl.rows[i].deleteCell(lastCol);
	}
}

function createCell(cell, id, style) {
	var div = document.createElement('div'); // create DIV element
	console.log(id)
	// div.innerHTML = "<input type='text' id='" + id + "'></input>"; // append text node to the DIV
	cell.innerHTML = "<input type='text' id='" + id + "' value=\"0\"></input>"
}