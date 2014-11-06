/**
 * Viewport manager
 *
 * @author 	Yoeran Luteijn <contact@yoeran.nl>
 * @version 1
 */

( function( window, $, undefined ) {
	"use strict";
	var $document	= $(window.document),
			$window		= $(window);

	var VPM = function()
	{
		var self				= this;

		// state variables
		var views				= [];
		var prev_view;
		var initialized	= false;

		// resize throttling
		var rtime		= new Date();
		var timeout	= false;
		var delta		= 300;

		/*
		 *  PRIVATE
		 */
		var _checkResize = function(){
			rtime = new Date();
			if (timeout === false) {
				timeout = true;
				setTimeout(_resizeEnd, delta);
			}
		};

		var _updateView = function(){
			var sw = $(window).width();
			for( var id in views )
			{
				var st = views[id];
				if( sw > st.min && sw <= st.max && prev_view != id )
				{
					if( prev_view ){
						_exitView(prev_view);
					} else {
						_setupView(id);
					}
					_enterView(id);
					prev_view = id;
					return;
				}
			}

		};

		var _resizeEnd = function(){
			if (new Date() - rtime < delta) {
			setTimeout(_resizeEnd, delta);
			} else {
			timeout = false;
			$document.trigger('vpm:change');
			}
		};

		var _setupView = function( id ){
			var fns = views[ id ].setup;
			_runFunctions( fns );
		};

		var _enterView = function( id ){
			var fns = views[ id ].enter;
			_runFunctions( fns );
		};

		var _exitView = function( id ){
			var fns = views[ id ].exit;
			_runFunctions(fns);
		};

		var _runFunctions = function(fns){
			for(var i in fns){
				fns[i]();
			}
		};


		/*
		 * PUBLIC
		 */
		self.current = function(){
			return prev_view;
		};

		self.init = function(){
			if( false === initialized )
			{
				initialized = true;
				$window.on('resize.vpm', _checkResize);
				$document.on('vpm:change', _updateView);
				_updateView();
			}
		};

		self.addView = function(id, minWidth, maxWidth){
			views[ id ] = {
				min: minWidth,
				max: maxWidth || 999999,
				enter: [],
				exit: [],
				setup: []
			};
		};

		self.on = function(id, dir, fn){
			switch( dir ){
				case 'setup':
					views[ id ].setup.push( fn );
					break;
				case 'enter':
					views[ id ].enter.push( fn );
					break;
				case 'exit':
					views[ id ].exit.push( fn );
					break;
			}

			return self;
		};

	}; // end

	// add to global namespace
	window.VPM = new VPM();

} )( window, jQuery );
