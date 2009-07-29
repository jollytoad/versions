/*!
 * versions.js 0.2
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT and GPL licenses.
 *
 * http://www.adaptavist.com/display/~mgibson/Versions
 */
/* Allow multiple versions of self-contained libraries to exist.
 *
 * Author: Mark Gibson (jollytoad at gmail dot com)
 */
(window.Versions || (function() {

var v;
v= window.Versions = {

	library: {},
	
	// Register an object under a given name and version numbers
	add: function ( name, versions, object ) {
		var vers = versions.split(/\s+/),
			lib = v.library[name] || {};
		
		while (vers.length) {
			lib[vers.shift()] = object;
		}
		
		v.library[name] = lib;
		
		// Should this return the registered object, or Versions (for chaining),
		// or nothing at all?
	},
	
	// Retrieve a object by name and version
	use: function ( name, version ) {
		return v.library[name][version] ||
			v.error("non-existent library version: "+name+"-"+version);
	},
	
	// Break a version number down in stages - down to a given level
	// Suitable for passing into Versions.add.
	//
	// eg. Versions.cascade('1.3.4.2', 2, 'latest') returns "latest 1.3.4.2 1.3.4 1.3"
	cascade: function ( version, level, extra ) {
		var points = version.split('.'),
			i = points.length,
			ret = extra ? [extra] : [];
		
		while ( i >= (level || 2) ) {
			ret.push(points.slice(0, i).join('.'));
			i++;
		}
		
		return ret.join(' ');
	},
	
	debug: false,
	
	error: function(msg) {
		if ( v.debug ) {
			if ( window.console ) {
				(console.error||console.log)(msg);
			} else if ( window.opera && opera.postError ) {
				opera.postError(msg);
			} else {
				alert(msg);
			}
		}		
	}

};

})());
