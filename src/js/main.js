define(["jquery", "handlebars"], function($, Handlebars) {
    $(function() {
        'use strict';

        function ImageGrid(el, options) {
            this.el = el;
            this.$el = $(el);
            //ul = $(".og-grid"),
            this.cards = this.$el.find(".card");
            this.win = $(window);
            this.winW = this.win.width();
            this.winH = this.win.height();
            var defaults = {
                    count: 4,
                    minHeight: 300,
                    maxHeight: 500
                },
                source = $("#grid-template").html();
            this.template = Handlebars.compile(source);
            this.settings = $.extend(true, defaults, options);
            // handlebar template
            //loop cards and create the box containers for holding the 
            // images
            this.noOfFloatedCols();
            this.makeCards();
            this.resizedEvent();
        }
        ImageGrid.prototype.deleteCards = function() {
            var base = this;
            base.$el.find('.newli').remove();
            base.cards.removeAttr('class').addClass('card').off('click');
            base.adjustScroll(0, 0);
            this.noOfFloatedCols();
            this.makeCards();
        };
        ImageGrid.prototype.resizedEvent = function() {
            var base = this;
            base.win.resize(function(event) {
                base.debounce(base.deleteCards(), 500);
            });
        };
        ImageGrid.prototype.debounce = function(func, wait, immediate) {
            /*reference to http://underscorejs.org/docs/underscore.html*/
            var timeout, args, context, timestamp, result, later = function() {
                var last = new Date().getTime() - timestamp;
                if (last < wait && last > 0) {
                    timeout = setTimeout(later, wait - last);
                } else {
                    timeout = null;
                    if (!immediate) {
                        result = func.apply(context, args);
                        if (!timeout) {
                            context = args = null;
                        }
                    }
                }
            };
            return function() {
                context = this;
                args = arguments;
                timestamp = new Date().getTime();
                var callNow = immediate && !timeout;
                if (!timeout) {
                    timeout = setTimeout(later, wait);
                }
                if (callNow) {
                    result = func.apply(context, args);
                    context = args = null;
                }
                return result;
            };
        };
        ImageGrid.prototype.adjustScroll = function(pos, speed) {
            $('html,body').animate({
                scrollTop: pos
            }, speed);
        };
        ImageGrid.prototype.noOfFloatedCols = function() {
            var base = this,
                tempPosValue = -1,
                tempCount = 0;
            base.cards.each(function() {
                var _self = $(this);
                if (tempPosValue === -1) {
                    tempPosValue = _self.position().top;
                    tempCount++;
                } else if (_self.position().top === tempPosValue) {
                    tempCount++;
                }
            });
            base.settings.count = tempCount;
        };
        ImageGrid.prototype.closeBtnEvent = function() {
            var base = this;
            base.$el.find('.og-close').on('click', function() {
                base.$el.find('.newli').slideUp();
                base.cards.removeClass('active');
            });
        };
        ImageGrid.prototype.holderEvent = function() {
            var base = this,
                largeImg = base.$el.find('.og-largeImg'),
                largeLength = largeImg.length,
                activeImg = base.$el.find('.og-active'),
                left = base.$el.find('.og-fullimg-left'),
                right = base.$el.find('.og-fullimg-right'),
                activeImgIndex = activeImg.index();
            right.on('click', function() {
                activeImg = base.$el.find('.og-active').index();
                if (activeImg < largeLength - 1) {
                    base.$el.find('.og-largeImg').eq(activeImg).fadeOut().removeClass('og-active').next().addClass('og-active').fadeIn();
                }
            });
            left.on('click', function() {
                activeImg = base.$el.find('.og-active').index();
                if (activeImg > 0) {
                    base.$el.find('.og-largeImg').eq(activeImg).fadeOut().removeClass('og-active').prev().addClass('og-active').fadeIn();
                }
            });
        };
        ImageGrid.prototype.thumbsEvent = function() {
            var base = this;
            base.$el.find('.od-grid-list').on('click', function() {
                var self = $(this),
                    imageIndex = self.index(),
                    //largeSrc = self.attr('data-large'),
                    parent = self.parents('.og-expander'),
                    large = parent.find('.og-largeImg');
                //large.css('backgroundImage', 'url(' + largeSrc + ')');
                large.fadeOut().eq(imageIndex).fadeIn();
            });
        };
        ImageGrid.prototype.makeCards = function() {
            var base = this,
                b = 0,
                cardLen = base.cards.length;
            //insert the containers in between 
            base.cards.each(function(index, el) {
                var it = $(this),
                    itHeight = it.height(),
                    winMinusIt = base.winH - itHeight,
                    row = Math.floor(index / base.settings.count),
                    boxHeight = winMinusIt > base.settings.maxHeight ? base.settings.maxHeight : winMinusIt < base.settings.minHeight ? base.settings.minHeight : winMinusIt;
                //make all cards equal height
                b = (itHeight > b) ? itHeight : b;
                if (index % base.settings.count === base.settings.count - 1 || index === cardLen - 1) {
                    //create box container
                    //create li / add class / set id / set data
                    var newli = $("<li>")
                        .hide()
                        .addClass('newli')
                        .attr({
                            id: 'box' + row
                        }).css({
                            height: boxHeight
                        })
                        .data('row', row);
                    newli.insertAfter(it);
                }
                //debugger;
                //add a class names to cards 
                // add click event
                it.addClass('row' + row)
                    .data('row', row)
                    .data('position', index)
                    .on('click', function() { //click event
                        var self = $(this),
                            position = index,
                            boxContainer = base.$el.find("#box" + row),
                            lastActive = base.$el.find('.active'), //get the last active elem
                            _old = {},
                            _new = {};
                        _old.index = lastActive.index();
                        _old.row = lastActive.data('row');
                        base.cards.removeClass('active'); //remove last active
                        self.addClass('active'); //add current active
                        //get the current active element
                        var currentActive = base.$el.find('.active');
                        _new.index = currentActive.index();
                        _new.row = currentActive.data('row');
                        //create(boxContainer, data[position]);
                        boxContainer.empty().append(base.template(data[position]));
                        boxContainer.find('.og-largeImg').eq(0).addClass('og-active'); //add active class for the first largeimg
                        base.thumbsEvent(); // add event listeners to the thumbnail images
                        base.holderEvent(); // add event listeners to the large images
                        base.closeBtnEvent(); // add event listeners to the close btns
                        //callback once the box container is open
                        var changeHeight = function() {
                            boxContainer.find('.og-expander').show(0, function() {
                                //var ogDetails = boxContainer.find('.og-details'),
                                //ogwrapTitle = boxContainer.find('.og-wrapTitle'),
                                //efader = boxContainer.find('.efader');
                                //change the inner thumbs wrapper's height on runtime
                                //efader.height(ogDetails.height() - ogwrapTitle.height()).niceScroll();
                                // change the height of the box container if the screen size is less than 480
                                if (base.winW <= 991) {
                                    var boxHeight = boxContainer.find('.og-expander').height();
                                    boxContainer.css({
                                        height: boxHeight
                                    });
                                } else {
                                    // boxContainer.find('.og-details').niceScroll({
                                    //     cursorcolor: '#c2c2c2'
                                    // });
                                }
                                base.adjustScroll(self.offset().top, 300);
                            });
                        };
                        // open or close box container
                        if (typeof _old.row === 'undefined') { //first time
                            //console.log('first time');
                            boxContainer.slideDown(function() {
                                changeHeight();
                            });
                        } else if (_old.index === _new.index) { //same element
                            //console.log("same element")
                            boxContainer.slideUp();
                            base.cards.removeClass('active');
                        } else if (_old.index !== _new.index && _old.row === _new.row) { //same row
                            //console.log("same row")
                            boxContainer.slideDown(function() {
                                changeHeight();
                            });
                        } else if (_old.index !== _new.index && _old.row !== _new.row) { //different row
                            //console.log("different row") 
                            base.$el.find("#box" + _old.row).slideUp();
                            boxContainer.slideDown();
                        }
                        // open or close box container
                        //console.log();
                    });
            }).height(b);
        };
        var ogg = $(".og-grid");
        if (ogg.length > 0) {
            //create albums from template
            var cardsHTML = $("#card-template").html(),
                cardsTemp = Handlebars.compile(cardsHTML);
            $(".og-grid").append(cardsTemp(data));
            //create albums from template
            $(".og-grid").imagesLoaded(function() {
                //invoke the plugin
                var plugin = new ImageGrid($(".og-grid"));
            });
        }
    });
    return $;
});
