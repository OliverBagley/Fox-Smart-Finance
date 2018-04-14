google.charts.load('current', {'packages':['corechart']});

	var total_in = 0;
	var total_expense = 0;


function calculate(){ 
	var total_in = 0;
	var total_expense = 0;

	$("input[id*='income_']").each(function(){
		total_in += +$(this).val();
	});

	$("input[id*='expense_']").each(function(){
		total_expense += +$(this).val();
	});

	$('#total_in').html(total_in); 
	$('#total_expense').html(total_expense); 
	$('#total_all').html(total_in - total_expense); 

	var total_all = total_in - total_expense;

	if (total_all >= 0) {
		$("#total_all_format").addClass("positive");
	} else {
		$("#total_all_format").addClass("negative");
	}

	$('#prompt').slideUp('slow');
	$('#graph_set').slideDown('slow');
	$('#total').slideDown('slow');
};

function calculate_income(){ 
	var incomename = document.getElementsByClassName("incomename"); 
	var incomenames = Array.prototype.map.call(incomename, function(el) {
		return el.value;
	});

	var incomeinput = document.getElementsByClassName("incomeinput"); 
	var incomevalues = Array.prototype.map.call(incomeinput, function(el) {
		return el.value;
	});

	var optionsincome = {is3D: true, backgroundColor: '#efefef', 'chartArea': {'width': '100%', 'height': '80%'}, colors: ['#00A3B4', '#1AACBC', '#34B5C4', '#4EBECC', '#68C7D4', '#82D0DC', '#9CD9E4', '#B6E2EC', '#D0EBF4', '#EAF4FC']};

	var incomedata = new google.visualization.DataTable();
	incomedata.addColumn('string', 'incomenames');
	incomedata.addColumn('number', 'incomevalues');

	for(i = 0; i < incomenames.length; i++)
		incomedata.addRow([String(incomenames[i]), Number(incomevalues[i])]);

		// Create and draw the visualization.
		new google.visualization.PieChart(document.getElementById('chart_div_income')).
		draw(incomedata, optionsincome);
	};

function calculate_expense(){ 
	var expensename = document.getElementsByClassName("expensename"); 
	var expensenames = Array.prototype.map.call(expensename, function(el) {
		return el.value;
	});

	var expenseinput = document.getElementsByClassName("expenseinput"); 
	var expensevalues = Array.prototype.map.call(expenseinput, function(el) {
		return el.value;
	});

	var optionsexpense = {is3D: true, backgroundColor: '#efefef', 'chartArea': {'width': '100%', 'height': '80%'}, colors: ['#F16F0C', '#F27D24', '#F38B3C', '#F49954',	'#F5A76C', '#F6B584', '#F7C39C', '#F8D1B4', '#F9DFCC', '#FAEDE4']};

	var expensedata = new google.visualization.DataTable();
	expensedata.addColumn('string', 'expensenames');
	expensedata.addColumn('number', 'expensevalues');

	for(i = 0; i < expensenames.length; i++)
		expensedata.addRow([String(expensenames[i]), Number(expensevalues[i])]);

		// Create and draw the visualization.
		new google.visualization.PieChart(document.getElementById('chart_div_expense')).
		draw(expensedata, optionsexpense);
	};


var counterincome = 1;
var counterexpense = 1;
var limitincome = 9;
var limitexpense = 9;

	function addincome(income){

		if (counterincome <= limitincome) {

		$("[id*='addbtnincome']").hide();
		$(".incomename").addClass("borderless");
		$(".incomeinput").addClass("borderless");
		var newdiv = document.createElement('div');
		newdiv.innerHTML = "<div class='input-group mt-1'><input type='text' class='form-control incomename' placeholder='Descripton'><input type='number' class='form-control incomeinput' id='income_" + (counterincome + 1) + "' aria-label='Small' aria-describedby='inputGroup-sizing-sm' placeholder='Amount'><div class='input-group-append'><button id='addbtnincome' class='btn btn-outline-secondary' onClick=\"addincome(\'income\');\" type='button'>Add</button></div></div>";
		document.getElementById(income).appendChild(newdiv);
		counterincome++;
		eval("var income_" + counterincome + "= Number($('#income_" + (counterincome) + "').val()); ");
		calculate_income();

		} else {

		$("[id*='addbtnincome']").hide();
		$(".incomename").addClass("borderless");
		$(".incomeinput").addClass("borderless");
		$('#warnincome').slideDown('slow');
		setTimeout(function () {$('#warnincome').slideUp('slow');}, 5000);

	}};


	function addexpense(expense){

		if (counterexpense <= limitexpense) {

		$("[id*='addbtnexpense']").hide();
		$(".expensename").addClass("borderless");
		$(".expenseinput").addClass("borderless");
		var newdiv = document.createElement('div');
		newdiv.innerHTML = "<div class='input-group mt-1'><input type='text' class='form-control expensename' placeholder='Descripton'><input type='number' class='form-control expenseinput' id='expense_" + (counterexpense + 1) + "' aria-label='Small' aria-describedby='inputGroup-sizing-sm' placeholder='Amount'><div class='input-group-append'><button id='addbtnexpense' class='btn btn-outline-secondary' onClick=\"addexpense(\'expense\');\" type='button'>Add</button></div></div>";
		document.getElementById(expense).appendChild(newdiv);
		counterexpense++;
		eval("var expense_" + counterexpense + "= Number($('#expense_" + (counterexpense) + "').val()); ");
		calculate_expense();

		} else {

		$("[id*='addbtnexpense']").hide();
		$(".expensename").addClass("borderless");
		$(".expenseinput").addClass("borderless");
		$('#warnexpense').slideDown('slow');
		setTimeout(function () {$('#warnexpense').slideUp('slow');}, 5000);

	}};

	$(document).on('keyup', "input",function () {
		$("[id*='expense_']").keyup(function(){
			calculate(); calculate_expense(); 
		});
		$("[id*='income_']").keyup(function(){
			calculate(); calculate_income(); calculate_expense(); 
		});
	});

