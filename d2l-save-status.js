/**
`d2l-save-status`
component to display saving statuses

@demo demo/d2l-save-status-demo.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-icons/tier1-icons.js';
import 'd2l-colors/d2l-colors.js';
import './localize-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-save-status">
	<template strip-whitespace="">
		<style>
			:host {
				display: block;
				color: var(--d2l-color-tungsten);
			}

			.check-icon {
				width: 0.8rem;
				height: 0.8rem;
				margin-right: 8px;
				padding-bottom: 2px;
				fill: var(--d2l-color-corundum);
				visibility: hidden;
			}

			:host .check-icon[save-status="saved"] {
				visibility: visible;
			}

			#status-text {
				@apply --d2l-body-compact-text;
				font-style: italic;
			}

			:host-context([dir='rtl']) .check-icon {
				margin-left: 8px;
			}

			:host(:dir(rtl)) .check-icon {
				margin-left: 8px;
			}
		</style>
		<div hidden="" aria-live="polite" id="save-status-announce"></div>
		<div id="save-status-indicator">
			<d2l-icon icon="d2l-tier1:check" class="check-icon" save-status$={{_saveStatus}}></d2l-icon>
			<label id="status-text"></label>
		</div>
	</template>
	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
var debounce = function(func, delay) {
	var timeout;
	return function() {
		var context = this; // eslint-disable-line no-invalid-this
		var args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() { func.apply(context, args); }, delay);
	};
};
var delayMS = 3000;

Polymer({
	is: 'd2l-save-status',
	behaviors: [
		D2L.PolymerBehaviors.SaveStatus.LocalizeBehavior
	],

	properties: {
		/**
		  * Save status, one of: none, saving or saved
		 */
		_saveStatus: {
			type: String,
			value: 'none',
			reflectToAttribute: true
		},
		/**
		  * Computed text based on the save status
		 */
		_statusText: {
			type: String,
			value: ' ',
			computed: '_computeStatusText(_saveStatus)'
		}
	},

	ready: function() {
		this._saving = 0;
		this._error = false;
		this._lastSaving = new Date(0);
		this._lastSaved = null;

		var self = this;
		this._handleSaved = debounce(function() {
			self._toggleSaved();
		}, delayMS);
		this._handleError = debounce(function() {
			self._toggleError();
		}, 100);
	},

	_toggleSaved: function() {
		if (this._saving > 0) return;
		if (this._error) return;

		this._saveStatus = 'saved';
		this.$['status-text'].innerText = this._statusText;
		this.$['save-status-announce'].innerText = this._statusText;
		this._lastSaving = new Date(0);
		this._lastSaved = new Date();
	},

	_toggleError: function() {
		if (this._saving > 0) return;
		this._saveStatus = 'none';
		this.$['status-text'].innerText = this._statusText;
		this.$['save-status-announce'].innerText = '';
		this._lastSaving = new Date(0);
	},

	_toggleSaving: function() {
		this._saveStatus = 'saving';
		this.$['status-text'].innerText = this._statusText;
		this.$['save-status-announce'].innerText = this._statusText;
	},

	_computeStatusText: function(_saveStatus) {
		var computedStatusText = (_saveStatus === 'none') ? ' ' : this.localize(_saveStatus);
		return computedStatusText;
		},

	/**
	  * Save Starting
	 */
	start: function() {
		this._toggleSaving();
		this._saving++;
		this._lastSaving = new Date();
		this._error = false;
	},
	/**
	  * Save Ends
	 */
	end: function() {
		this._saving--;
		var diff = new Date().getTime() - this._lastSaving.getTime();
		if (diff < delayMS) this._handleSaved();
		else this._toggleSaved();
	},

	/**
	  * Save Ends regardless of delay or # of calls
	 */
	forceEnd: function() {
		this._saving = 0;
		this._toggleSaved();
	},

	/**
	  * Save Error
	 */
	error: function() {
		this._saving = 0;
		this._error = true;
		this._handleError();
	}
});
