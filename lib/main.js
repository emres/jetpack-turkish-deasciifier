var contextMenu = require("context-menu");
var tabs = require("tabs");
var selection = require("selection");
var deasciifier = require("deasciifier");

var dea = new deasciifier.Deasciifier();
var rea = new deasciifier.Asciifier();

// Create a new context menu item.
var deasciifyItem = contextMenu.Item({

  label: "Convert to Turkish",

  // A CSS selector. Matching on this selector triggers the
  // display of our context menu.

  // context: "input[type=text]",
  context: "input[type=text], textarea",

  // When the context menu item is clicked, perform a change
  onClick: function (contextObj, item) {
			var textBox = contextObj.node;
			textBox.value = dea.deasciify(textBox.value);
			//console.log("selected text:" + selection.text);
  }
});

var asciifyItem = contextMenu.Item({

  label: "Convert to pure ASCII",

  // A CSS selector. Matching on this selector triggers the
  // display of our context menu.

  // context: "input[type=text]",
  context: "input[type=text], textarea",

  // When the context menu item is clicked, perform a change
  onClick: function (contextObj, item) {
			var textBox = contextObj.node;
			textBox.value = rea.asciify(textBox.value);
  }
});

// Add menu items to the application's context menu.
contextMenu.add(deasciifyItem);
contextMenu.add(asciifyItem);
