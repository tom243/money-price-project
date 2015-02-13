var imgsManagerArray;
var imgsManagerIdsArray;
var foodArray = [];
var existFood = [];
var grocerieObj;
var image;
var i = 0, clicks = 0, k = 0, idP = 0;
var jsonProducts = [];
var yearsArray = [];
var objects = [];
var salaryArray = [];
var allProductsArray = [];
var amountOfProducts = [];
var firstTimeContinue = true;
$.getJSON("jsons/objects.json", function(data) {
	$.each(data, function(key, val) {
		objects.push(key);
		$.each(val, function(key2, val2) {
			jsonProducts.push([val2.image, val2.id]);
		});
	});
});

$.getJSON("jsons/salary.json", function(data) {
	$.each(data, function(key, val) {
		$.each(val, function(key2, val2) {
			salaryArray.push(val2);
			//salary each year
			yearsArray.push(parseInt(key));
			//years 1986-2013
		});
	});
});

$.getJSON("jsons/allProducts.json", function(data) {
	$.each(data, function(key, val) {
		//key = year
		//val = all the object in the year
		for ( i = 0; i < yearsArray.length; i++) {

			if (key == yearsArray[i]) {
				allProductsArray[i] = [];
				$.each(val, function(key2, val2) {
					//key2 = name
					//val2 = price
					allProductsArray[i].push([key2, val2]);
					//name,price
				});
			}
		}
	});
	//console.log(allProductsArray);
});

window.onload = function() {

	imgsManagerArray = [fruitsAndVedgArray, milkArray, CannedFoodArray, meatArray, breadArray, oilArray, drinksArray];
	imgsManagerIdsArray = new Array("fruitsAndVedg", "milk", "CannedFood", "meat", "bread", "oil", "drinks");
	arraySize = imgsManagerArray.length;
	for (var i = 0; i < arraySize; i++) {
		new ImgsManager(imgsManagerArray[i], imgsManagerIdsArray[i]);
	}

	$('#continue').on('click', function() {
		firstTimeContinue = true;
		$('#d3').empty();
		objectsFunc();
	});
};

var fruitsAndVedgArray = new Array("images/tapuah.png", "images/tapuah yonatan.png", "images/banana.png", "images/tapuz shmuti.png", "images/tapuz valensiya.png", "images/klemantina.png", "images/eshkolit.png", "images/agvaniya.png", "images/melafefon.png", "images/pilpel yarok bahir.png", "images/pilpel yarok kehe.png", "images/shauit yaruka.png", "images/agas.png", "images/afarsek.png", "images/shezif sagol.png", "images/shezif zahov.png", "images/anavom shorim.png", "images/anavim yarukim.png", "images/kruvit.png", "images/hazil.png", "images/gezer.png", "images/tapuah adama.png", "images/tiras 2.png", "images/mango.png", "images/avokado.png", "images/melon galya.png", "images/avatiah.png", "images/afarsemon.png", "images/limon.png", "images/bazal.png", "images/hasa.png", "images/kruv lavan.png", "images/agvaniot shery.png", "images/znon.png");
var milkArray = new Array("images/halav be sakit.png", "images/yogurt tevi.png", "images/shamenet hamuza.png", "images/tahlif halav.png", "images/koteg.png", "images/hema.png", "images/leben.png", "images/gvina levana.png", "images/bezim medium.png", "images/bezim larj.png");
var CannedFoodArray = new Array("images/afunat gina.png", "images/tiras.png", "images/resek sgvaniot.png", "images/salat hazilim.png", "images/salat humus.png", "images/zeitim be mishkal.png");
var meatArray = new Array("images/haze of.png", "images/karpion.png", "images/file nesihat ha nilus.png", "images/pastrama.png", "images/basar bakar haze.png", "images/basar bakar zlaot.png", "images/naknikiot.png", "images/of tari.png", "images/of kafu.png");
var breadArray = new Array("images/hala.png", "images/biskuitim.png", "images/itriot.png", "images/orez ragil.png", "images/orez male.png", "images/kornfleks.png", "images/spagety.png", "images/leham lavan ahid.png", "images/lehem ahid kehe.png");
var oilArray = new Array("images/shemen soya.png", "images/margarina.png", "images/margarina le mericha.png", "images/shemen zait.png", "images/te.png", "images/kafe shahor.png", "images/kafe names.png", "images/avkat kakao.png", "images/sugar.png", "images/riba.png", "images/konfetura.png", "images/sukariot toffi.png", "images/shokolad.png");
var drinksArray = new Array("images/bira levana.png", "images/mashke mugaz.png", "images/mashke pri hadar.png", "images/brendy.png");

function Img(imgSrc, id) {

	//global var. anyone can access it
	var linkObj = document.createElement("a");
	linkObj.className = 'groceriesLinks';
	var imgObj = document.createElement("img");
	var circleCount = document.createElement("section");
	circleCount.className = 'circlesCounter';
	circleCount.id = 'circleCounter' + idP;
	var clickOnProduct = document.createElement("p");
	clickOnProduct.className = 'numberOfClicks';
	clickOnProduct.id = "productClicks" + idP;
	circleCount.appendChild(clickOnProduct);
	linkObj.setAttribute('href', "#");
	linkObj.setAttribute('onclick', "clicks()");
	linkObj.setAttribute('id', idP);
	foodArray.push({
		id : idP,
		count : 0
	});
	imgObj.setAttribute("src", imgSrc);
	imgObj.className = 'groceries';
	linkObj.appendChild(imgObj);
	linkObj.appendChild(circleCount);
	idP++;

	//$("#country.save")...

	//private func
	//Add the img to the 'section'
	document.getElementById(id).appendChild(linkObj);
	linkObj.onclick = function() {
		var idObj = linkObj.getAttribute('id');
		var product = null;
		foodArray[linkObj.getAttribute('id')].count += 1;
		$("#circleCounter" + idObj).css("display", "block");
		$("#productClicks" + idObj).html(foodArray[idObj].count);
		if ($.inArray(imgSrc, existFood) == -1)//if the img not exist in the whiteboard
		{
			existFood.push(imgSrc);
			amountOfProducts.push(idObj);

			$WhiteBoardProduct = $("<section>").attr("id", idObj + "section").appendTo("#whiteBoard").addClass("sectionWhiteBoard");

			$buttons = $('<section>').appendTo($WhiteBoardProduct).addClass("plusMinusButtons");
			$plus = $("<a val='+' href='#'><img src='images/up.png'></a>").appendTo($buttons);
			$minus = $("<a  val='-' href='#'><img src='images/down.png'></a>").appendTo($buttons);

			//plus
			$($plus).click(function() {
				foodArray[idObj].count += 1;
				$("input[type='textbox'][id='" + idObj + "']").val(foodArray[idObj].count);
				$("#productClicks" + idObj).html(foodArray[idObj].count);
			});

			//minus
			$($minus).click(function() {
				if (foodArray[idObj].count > 1)
					foodArray[idObj].count -= 1;
				$("input[type='textbox'][id='" + idObj + "']").val(foodArray[idObj].count);
				$("#productClicks" + idObj).html(foodArray[idObj].count);
			});

			//number
			$('<input />', {
				type : 'textbox',
				id : linkObj.getAttribute('id'),
				val : foodArray[linkObj.getAttribute('id')].count
			}).appendTo($WhiteBoardProduct);

			//product name
			$.getJSON("jsons/objects.json", function(data) {
				$.each(data, function(key, val) {
					$.each(val, function(key2, val2) {
						//	alert("key: " + key2 + " val: " + val2.image);
						if (val2.image == imgSrc) {
							$("<p>" + val2.name + "</p>").appendTo($WhiteBoardProduct).addClass("products");
						}

					});
				});

				$hoverSectionWhiteBorad = $("<a href=# id=" + idObj + "type></a>").appendTo($WhiteBoardProduct).addClass("WhiteBoardHover");
				$($WhiteBoardProduct).hover(function() {
					if ($("#" + idObj + "type").css('display') == 'none')
						$("#" + idObj + "type").css("display", "block");
					else
						$("#" + idObj + "type").css("display", "none");
				});
				$("#" + idObj + "type").click(function() {
					$("#" + idObj + "section").remove();
					foodArray[idObj].count = 0;

					$("#circleCounter" + idObj).css("display", "none");

					var indexImg = existFood.indexOf(imgSrc);
					if (indexImg > -1) {
						existFood.splice(indexImg, 1);
					}
					var indexId = amountOfProducts.indexOf(idObj);
					if (indexId > -1) {
						amountOfProducts.splice(indexId, 1);
					}

				});
			});

		} else {//the obj is not in the exist array
			$("input[type='textbox'][id='" + idObj + "']").val(foodArray[linkObj.getAttribute('id')].count);
			//console.log(foodArray[idObj].count);
		}
	};
};

function ImgsManager(groceryArray, id) {
	var iImgsNum = groceryArray.length;

	//The number of images to create

	//Creates the imgs
	for (var i = 0; i < iImgsNum; i++) {
		//Create new img instance
		var img = new Img(groceryArray[i], id);
	}
};

function objectsFunc() {
	var productsIds = [];
	var sumBillArray = [];
	var sumArray = [];
	var existFoodLength = existFood.length;
	var fruitsAndVedgLength = fruitsAndVedgArray.length;
	var jsonProductsLength = jsonProducts.length;
	var i = 0, j = 0;

	//initialize the length of yearsArray
	for ( i = 0; i < yearsArray.length; i++) {
		sumArray.push(0);
	}

	for ( i = 0; i < existFoodLength; i++) {
		for ( j = 0; j < jsonProductsLength; j++) {
			if (existFood[i] == jsonProducts[j][0]) {
				productsIds.push(jsonProducts[j][1]);
			}
		}
	}
	//console.log("productsIds = " + productsIds);

	for ( i = 0; i < productsIds.length; i++) {
		sumBillArray[i] = [];
		for ( j = 0; j < allProductsArray.length; j++) {
			for ( k = 0; k < allProductsArray[j].length; k++) {
				if (productsIds[i] == allProductsArray[j][k][0]) {
					sumBillArray[i].push(allProductsArray[j][k][1]);
				}
			}
		}
	}
	//console.log("sumBillArray = " + sumBillArray);
	for ( i = 0; i < amountOfProducts.length; i++) {
		for ( j = 0; j < yearsArray.length; j++)
			sumBillArray[i][j] *= foodArray[amountOfProducts[i]].count;
		//console.log("sumBillArray = " + sumBillArray[i][j]);
		//console.log("counter = " + foodArray[amountOfProducts[i]].count);
	}
	//console.log("sumBillArray = " + sumBillArray);
	for ( i = 0; i < sumBillArray.length; i++) {
		for ( j = 0; j < sumBillArray[i].length; j++) {
			sumArray[j] += sumBillArray[i][j];
		}
	}

	//console.log("sumArray = " + sumArray);

	for ( i = 0; i < yearsArray.length; i++) {
		sumArray[i] = (sumArray[i] / salaryArray[i]) * 4;
	}

	readyJson(sumArray);
}

///////////////////////////////////////////////////////// D3 /////////////////////////////////////////////////////////

function readyJson(sumArray) {
	var data = [];

	var click;
	var selected_year = 2013;
	var margin = {
		top : 20,
		right : 20,
		bottom : 30,
		left : 50
	}, width = 1024 - margin.left - margin.right, height = 400 - margin.top - margin.bottom;

	var parseDate = d3.time.format("%d-%b-%y").parse;

	var x = d3.scale.linear().range([0, width]);

	var y = d3.scale.linear().range([height, 0]);

	//	var xAxis = d3.svg.axis().scale(x).orient("bottom");

	//var yAxis = d3.svg.axis().scale(y).orient("left");

	var line = d3.svg.line().x(function(d) {
		return x(d[0]);
	}).y(function(d) {
		return y(d[1]);
	});
	var svg = d3.select("#d3").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	var yearsArrayLength = yearsArray.length;

	for (var i = yearsArrayLength - 1; i >= 0; i--) {
		data.push([yearsArray[i], sumArray[i]]);
	}//data = [[2013,9000],[2012,8000]]

	x.domain(d3.extent(data, function(d) {
		return d[0];
	}));
	y.domain(d3.extent(data, function(d) {
		return d[1];
	}));

	//svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);

	//svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Price ($)");

	svg.append("path").datum(data).attr("class", "line").attr("d", line);

	svg.selectAll(".point").data(data).enter().append("svg:circle").attr("class", "point").attr("cx", function(d) {
		return x(d[0]);
	}).attr("cy", function(d) {
		return y(d[1]);
	});

	function set_radius() {
		svg.selectAll(".point").data(data).attr("r", function(d) {
			if (d[0] != selected_year) {
				return 9;
			} else {
				return 18;
			}
		});
	}

	if ($('#precentage').length == 0 && firstTimeContinue == true) {
		firstTimeContinue = false;
		console.log("firstTimeContinue");
		click = 0;
		$("#d3").append("<p id='precentage'>" + (data[click][1] * 100).toPrecision(5) + "% </p>");
		$("#d3").append("<p id='year'>" + data[click][0] + "</p>");
		set_radius();
	}
	$('#d3').unbind('click').on('click', function() {
		click++;
		$("#precentage").html((data[click][1] * 100).toPrecision(5) + "%");
		$("#year").html(data[click][0]);
		selected_year -= 1;
		if (selected_year == 2013) {
			selected_year -= 1;
		}
		set_radius();
	});
}

////////////////////////////////////////// CART /////////////////////////////////////

$(document).ready(function(e) {

	$('#draggable2').on('click', function() {
		var x = $("#draggable2").offset().left;
		var y = $("#draggable2").offset().top;
		console.log('x: ' + x + ' y: ' + y);
	});

});
$(function() {
	$("#draggable2").draggable({
		axis : "x"
	});

	$("#draggable2").draggable({
		containment : "#d3Container",
		scroll : false
	});


});




window.onscroll = function (event) {
  // called when the window is scrolled.
  alert("asd");
}











