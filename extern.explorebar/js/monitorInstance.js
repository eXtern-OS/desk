var win = nw.Window.get();

let setDeskasDesktop = (winID) => {
	var winType = "DESKTOP";
	console.log("setDeskasDesktop",winID);
    var exec = require('child_process').exec,
                   child;
            child = exec(`xprop -id ${winID} -f _NET_WM_WINDOW_TYPE 32a -set _NET_WM_WINDOW_TYPE _NET_WM_WINDOW_TYPE_${winType} && xprop -id ${winID} -f _MOTIF_WM_HINTS 32c -set _MOTIF_WM_HINTS 0 && xprop -id ${winID} -remove _MOTIF_WM_HINTS`);
}

let getWindowID = (winTitle,callback) => {
    var exec = require('child_process').exec,
                   child;
    child = exec(`xdotool search --name "${winTitle}"`,function (error, stdout, stderr) {
		if (error !== null) {
			console.log('exec error: ' + error);
		} else {
			callback(stdout.replace(/(\r\n\t|\n|\r\t)/gm,""));
		}
	});
}

const commsChannel = new BroadcastChannel("monitorInstance");
commsChannel.onmessage = function (ev) {
	if (ev.data.type == "change-wallpaper") {
		$("#background")[0].style.backgroundImage = ev.data.data;
		$("#background")[0].style.backgroundSize = win.width+"px "+win.height+"px";
		$("#body_settings").removeClass("hiddenOpacity");
		win.show();
		$("title").text(`eXtern Desktop Extend ${win.cWindow.id}`);
		getWindowID("eXtern Desktop Extend",setDeskasDesktop);
	}
}
		
commsChannel.postMessage({type: "request-wallpaper"});
