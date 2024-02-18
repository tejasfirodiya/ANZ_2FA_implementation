"use strict";

// Class definition
var KTLayoutAside = function() {
    // Private variables
    var toggleElement;
    var tabsElement;

    // Private functions
    var handleToggle = function() {        
        var toggle = KTToggle.getInstance(toggleElement);
        var tabs = [].slice.call(tabsElement.querySelectorAll('[data-bs-toggle="tab"]'));

        tabs.map(function (tab) {
            tab.addEventListener('click', function (event) {
                if (toggle.isEnabled() === true) {
                    toggle.disable();
                }                
            })
        });
    }
    
    // Public methods
	return {
		init: function() {
            toggleElement = document.querySelector('#kt_aside_toggle');
            tabsElement = document.querySelector('#kt_aside_nav_tabs');

            if (!toggleElement) {
                return;
            }

            handleToggle();
		}
	};
}();

// On document ready
KTUtil.onDOMContentLoaded(function() {
    KTLayoutAside.init();
});

// Webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = KTLayoutAside;
}