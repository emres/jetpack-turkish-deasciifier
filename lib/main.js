var contextMenu = require("context-menu");
var data = require("self").data;
var tabs = require("tabs");
var selection = require("selection");
var deasciifier = require("deasciifier");

var dea = new deasciifier.Deasciifier();
var rea = new deasciifier.Asciifier();

exports.main = function(options, callbacks) {
    console.log(options.loadReason);

    var deasciifySelection = contextMenu.Item({         
         
         label: "Convert selected text into Turkish (deasciify)",

         context : contextMenu.SelectionContext(),
         
         contentScript: 'self.on("click", function (node) {'
             + '  var text = window.getSelection().toString();'
             + '  self.postMessage(text);'
             + '});', 

         onMessage: function(text) {
             if (text.length == 0) {
                 throw ("Text to convert must not be empty!");
             }
             selection.text = dea.deasciify(text);
         }
     });

    var asciifySelection = contextMenu.Item({         
         
         label: "Convert selected text into ASCII (asciify)",

         context : contextMenu.SelectionContext(),
         
         contentScript: 'self.on("click", function (node) {'
             + '  var text = window.getSelection().toString();'
             + '  self.postMessage(text);'
             + '});', 

         onMessage: function(text) {
             if (text.length == 0) {
                 throw ("Text to convert must not be empty!");
             }
             selection.text = rea.asciify(text);
         }
     });
    
    var deasciifyItem = contextMenu.Item({

         label: "Convert to Turkish (deasciify)",

         context : contextMenu.SelectorContext("input[type=text], textarea"),

         contentScriptFile: data.url('deasciify-content-script.js')
     });

    var asciifyItem = contextMenu.Item({

         label: "Convert to ASCII (asciify)",

         context : contextMenu.SelectorContext("input[type=text], textarea"),

         contentScriptFile: data.url('asciify-content-script.js')
     });
};


exports.onUnload = function (reason) {
  console.log(reason);
};

/*
 * TO DO: Key press events section below should be modified to work with the
 * latest version of Add-on SDK, probably using 'hotkeys' API. 
 */

    // Add keypress event listener to the current tab 
    // after the web page is loaded and ready
//     tabs.onReady.add(
// 	function(tab) {
// 		tab.contentWindow.addEventListener('keypress', 
// 										   function(e) {
//  											   if (e.metaKey && e.charCode == 84) { 
//  												   // run code for WindowsKey + Shift + t
// 												   tab.contentDocument.activeElement.value = dea.deasciify(tab.contentDocument.activeElement.value);
// 											   }
// 										   }, 
// 										   false								 
// 										  );
// });
