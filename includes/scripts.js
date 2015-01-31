var imgsManagerArray;
var imgsManagerIdsArray;
var foodArray = [];
var existFood = [];
var grocerieObj;
var image;
var i = 0, clicks = 0;
window.onload = function() {
	imgsManagerArray = [fruitsAndVedgArray, milkArray, CannedFoodArray, meatArray, breadArray, oilArray, drinksArray];
	imgsManagerIdsArray = new Array("fruitsAndVedg", "milk", "CannedFood", "meat", "bread", "oil", "drinks");
	arraySize = imgsManagerArray.length;
	for (var i = 0; i < arraySize; i++) {
		new ImgsManager(imgsManagerArray[i], imgsManagerIdsArray[i]);
	}

};

var fruitsAndVedgArray = new Array("images/tapuah.png", "images/tapuah yonatan.png", "images/banana.png", "images/tapuz shmuti.png", "images/tapuz valensiya.png", "images/klemantina.png", "images/eshkolit.png", "images/agvaniya.png", "images/melafefon.png", "images/pilpel yarok.png", "images/pilpel yarok bahir.png", "images/pilpel yarok kehe.png", "images/shauit yaruka.png", "images/agas.png", "images/afarsek.png", "images/mishmesh.png", "images/shezif sagol.png", "images/shezif zahov.png", "images/anavom shorim.png", "images/anavim yarukim.png", "images/kruvit.png", "images/hazil.png", "images/gezer.png", "images/tapuah adama.png", "images/tiras 2.png", "images/mango.png", "images/avokado.png", "images/melon galya.png", "images/avatiah.png", "images/afarsemon.png", "images/limon.png", "images/bazal.png", "images/hasa.png", "images/kruv lavan.png", "images/agvaniot shery.png", "images/znon.png");
var milkArray = new Array("images/halav be sakit.png", "images/yogurt tevi.png", "images/shamenet hamuza.png", "images/tahlif halav.png", "images/koteg.png", "images/hema.png", "images/leben.png", "images/gvina levana.png", "images/bezim medium.png", "images/bezim larj.png");
var CannedFoodArray = new Array("images/afunat gina.png", "images/tiras.png", "images/resek sgvaniot.png", "images/salat hazilim.png", "images/salat humus.png", "images/zeitim be mishkal.png");
var meatArray = new Array("images/haze of.png", "images/karpion.png", "images/file nesihat ha nilus.png", "images/pastrama.png", "images/basar bakar haze.png", "images/basar bakar zlaot.png", "images/naknikiot.png", "images/of tari.png", "images/of kafu.png");
var breadArray = new Array("images/hala.png", "images/biskuitim.png", "images/itriot.png", "images/orez ragil.png", "images/orez male.png", "images/kornfleks.png", "images/spagety.png", "images/leham lavan ahid.png", "images/lehem ahid kehe.png");
var oilArray = new Array("images/shemen soya.png", "images/margarina.png", "images/margarina le mericha.png", "images/shemen zait.png", "images/te.png", "images/kafe shahor.png", "images/kafe names.png", "images/avkat kakao.png", "images/sugar.png", "images/riba.png", "images/konfetura.png", "images/sukariot toffi.png", "images/shokolad.png");
var drinksArray = new Array("images/bira levana.png", "images/mashke mugaz.png", "images/mashke pri hadar.png", "images/brendy.png");

function Img(imgSrc, id) {
	//global var. anyone can access it
	var linkObj = document.createElement("a");
	var imgObj = document.createElement("img");
	linkObj.setAttribute('href', "#");
	linkObj.setAttribute('onclick', "clicks()");
	linkObj.setAttribute('id', i);
	foodArray.push({
		id : i,
		count : 0
	});
	imgObj.setAttribute("src", imgSrc);
	imgObj.className = 'groceries';
	linkObj.appendChild(imgObj);
	i++;
	//private func
	//Add the img to the 'section'
	document.getElementById(id).appendChild(linkObj);
	linkObj.onclick = function() {
		var idObj = linkObj.getAttribute('id');
		var product = null;
		foodArray[linkObj.getAttribute('id')].count += 1;
		if ($.inArray(imgSrc, existFood) == -1)//if the img not exist in the whiteboard
		{
			existFood.push(imgSrc);

			$WhiteBoardProduct = $("<section>").attr("id", idObj + "section").appendTo("#whiteBoard").addClass("sectionWhiteBoard");

			$buttons = $('<section>').appendTo($WhiteBoardProduct).addClass("plusMinusButtons");
			$plus = $("<a val='+' href='#'><img src='images/up.png'></a>").appendTo($buttons);
			$minus = $("<a  val='-' href='#'><img src='images/down.png'></a>").appendTo($buttons);

			//plus
			$($plus).click(function() {
				foodArray[idObj].count += 1;
				$("input[type='textbox'][id='" + idObj + "']").val(foodArray[idObj].count);
			});

			//minus
			$($minus).click(function() {
				if (foodArray[idObj].count > 1)
					foodArray[idObj].count -= 1;
				$("input[type='textbox'][id='" + idObj + "']").val(foodArray[idObj].count);
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
					var index = existFood.indexOf(imgSrc);
					if (index > -1) {
						existFood.splice(index, 1);
					}
				});
			});

		} else {//the obj is not in the exist array
			$("input[type='textbox'][id='" + idObj + "']").val(foodArray[linkObj.getAttribute('id')].count);
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


/*
 $(document).ready(function() {
 var width = $(document).width();
 $('footer').css('width', width + 'px');
 });

 $(document).ready(function() {
 function autoResizeDiv()
 {
 $('main').css('height',window.innerHeight + 'px');
 }
 window.onresize = autoResizeDiv;
 autoResizeDiv();
 });*/