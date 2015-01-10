window.onload = function() {

}
var arrImgs = new Array("images/tapuah.png", "images/tapuah yonatan.png");

function Img(iCurrentImg) {
	//global var. anyone can access it
	var imgObj = document.createElement("a");
	imgObj.setAttribute('href', "#");
	// private.

	imgObj.src = arrImgs[iCurrentImg];

	imgObj.className = "perotAndYerakot";
	imgObj.style.background = url(imgObj.src);

	//private func
	var appendImg = function() {
		imgObj.addEventListener('click', onMinimize);
		//register event
		//Add the img to the 'body'
		document.getElementsByTagName("perotAndYerakotSign")[0].appendChild(imgObj);
	}
	//creating event. private
	var onMinimize = function() {
		console.log("i was minimized!!");
	};

	//global function to access private var imgObj.src
	this.getImgSrc = function() {
		return (imgObj.src);
	};

	//global function to set private var imgObj.src
	this.setImgSrc = function(sPath) {
		imgObj.src = sPath;
	}
	appendImg();
}

function ImgsManager() {
	var iImgsNum = arrImgs.length();
	//The number of images to create

	//Creates the imgs
	for (var i = 0; i < iImgsNum; i++) {
		//Create new img instance
		var img = new Img(i);
		console.log("img " + i + " src is: " + img.getImgSrc());
	}
};
var imgsManager = new ImgsManager();
})();