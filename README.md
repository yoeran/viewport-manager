Viewport Manager
================

Easily hook events to your viewport changes. Nice for responsive design issues.

### Examples
Define your viewports
```
VPM.addView('small', 0, 760);
VPM.addView('medium', 760, 1100);
VPM.addView('desktop', 1100); // matches >1100px
```

Add an event for entering the `medium` viewport:
```
VPM.on('medium', 'enter', function(){
	// execute functions for medium viewport only
});
```


Add an event for leaving the `medium` viewport:
```
VPM.on('medium', 'exit', function(){
	// e.g. cleanup some functions, unbind listeners etc.
});
```

### Dependencies
* jQuery

### Todo's
* Remove jQuery dependency
* Add unit tests
* Support `em`'s for viewports
* Add to Bower
