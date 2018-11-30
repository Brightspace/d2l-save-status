import '../@polymer/polymer/polymer-legacy.js';
import '../d2l-typography/d2l-typography-shared-styles.js';
import '../d2l-icons/d2l-icon.js';
import '../d2l-icons/tier1-icons.js';
import '../d2l-colors/d2l-colors.js';
import './localize-behavior.js';
import { Polymer } from '../@polymer/polymer/lib/legacy/polymer-fn.js';
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
			}

			.status-text {
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
		<div id="saving-status-indicator" hidden="">
			<d2l-icon class="check-icon"></d2l-icon>
			<label class="status-text">[[localize('saving')]]</label>
		</div>
		<div id="saved-status-indicator" hidden="">
			<d2l-icon icon="d2l-tier1:check" class="check-icon"></d2l-icon>
			<label class="status-text">[[localize('saved')]]</label>
		</div>
	</template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);
var debounce = function(func, delay) {
	var timeout;
	return function() {
		// eslint-disable-next-line no-invalid-this
		var context = this;
		var args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() { func.apply(context, args); }, delay);
	};
};
var delayMS = 3000;

/**
`d2l-save-status`
component to display saving statuses

@demo demo/d2l-save-status-demo.html
*/
Polymer({
	is: 'd2l-save-status',
	behaviors: [
		D2L.PolymerBehaviors.SaveStatus.LocalizeBehavior
	],

	properties: {

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

	_toggleVisible: function(show, hidden) {
		this.$[show].hidden = false;
		this.$[hidden].hidden = true;
	},

	_toggleSaved: function() {
		if (this._saving > 0) return;
		if (this._error) return;

		this._toggleVisible('saved-status-indicator', 'saving-status-indicator');
		this.$['save-status-announce'].innerText = this.localize('saved');
		this._lastSaving = new Date(0);
		this._lastSaved = new Date();
	},

	_toggleError: function() {
		if (this._saving > 0) return;
		this.$['saving-status-indicator'].hidden = true;
		this.$['save-status-announce'].innerText = '';
		this._lastSaving = new Date(0);
	},

	_toggleSaving: function() {
		this._toggleVisible('saving-status-indicator', 'saved-status-indicator');
		this.$['save-status-announce'].innerText = this.localize('saving');
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
