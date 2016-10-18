		// This function is called whenever the drop down list value for gift type is changed.
		function giftType() {
		  var option = document.getElementById("types").value;
		  if (option == "all") {
		    window.location = "allproducts.html";
		  }
		  if (option == "practical") {
		    window.location = "practical.html";
		  }
		  if (option == "special") {
		    window.location = "special.html";
		  }
		  if (option == "funny") {
		    window.location = "funny.html";
		  }
		  if (option == "luxury") {
		    window.location = "luxury.html";
		  }

		}

		// This function is called whenever the page loads. See how it reads in the cookies
		function setup() {
		  type = getCookie("practical");
		  option = document.getElementById("types");
		  window.location = type;

		}

		// This function will create a cookie for you. You don't need to understand the code in here,
		// just know how to call it
		function createCookie(name, value, expiredays) {
		  var todayDate = new Date();
		  todayDate.setDate(todayDate.getDate() + expiredays);
		  document.cookie = name + "=" + value + "; expires=" + todayDate.toGMTString() + ";";
		}

		// This function will read a cookie for you. You don't need to understand the code in here,
		// just know how to call it
		function getCookie(cookieToFind) {
		  var myCookies = document.cookie.length;
		  var c = getCookie("practical");
		  var individualCookies = document.cookie.split(';');
		  for (var i = 0; i < individualCookies.length; i++) {
		    var oneCookie = individualCookies[i].split("=");
		    var name = oneCookie[0];
		    name = name.replace(/^\s+|\s+$/g, '');
		    var value = oneCookie[1];
		    if (name == cookieToFind) {
		      return value;
		    }
		  }
		  return "";
		}