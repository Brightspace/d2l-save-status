import 'd2l-localize-behavior';
import './_namespace.js';
import './lang/all.js';
/**
	 * Localizes the more-less component.
	 * @polymerBehavior D2L.PolymerBehaviors.SaveStatus.LocalizeBehavior
	 */
D2L.PolymerBehaviors.SaveStatus.LocalizeBehaviorImpl = {
	properties: {
		/**
		 * Localization resources.
		 */
		resources: {
			value: function() {
				return window.D2L.PolymerBehaviors.SaveStatus.LangTerms;
			}
		}
	}
};

/** @polymerBehavior D2L.PolymerBehaviors.MoreLess.LocalizeBehavior */
D2L.PolymerBehaviors.SaveStatus.LocalizeBehavior = [
	D2L.PolymerBehaviors.LocalizeBehavior,
	D2L.PolymerBehaviors.SaveStatus.LocalizeBehaviorImpl
];
