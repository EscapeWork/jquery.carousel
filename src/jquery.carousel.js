// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ($, window, document, undefined) {
    "use strict";

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "carousel",
        defaults = {
            active: 1,
            show: 1,
            speed: 500
        };

    // The actual plugin constructor
    function Plugin (element, options) {
        this.element = element;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings  = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name     = pluginName;

        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        // Place initialization logic here
        // You already have access to the DOM element and
        // the options via the instance, e.g. this.element
        // and this.settings
        // you can add more functions like the one below and
        // call them like so: this.yourOtherFunction(this.element, this.settings).

        init: function() {
            this.fetchElements();
            this.bindUIEvents();
            this.setSizes();
        },

        fetchElements: function() {
            this.$container = $(this.element);
            this.$inner     = this.$container.find('.js-carousel-inner');
            this.$list      = this.$inner.children();
            this.$items     = this.$list.children();

            this.$navLeft  = this.$container.find('.js-carousel-btn-left');
            this.$navRight = this.$container.find('.js-carousel-btn-right');

            // setting list as relativa
            this.$list.css('position', 'relative');
        },

        bindUIEvents: function() {
            this.$navLeft.on('click', $.proxy(this.onNavLeft, this));
            this.$navRight.on('click', $.proxy(this.onNavRight, this));
        },

        onResize: function(e) {
            e.preventDefault();

            this.setSizes();
        },

        setSizes: function() {
            this.settings.totalItems = this.$items.size();
            this.settings.totalPages = Math.ceil(this.settings.totalItems / this.settings.show);

            this.sizes = {
                item: this.$items.outerWidth(),
                items: this.$items.outerWidth() * this.settings.totalItems
            };

            this.$list.width(this.sizes.items);
        },

        onNavLeft: function(e) {
            e.preventDefault();

            this.navToLeft();
        },

        onNavRight: function(e) {
            e.preventDefault();

            this.navToRight();
        },

        navToLeft: function() {
            var percorrido, items, left;

            percorrido = this.settings.active * this.settings.show;
            this.settings.active--;

            // if the active 'page' is higher the total pages, we need to reset
            if (this.settings.active <= 0) {
                this.slideToEnd();
                return;
            }

            percorrido = this.settings.active * this.settings.show;
            left       = (percorrido * this.sizes.item) - (this.settings.show * this.sizes.item);

            this.slide(left);
        },

        navToRight: function() {
            var percorrido, items, left;

            percorrido = this.settings.active * this.settings.show;
            this.settings.active++;

            // if the active 'page' is higher the total pages, we need to reset
            if (this.settings.active > this.settings.totalPages) {
                this.reset();
                return;
            }

            // setando o total de items
            items = this.settings.active * this.settings.show;

            if (items > this.settings.totalItems) {
                left = (this.settings.totalItems - this.settings.show) * this.sizes.item;
            } else {
                left = (items * this.sizes.item) - (this.settings.show * this.sizes.item);
            }

            this.slide(left);
        },

        reset: function() {
            this.settings.active = 1;
            this.slide('0');
        },

        slideToEnd: function() {
            var left;

            this.settings.active = this.settings.totalPages;
            left = (this.settings.totalItems * this.sizes.item) - (this.settings.show * this.sizes.item);

            this.slide(left);
        },

        slide: function(left) {
            this.$list.animate({
                'left': '-' + left + 'px'
            }, this.settings.speed);
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function() {
            if (! $.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };
})(jQuery, window, document);
