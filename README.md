# Hype AnimationFrame

![Hype-AnimationFrame|690x487](https://playground.maxziebell.de/Hype/AnimationFrame/HypeAnimationFrame_1.jpg#)
<sup>The cover artwork is not hosted in this repository and &copy;opyrighted by Max Ziebell</sup>



### Usage

This is Hype AnimationFrame, a wrapper for requestAnimation frame that cleans up after itself made for Tumult Hype.

**Basic usage:**

``` javascript
	hypeDocument.startAnimationFrame(function(time){
		// your code goes here and executes once per frame
	});
```

**Advanced usage (with all options):**

``` javascript
	hypeDocument.startAnimationFrame(function(time){
		// your code goes here and executes once per frame
	},{
		framerate: 30,		/* framerate 1-60 */
		id: 'myTicker',		/* ID for managing, defaults to callback if not anonymous */
		scope: window,	/* defines scope of execution, defaults to hypeDocument */
		
	});
```



**Online Example:**
[HypeAnimationFrame.html](https://playground.maxziebell.de/Hype/AnimationFrame/HypeAnimationFrame.html)

**Version-History:**  
`1.0	Initial release under MIT`  
`1.1	Converted into a self contained extension`  
` 1.2	Added id, scope and refactored names`  
`1.3 Added support for Framerate`  

Content Delivery Network (CDN)
--
Latest version can be linked into your project using the following in the head section of your project:
```html
<script src="https://cdn.jsdelivr.net/gh/worldoptimizer/HypeAnimationFrame/HypeAnimationFrame.min.js"></script>
```

Optionally you can also link a SRI version or specific releases. 
Read more about that on the JsDelivr (CDN) page for this extension at https://www.jsdelivr.com/package/gh/worldoptimizer/HypeAnimationFrame

Learn how to use the latest extension version and how to combine extensions into one file at
https://github.com/worldoptimizer/HypeCookBook/wiki/Including-external-files-and-Hype-extensions
