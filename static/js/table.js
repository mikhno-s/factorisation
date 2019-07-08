// function save_row(no)
// {
// 	var name_val=document.getElementById("name_text"+no).value;
// 	var country_val=document.getElementById("country_text"+no).value;
// 	var age_val=document.getElementById("age_text"+no).value;

// 	document.getElementById("name_row"+no).innerHTML=name_val;
// 	document.getElementById("country_row"+no).innerHTML=country_val;
// 	document.getElementById("age_row"+no).innerHTML=age_val;

// 	document.getElementById("edit_button"+no).style.display="block";
// 	document.getElementById("save_button"+no).style.display="none";
// }

// function delete_row(no)
// {
// 	document.getElementById("row"+no+"").outerHTML="";
// }

// function add_column()
// {
// 	var new_name=document.getElementById("new_name").value;
// 	var new_country=document.getElementById("new_country").value;
// 	var new_age=document.getElementById("new_age").value;

// 	var table=document.getElementById("data_table");
// 	var table_len=(table.rows.length)-1;
// 	var row = table.insertRow(table_len).outerHTML="<tr id='row"+table_len+"'><td id='name_row"+table_len+"'>"+new_name+"</td><td id='country_row"+table_len+"'>"+new_country+"</td><td id='age_row"+table_len+"'>"+new_age+"</td><td><input type='button' id='edit_button"+table_len+"' value='Edit' class='edit' onclick='edit_row("+table_len+")'> <input type='button' id='save_button"+table_len+"' value='Save' class='save' onclick='save_row("+table_len+")'> <input type='button' value='Delete' class='delete' onclick='delete_row("+table_len+")'></td></tr>";

// 	document.getElementById("new_name").value="";
// 	document.getElementById("new_country").value="";
// 	document.getElementById("new_age").value="";
// }




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