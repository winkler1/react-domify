!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.DOMify=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

var styles = {
	string: {
		color: '#0e4889',
		cursor: 'default'
	},
	bool: {
		color: '#06624b',
		cursor: 'default',
		fontStyle: 'italic'
	},
	number: {
		color: '#ca000a',
		cursor: 'default'
	},
	date: {
		color: '#009f7b',
		cursor: 'default'
	},
	empty: {
		color: '#999999',
		cursor: 'default'
	},
	array: {
		color: '#666666',
		cursor: 'default'
	},
	object: {
		color: '#0b89b6',
		cursor: 'default'
	}
};

function transform(obj, fromRecur) {

	var tag = (fromRecur) ? 'span' : 'div',
		nextLevel = (fromRecur || 0) + 1,
		children = [];
	
	// strings
	if (typeof obj === 'string') {
		return React.createElement(tag, { style: styles.string }, obj);
	}
	// booleans, null and undefined
	else if (typeof obj === 'boolean' || obj === null || obj === undefined) {
		return React.createElement(tag, { style: styles.bool }, String(obj));
	}
	// numbers
	else if (typeof obj === 'number') {
		return React.createElement(tag, { style: styles.number }, String(obj));
	}
	// dates
	else if (Object.prototype.toString.call(obj) === '[object Date]') {
		return React.createElement(tag, { style: styles.date }, String(obj));
	}
	// arrays
	else if (Array.isArray(obj)) {
		
		if (!obj.length) {
			return React.createElement(tag, { style: styles.empty }, 'Array: []');
		}
		
		children.push(React.createElement(tag, { style: styles.array }, 'Array: ['));
		
		// rtn += '</' + tag + '><div style="padding-left: 20px;">';
		// 
		for (var i = 0; i < obj.length; i++) {
			console.log(obj[i])
			children.push(
				React.createElement("div", {key: 'i' + i, style: { paddingLeft: '20px'}}, 
					transform(obj[i], nextLevel), 
					(i < obj.length - 1) ? ',' : null
				)
			);
		}
		
		children.push(React.createElement(tag, { style: styles.array }, ']'));
		
	}
	// objects
	else if (obj && typeof obj === 'object') {
		
		var len = Object.keys(obj).length;
	
		if (fromRecur && !len) {
			return React.createElement(tag, { style: styles.empty }, 'Object: {}');
		}
		
		if (fromRecur) {
			children.push(React.createElement(tag, { style: styles.object }, 'Object: {'));
		}
		
		for (var key in obj) {
			if (typeof obj[key] !== 'function') {
				children.push(
					React.createElement("div", {key: key, style: { paddingLeft: fromRecur ? '20px' : '0'}}, 
						React.createElement("span", {style: { paddingRight: '5px', cursor: 'default'}}, key, ":"), 
						transform(obj[key], nextLevel)
					)
				);
			}
		}
		
		if (fromRecur) {
			children.push(React.createElement(tag, { style: styles.object }, '}'));
		}
		
	}

	return React.createElement("div", null, children);

}

var DOMify = React.createClass({displayName: "DOMify",
	
	render: function() {
		return transform(this.props.value);
	}
	
});

module.exports = DOMify;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});