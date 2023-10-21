var newInstance; //To be used to temporarily store the last added instance tab
var winIdNew = 0;
const currentWidth = 1920; //FIXME: remove hardcoded
const currentHeight = 1080; //FIME: remove hardcoded
let hubShowing = false;
var hubCommsChannelNew;
const extrabarCommsChannel = new BroadcastChannel("extrabareXternChannel");

newInstance = null;

function updateSlider(dontToggleVolume) {

}


var volumeSlider = $('#ex1').slider()
		.on('slide', updateSlider)
		.data('slider');

$('#ex1').slider({
	formatter: function(value) {
		return 'Current value: ' + value;
	}
});

function closeWindow(winId) {
	console.log("delete window");
	$(`#winId${winId}`).remove();
}

/**
 * Returns the latest added instance.
 * Will automatically set it to null to prevent being called again.
 * It's used for instances wanting to get a handle of their instance on load.
 *
 * @return {instanceTab}.
 */
function getInstance() {
	var returnInstance = newInstance;
	newInstance = null;
	
	return returnInstance;
}

function toggleActions(actionItem) {
	if ($(`#${actionItem}`).hasClass("open-viewer")) {
		$(`#${actionItem}`).removeClass("open-viewer");
		$("#volume-viewer > div").fadeOut();
		setTimeout(function() {
			$("#blootooth-icon").removeClass("hiddenOpacity");
		$("#net-icon").removeClass("hiddenOpacity");
		
			}, 50);
		
	} else {
		$(`#${actionItem}`).removeClass("hidden");
		$(`#${actionItem}`).addClass("open-viewer");
		$("#volume-viewer > div").fadeIn();
		setTimeout(function() {
		$("#blootooth-icon").addClass("hiddenOpacity");
		$("#net-icon").addClass("hiddenOpacity");
	}, 50);


	setTimeout(function() {
		
	}, 100);
	}
}

let localEnhancedAudio = true;
setTimeout(function() {
	if (localEnhancedAudio) {
		$('#enhancedAudioSwitchInput').parent().removeClass("switch-off"); 
			$('#enhancedAudioSwitchInput').parent().addClass("switch-on"); 
			$('#enhancedAudioSwitchInput').iCheck('update');
	} else {
		$('#enhancedAudioSwitchInput').parent().removeClass("switch-on"); 
			$('#enhancedAudioSwitchInput').parent().addClass("switch-off"); 
			$('#enhancedAudioSwitchInput').iCheck('update');
	}
	
	
	$('#enhancedAudioSwitchInput').change(function() {
	
		localEnhancedAudio = this.checked;
		console.log("changed");
		extrabarCommsChannel.postMessage({type: "changed-enahnced-audio",enhancedAudio: localEnhancedAudio});
	
	});
	}, 25000);


var winButtonProperties = { //For Beta 2 we will only use border (running out of time)
	backgroundColor: "rgba(255, 255, 255, 0)",
	hoverBackgroundColor: "rgba(255, 255, 255, 0.8)",
	borderColor: "rgba(255, 255, 255, 0.31)",
	hoverBorderColor: "rgba(255, 255, 255, 0.8)",
	textShadow: "0 0 10px rgba(0, 0, 0, 0.75);",
	color: "rgba(255, 255, 255, 1)"
}

const tabId = 0;
const appLocation = `apps/extern.photos.app/index.html`;
const hiddenOpacityClass = "";

$(".tabsBodyx").append('<div class="tab-pane overflow" style="height: 100%;" id="app_tab_'+tabId+'"> <iframe class="appContainer" src="../'+appLocation+'" frameborder="0" partition="persist:trusted" allownw class="appInstance '+hiddenOpacityClass+'"> </iframe></div>');
	$("#app_tab_"+tabId+" > iframe").load( function() {
					
					console.log("executed",this);
					$(this).contents().find("head")
      .prepend($("<style type='text/css'>  .btn { border-color: "+winButtonProperties.borderColor+" !important;}  </style> <link href='../../Shared/CoreCSS/scrollbar.css' rel='stylesheet'> <script> window.instance = parent.newInstance;  console.log('window.instance',window.instance); document.addEventListener('click', function() { console.log('focused iframe'); });</script>"));

	/*$(this.contentWindow.document.body).click(function() {
		hideInstanceTabs();
	});
	
	console.log("autoswitch: ",autoSwitch);
	
	/*if (autoSwitch)
	    	$("#app_tab_elector_"+tabId+" > a").click();*/
	//frameBody.click(function(){ /* ... */ });

	});
	//<iframe class="appContainer" src="../../'+appLocation+'" frameborder="0" partition="persist:trusted" allownw class="appInstance '+hiddenOpacityClass+'"> </iframe>
	setTimeout(function() {
	$("#hubContainter").append(`<iframe src="../Hub/hub-v2.html" frameborder="0" partition="persist:trusted" allownw> </iframe>`);
	}, 25000);


	setTimeout(function() {
		console.log("YAAAAAAAAAAY")
		hubCommsChannelNew.postMessage({type: "explorebarReady"});
		}, 95000);

	



	/*setTimeout(function() {
	$("#appsContainter").append(`<div class="appContainer animateAppOpenning"><div class="app-dragabble-Header"></div><div name="music" app-id="extern.music.app" class="appBox shortcut tile" version="0.1" developer="Anesu Chiodze" description="Play and stream local or online audio content" disk="Unavailable" accessed="209"><img src="../apps/extern.music.app/icon.svg" alt=""><div class="runIconDiv hidden"><span class="icon" style=" color:rgba(255,255,255,0.8);font-weight: bold; text-shadow: 0 0 10px rgba(255, 255, 255, 0.9);">&#61859;</span></div><p class="appTextOverflow">Music</p><p class="AppCategoryText"><span class="icon" style=" color:rgba(255,255,255,0.8); text-shadow: 0 0 10px rgba(0, 0, 0, 0.9); font-weight: bold; text-shadow: 0 0 10px rgba(0, 0, 0, 0.9);">#61859;</span> Audio</p></div><iframe src="../Shared/CoreWindow/index-v2.html" frameborder="0" partition="persist:trusted" allownw class="appInstance '+hiddenOpacityClass+'"> </iframe></div>`);
	$(".appContainer").draggable({ handle: ".app-dragabble-Header" });
}, 15000);

setTimeout(function() {
	$(".appContainer").css({top: 102, left: 110});
	$(".appContainer").addClass("openApp");
}, 25000);*/

//const appCommsChannel = new BroadcastChannel("AppLauncher"); //Comms for launching apps


const hubChannel = new BroadcastChannel("hubChannel"); //Comms channel between desktop and hub
	/*appCommsChannel.postMessage({
		type: "load-App-now",
		appName: appObj.name,
		appLocation: appPath,
		//appGeometry: new_win.appGeometry,
		argv: [],
		waitForAppToRespond: false,
		showThumbnailPreview: true
	});*/
	
	hubChannel.onmessage = function (ev) {
		console.log("message recieved hub: ",ev);
		if (ev.data.type == "open-hub") {
			hubShowing = true;
			$("#hubContainter iframe").show();
		} else if (ev.data.type == "hide-hub") {
			hubShowing = false;
			$("#hubContainter iframe").hide();
		}
	};

	function toggleShowHub () {
		if (hubShowing) {
			hubShowing = false;
			$("#hubContainter iframe").hide();
		} else {
			hubShowing = true;
			$("#hubContainter iframe").show();
		}
	}

	const allWindows = [];
	const allWindowsMap = {};


function launchApp (appName,files, appGeometry, startPos, appObj, appPath, openedCallBack) {
	const winId = winIdNew;
	winIdNew++;
	let appCommsChannel;
	console.log({appName,files, appGeometry,appPath, startPos,appObj});
	//setTimeout(function() {
		$("#appsContainter").append(`<div id="winId${winId}" class="appContainer animateAppOpenning" style="top: ${startPos.top + $("#hubContainter iframe").offset().top}px; left: ${startPos.left}px"><div class="app-dragabble-Header"></div><a href="javascript:void(0);" name="music" app-id="extern.music.app" class="appBox shortcut tile" version="0.1" developer="Anesu Chiodze" description="Play and stream local or online audio content" disk="Unavailable" accessed="209"><img src="${appObj.iconBase64}" alt=""><div class="runIconDiv hidden"><span class="icon" style=" color:rgba(255,255,255,0.8);font-weight: bold; text-shadow: 0 0 10px rgba(255, 255, 255, 0.9);">&#61859;</span></div><p class="appTextOverflow">${appObj.name}</p> <span class="icon app-settings-icon">&#61701;</span><p class="AppCategoryText hidden"><span class="icon hidden" style=" color:rgba(255,255,255,0.8); text-shadow: 0 0 10px rgba(0, 0, 0, 0.9); font-weight: bold; text-shadow: 0 0 10px rgba(0, 0, 0, 0.9);">#61859;</span> Audio</p></a><a class="newInstance" href="javascript:void(0);">+</a><iframe src="../Shared/CoreWindow/index-v2.html?winId=${winId}" frameborder="0" partition="persist:trusted" allownw class="appInstance '+hiddenOpacityClass+'"> </iframe></div>`);
		$(`#winId${winId}`).draggable({ handle: ".app-dragabble-Header" });
		
	//}, 15000);

	allWindows.push({
		id: winId,
		top: 102,
		left: (currentWidth/2) - (appObj.window.width/2),
		width: appObj.window.width,
		height: appObj.window.height
	});

	allWindowsMap[winId] = allWindowsMap.length;
	
	setTimeout(function() {
		$(`#winId${winId}`).css({top: 102, left: (currentWidth/2) - (appObj.window.width/2)});
		$(`#winId${winId}`).addClass("openApp");
		$(`#winId${winId} iframe`).css({width: appObj.window.width, height: appObj.window.height})
		//$("#hubContainter iframe").addClass("loweredOpacity");
		
	}, appName === "extern.music.app" || appName === "extern.store.app" ? 5000 : 2000);

	

	setTimeout(function() {
		$(`#winId${winId} .appBox`).css('margin-right','65px');
	}, appName === "extern.music.app" || appName === "extern.store.app" ? 6000 : 3000);

	setTimeout(function() {
		$(`#winId${winId} .newInstance`).addClass("loaded");
	}, appName === "extern.music.app" || appName === "extern.store.app" ? 6500 : 3500);

	

	setTimeout(function() {
		$(`#winId${winId} .appBox`).css('margin-right','145px');
		$(`#winId${winId} .newInstance`).css('right','95px');
		$(`#winId${winId} .appBox`).draggable({revert: true, start: function(e) {
			console.log("start dragging: ",e)
			$(e.target).addClass("blur-item");
		  },
		  drag: function(e) {
			  const position = $(e.target).position()
			console.log("dragging: ",position.left)
		  },
		  stop: function(e) {
			console.log("end dragging: ",e)
			$(e.target).removeClass("blur-item");
		  }})
	}, appName === "extern.music.app" || appName === "extern.store.app" ? 7000 : 4000);

	setTimeout(function() {
		console.log("send show controls");
		appCommsChannel.postMessage({
			type: "show-cotrols",
		});
	}, appName === "extern.music.app" || appName === "extern.store.app" ? 7500 : 4500);

	

	

	setTimeout(function() {
		$(`#winId${winId}`).removeClass("animateAppOpenning");
		$("#hubContainter iframe").hide();
	}, appName === "extern.music.app" || appName === "extern.store.app" ? 6000 : 3000);

	setTimeout(function() {
		if (openedCallBack) {
			openedCallBack();
		}
	}, appName === "extern.music.app" || appName === "extern.store.app" ? 6500 : 3500);

	setTimeout(function() {
		$(`#winId${winId} .appBox`).addClass("no-animations")
	}, appName === "extern.music.app" || appName === "extern.store.app" ? 7500 : 4500);

	

	setTimeout(function() {
		//$("#hubContainter iframe").show();
	}, 15000);

	setTimeout(function() {
		console.log("seeend")
		
		appCommsChannel = new BroadcastChannel("eXternOSApp"+winId); //Comms channel between process manager and this Aoo
	appCommsChannel.postMessage({
		type: "load-App-now",
		appName: appObj.name,
		appLocation: appPath,
		//appGeometry: new_win.appGeometry,
		argv: [],
		waitForAppToRespond: false,
		showThumbnailPreview: true
	});
	
	appCommsChannel.onmessage = function (ev) {
		console.log("message recieved MAIN: ",ev);
	
	
	
		if (ev.data.type == "start-moving-window") {
			// 
		}
	};
	}, 2000);
	
}



	//$("#appsContainter").append(`<webview id="foo" src="../Shared/CoreWindow/index-v2.html" partition='trusted' style="width:640px; height:480px" allownw></webview>`);
	//webview.showDevTools(true, [where-to-append]])

	/*setTimeout(function() {
		$("#foo")[0].showDevTools(true);
		console.log("showing dev tools")
		}, 10000);*/



//xlorbar

var quickLanchApps = [];

/* Function loads the launcher Apps on the bottom left corner of explorebar*/
function setLauncherApps() {

	console.log("we are here");
	
	var mostLanchedApps = win.systemSortedApps;
	var quickApps = [];
	
	//console.log("mostLanchedApps",mostLanchedApps);
	
		for (var i = mostLanchedApps.length-1; i > -1; i--) {
			if (quickLanchApps.length < 4 && mostLanchedApps[i][0] != "itai") {
				for (var j = 0; j < win.apps.length; j++) {
					if (win.apps[j].id == "extern."+mostLanchedApps[i][0]+".app") {
						quickLanchApps.push(win.apps[j]);
						var appName = win.apps[j].id.replace("extern.","").replace(".app","");
						quickApps[appName] = mostLanchedApps[i][1];
					}
				}
			}
		}
	
	//console.log("quickLanchApps",quickLanchApps);
	
				if (quickLanchApps[0] != null) {
					$("#launcherApp2 > img").attr("src",quickLanchApps[0].iconBase64);
					$("#launcherApp2 > img").attr("title",quickLanchApps[0].name);
					$("#launcherApp2").attr("onclick","openQuickApp(0)");
				}
	
				if (quickLanchApps[1] != null) {
					$("#launcherApp1 > img").attr("src",quickLanchApps[1].iconBase64);
					$("#launcherApp1 > img").attr("title",quickLanchApps[1].name);
					$("#launcherApp1").attr("onclick","openQuickApp(1)");
				}
	
				if (quickLanchApps[2] != null) {
					$("#launcherApp3 > img").attr("src",quickLanchApps[2].iconBase64);
					$("#launcherApp3 > img").attr("title",quickLanchApps[2].name);
					$("#launcherApp3").attr("onclick","openQuickApp(2)");
				}
	
	
			var currentPos = quickLanchApps.length;
			var donePos = -1;
	
			
	
			//console.log("currentPos",currentPos);
	
			for (var i = currentPos; i < 4 && i != 3 ; i++) {
				//console.log("iA = ",i);
				for (j = 0; j < win.apps.length; j++) {
					if (i == donePos)
						break;
					var appName = win.apps[j].id.replace("extern.","").replace(".app","");
					if (typeof win.accessedApps[appName] == 'undefined' && typeof quickApps[appName] == 'undefined' && win.apps[j].id != "extern.itai.app") {
					if (i == 0) {
						$("#launcherApp2 > img").attr("src",win.apps[j].iconBase64);
						$("#launcherApp2 > img").attr("data-original-title",win.apps[j].name);
						$("#launcherApp2").attr("onclick","openQuickApp(0)");
						quickApps[appName] = 0;
						quickLanchApps.push(win.apps[j]);
						donePos = i;
					}
	
					if (i == 1) {
						$("#launcherApp1 > img").attr("src",win.apps[j].iconBase64);
						$("#launcherApp1 > img").attr("data-original-title",win.apps[j].name);
						$("#launcherApp1").attr("onclick","openQuickApp(1)");
						quickApps[appName] = 0;
						quickLanchApps.push(win.apps[j]);
						donePos = i;
					}
	
					if (i == 2) {
						$("#launcherApp3 > img").attr("src",win.apps[j].iconBase64);
						$("#launcherApp3 > img").attr("data-original-title",win.apps[j].name);
						$("#launcherApp3").attr("onclick","openQuickApp(2)");
						quickApps[appName] = 0;
						quickLanchApps.push(win.apps[j]);
						donePos = i;
					}
					}
				}
			
		}
	if (quickLanchApps.length != 0)
				$("#launcherContainer").removeClass("hidden");
	
	
	//console.log("quickLanchApps2",quickLanchApps);
	
	
	}

	hubCommsChannelNew = new BroadcastChannel("explorebareXternChannel");
	hubCommsChannelNew.onmessage = function (ev) {
	//console.log("message recieved: ",ev)

	/*if (ev.data.type == "workspace-switched") {
		console.log("force checking desktop");
		checkIfDesktopChanged(true);
	}

	if (ev.data.type == "update-sys-generic-instance") {
		console.log("update-generic-instance recieved");
		nextGenericProcessId = ev.data.nextGenericProcessId;
	}

	if (ev.data.type == "update-sys-files-instances") {
		console.log("update-sys-files-instances recieved");
		nextFilesProcessId = ev.data.nextFilesProcessId;
	}
	
	if (ev.data.type == "update-sys-hud-instance") {
		console.log("update-sys-hud-instance recieved: ",ev.data.hudProcessId);
		hudProcessId = ev.data.hudProcessId;
		hudCommsChannel = new BroadcastChannel("eXternOSApp"+hudProcessId);
	}
	
	if (ev.data.type == "increase-volume") {
		win.increaseAudioVolume(true);
	}
	
	if (ev.data.type == "decrease-volume") {
		win.increaseAudioVolume(false);
	} */

	if (ev.data.type == "init-objects") {
		win.systemSortedApps = ev.data.systemSortedApps;
		win.accessedApps = ev.data.accessedApps;
		win.canOpenHub = ev.data.canOpenHub;
		win.runningApps = ev.data.runningApps;
		win.apps = ev.data.apps;
		//win.sysWin.height = ev.data.height;
		//win.sysWin.width = ev.data.width;
		//win.sysWin.opened = ev.data.opened;
		console.log("init-objects");
		setLauncherApps();
		/* win.sysWin.id = ev.data.sysWinId;
		//console.log("win.canOpenHub",win.canOpenHub);
		if (!alreadyAdjusted) {
			setTimeout(function() { adjustWalpaperPosition();}, 3000);
			alreadyAdjusted = true;
		} */
	} /*else if (ev.data.type == "add-app") {
		console.log("app added called");
		win.addApp(ev.data.app);
	} else if (ev.data.type == "remove-app") {
		console.log("remove-app called: ",ev.data.app);
		win.removeApp(ev.data.app);
	} else if (ev.data.type == "show-app") {
		win.makeAppVisible (ev.data.appId);
	} else if (ev.data.type == "minimize-app") {
		win.minimizeApp (ev.data.app);
	} else if (ev.data.type == "focus-app") {
		toggleApp("#app"+ev.data.app.id);
	} else if (ev.data.type == "unfocus-app") {
		$("#app"+ev.data.app.id).removeClass("activeApp");
	} else if (ev.data.type == "update-audio-notification") {
		win.updateAudioInfo(ev.data.data);
	} else if (ev.data.type == "toggle-network-options") {
		toggleActions('networkOptionsMini','networkToggle');
	}*/
	
};
