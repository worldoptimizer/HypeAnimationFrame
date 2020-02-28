/*!
Hype AnimationFrame 1.3
copyright (c) 2019 Max Ziebell, (https://maxziebell.de). MIT-license
*/
/*
* Version-History
* 1.0	Initial release under MIT
* 1.1	Converted into a selfcontained extension
* 1.2	Added id, scope and refactored names
* 1.3   Added support for framerate
*/

if("HypeAnimationFrame" in window === false) window['HypeAnimationFrame'] = (function () {
	
	/* keeping track of running requestAnimationFrame instances */
	var rAF_Instances = {};
	
	/* public functions */
	function stopAnimationFrameByHypeDocumentId (hypeDocId, rAFiD){
		window.cancelAnimationFrame(rAF_Instances[hypeDocId][rAFiD]);
		delete(rAF_Instances[hypeDocId][rAFiD]);
	}
	
	function stopAllAnimationFramesByHypeDocumentId(hypeDocId){
		for (var rAFiD in rAF_Instances[hypeDocId]) {
			stopAnimationFrameByHypeDocumentId (hypeDocId, rAFiD);
		}
		
	}
	
	function stopAllAnimationFrames(){
		for (var hypeDocId in rAF_Instances) {
			stopAllAnimationFramesByHypeDocumentId (hypeDocId);
			rAF_Instances[hypeDocId] = {};
		}
	}
	
	/* hype document functions*/
	function extendHype(hypeDocument, element, event) {
		
		/* init document specific lookup */
		var hypeDocId = hypeDocument.documentId();
		rAF_Instances[hypeDocId] = {};
		
		/**
		* hypeDocument.startAnimationFrame
		* @param {Function} function callback
		* @param {Object} (optional) settings, id, scope and framerate
		*/
		hypeDocument.startAnimationFrame = function(callback, config){
			config = config ? config : {};
			var rAFiD = config.id || callback;
			var scope = config.scope || this;
			if (!rAF_Instances[hypeDocId][rAFiD]) {
				if (config.framerate) {
					/* fps version */
					var fpsInterval = 1000 / config.framerate;
    					var then = -1;
    					var startTime = then;
	  				var frameAction = function (time) {
	  					now = performance.now();
		    				elapsed = now - then;
		    				if (elapsed > fpsInterval) {
		    					then = now - (elapsed % fpsInterval);
		    					callback.call(scope,time);
		    				}
		    				rAF_Instances[hypeDocId][rAFiD] = window.requestAnimationFrame(frameAction);
	  				}
				} else {
					/* regular version */
					var frameAction = function (time) {
						callback.call(scope,time);
						rAF_Instances[hypeDocId][rAFiD] = window.requestAnimationFrame(frameAction);
					}
				}
				frameAction();
			}
		}
		
		/**
		* hypeDocument.stopAnimationFrame
		* @param {String} stop animation by name
		*/
		hypeDocument.stopAnimationFrame = function(rAFiD){
			stopAnimationFrameByHypeDocumentId (hypeDocId, rAFiD);
		}
		
		/**
		* hypeDocument.stopAllAnimationFrames
		*/
		hypeDocument.stopAllAnimationFrames = function(){
			stopAllAnimationFramesByHypeDocumentId(hypeDocId);
		}
		
	}
	
	/* kill animation frames for document on scene changes */
	function sceneUnload(hypeDocument, element, event) {
		/* stop all running animation frame callbacks */
		hypeDocument.stopAllAnimationFrames();
	}
	
	/* Setup Hype listeners */
	if("HYPE_eventListeners" in window === false) { window.HYPE_eventListeners = Array();}
	window.HYPE_eventListeners.push({"type":"HypeDocumentLoad", "callback":extendHype});
	window.HYPE_eventListeners.push({"type":"HypeSceneUnload", "callback":sceneUnload});

	/* Reveal Public interface to window['HypeGlobalBehavior'] */
	return {
		version: '1.2',
		'stopAnimationFrameByHypeDocumentId' : stopAnimationFrameByHypeDocumentId,
		'stopAllAnimationFramesByHypeDocumentId' : stopAllAnimationFramesByHypeDocumentId,
		'stopAllAnimationFrames' : stopAllAnimationFrames
	};
})();
