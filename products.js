// This is a DOM node which represents the XML document
var xmlDoc;

// This function downloads an XML document from the server,
// parses it, and presents the parsed document as a DOM tree
function load(url) {
  var xmlHTTP;
  if (window.XMLHttpRequest) {
    xmlHTTP = new XMLHttpRequest();
  } else {
    xmlHTTP = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlHTTP.open("GET", url, false);
  xmlHTTP.send(null);
  parser = new DOMParser();
  xmlDoc = parser.parseFromString(xmlHTTP.responseText, "application/xml");
}

// This function evaluates an XPath expression against the DOM tree of the
// XML document and returns a text result. It is useful for getting attributes
// and text values.
function getSimpleText(path) {
  // For Internet Explorer, use the following...
  if (window.ActiveXObject) {
    var node = xmlDoc.selectSingleNode(path);
    return node.childNodes[0].nodeValue;
  }
  // For all other browsers, use the following...
  else {
    var snapshot = xmlDoc.evaluate(path, xmlDoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    return snapshot.snapshotItem(0).textContent;
  }
}

// Every time the user changes their gift choice, this function is called.
function update_gift() {
  // Find out which gift has been selected
  var giftID = document.getElementById("selected_gift").value;
  // Download the XML document e.g. practical.xml... 
  load(giftID + '.xml');

  // ...find the name of the team from the XML document, and update the
  // table cell in the body which is called product_name...
  document.getElementById('product_name').innerHTML = getSimpleText("/gift/@name");
  // and likewise for all the others.
  document.getElementById('description').innerHTML = getSimpleText("/gift/description");
  document.getElementById('price').innerHTML = getSimpleText("/gift/price");
  document.bgColor = getSimpleText("/gift/colours/@main");
  document.fgColor = getSimpleText("/gift/colours/@second");
}

// Canvas is here, to give the user a voucher code: 
//https://www.codementor.io/javascript/tutorial/how-to-make-a-write-on-effect-using-html5-canvas-and-javascript-only
function myVoucher() {
  // get 2D context
  var ctx = document.querySelector("canvas").getContext("2d"),

    dashLen = 220,
    dashOffset = dashLen,
    speed = 10,
    txt = "  10% OFF CODE: HAPPY",
    // start position for x and iterator
    x = 25,
    i = 0;

  ctx.font = "50px Phosphate, Verdana";

  // thickness of the line
  ctx.lineWidth = 4;
  // to avoid spikes we can join each line with a round joint
  ctx.lineJoin = "round";

  // increase realism letting background (f.ex. paper) show through
  ctx.globalAlpha = 2 / 3;

  // some color, lets use a black pencil
  ctx.strokeStyle = ctx.fillStyle = "white";
  (function loop() {
    // clear canvas for each frame
    ctx.clearRect(x, 0, 60, 150);

    // calculate and set current line-dash for this char
    ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]);

    // reduce length of off-dash
    dashOffset -= speed;

    // draw char to canvas with current dash-length
    ctx.strokeText(txt[i], x, 90);

    // char done? no, the loop
    if (dashOffset > 0) requestAnimationFrame(loop);
    else {

      // ok, outline done, lets fill its interior before next
      ctx.fillText(txt[i], x, 90);

      // reset line-dash length
      dashOffset = dashLen;

      // get x position to next char by measuring what we have drawn
      // notice we offset it a little by random to increase realism
      x += ctx.measureText(txt[i++]).width + ctx.lineWidth * Math.random();

      // lets use an absolute transform to randomize y-position a little
      ctx.setTransform(1, 0, 0, 1, 0, 3 * Math.random());

      // and just cause we can, rotate it a little too to make it even
      // more realistic
      ctx.rotate(Math.random() * 0.005);

      // if we still have chars left, loop animation again for this char
      if (i < txt.length) requestAnimationFrame(loop);
    }
  })();
} //end of function