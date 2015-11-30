/**
 * Created by Administrator on 2015/11/27 0027.
 */


(function () {
    var xQuery = function (selector) {

        return new xQuery.fn.init(selector);
    };

    xQuery.fn = xQuery.prototype = {

        constructor: xQuery,

        init: function (selector) {

            if (!selector) {
                return this;
            }

            if (typeof selector === "string") {
                if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {

                    var tag = selector.substring(1, selector.indexOf(">")),
                        text = selector.substring(selector.indexOf(">") + 1, selector.lastIndexOf("<"));

                    var elem = document.createElement(tag);
                    var textNode = document.createTextNode(text);
                    elem.appendChild(textNode);

                    this.length = 1;
                    this[0] = elem;
                    this.content = document;
                    this.selector = document;

                } else if (selector.charAt(0) == "#") {
                    //handler id
                    var elem = document.querySelector(selector);
                    this.length = 1;
                    this[0] = elem;
                    this.context = document;
                    this.selector = selector;
                } else {
                    //handle not id
                    var elem = document.querySelectorAll(selector);
                    var i = 0;
                    this.length = elem.length;
                    for (; i < this.length; i++) {
                        this[i] = elem[i];
                    }

                    this.context = document;
                    this.selector = document;
                }
            }
            if (selector.nodeType) {
                this.context = this[0] = selector;
                this.length = 1;
            }
            return this;
        },
        toArray: function () {
            return [].slice.call(this);
        },
        get: function (num) {
            return num == null ?
                this.toArray() : num < 0 ? this[this.length + num] : this[num];
        },

        selecotr: "",
        length: 0,
        context: "",
        splice: [].splice

    };

    xQuery.fn.extend = function () {
        var options,
            target =  arguments[0] || {},
            length = arguments.length;
            i = 1;

        if(length == i) {
            target = this;
            i--;
        }
        for(;i<length;i++){
            if((options = arguments[i]) != null){
                for(var attr in options){
                    if(options.hasOwnProperty(attr)){
                        target[attr] = options[attr];
                    }
                }
            }
        }
    };

    //compatiable nextSibling
    function nextSibling(n) {
        return n.nextSibling.nodeType === 1 ? nextSibling : n.nextSibling;
    };

    //event maniplate
    xQuery.fn.extend({
        on: function (type, fn) {
            //console.log(this)
            var length = 0;
            var i = 0
            for (; length = this.length , i < length; i++) {
                this[i].addEventListener(type, fn, false);
            }
            return this;
        },
        off: function (type, fn) {
            var i = 0;
            var length = 0;
            for (; length = this.length, i < length; i++) {
                this[i].removeEventListener(type, fn, false);
            }

            return this;
        },
        bind : function(type,fn){

            return this.on(type,fn);
        },
        unbind : function(type,fn){
            return this.off(type,fn);
        }
    });


    //dom manipulate
    xQuery.fn.extend( {
        /*html,text,empty*/
        html: function (value) {
            //handle getter and setter
            var i = 0;
            if (value == null) {
                return this[0].innerHTML;
            }

            //set html value
            if (typeof value === "string") {
                for (; (elem = this[i]) != null; i++) {
                    elem.innerHTML = value;
                }
            }

            return this;
        },

        text: function (value) {
            var i = 0
            elem;
            if (value == null) {
                return this[0].textContent;
            }

            if (typeof value === "string") {
                for (; (elem = this[i]) != null; i++) {
                    elem.textContent = value;
                }
            }
            return this;
        },

        empty: function () {
            var i = 0,
                elem;
            for (; (elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) {
                    elem.textContent = "";
                }
            }

            return this;
        },

        //dom manipulate such as before,after and so on;
        before: function (elem) {
            var i = 0,
                j = 0;

            for (; this[i] != null; i++) {
                if (this[i].parentNode) {
                    for (; elem[j] != null; j++) {
                        this[i].parentNode.insertBefore(elem[j], this[i]);
                    }
                }
            }
            return this;
        },

        after: function (elem) {
            var i = 0,
                j = 0;

            for (; this[i] != null; i++) {
                if (this[i].parentNode) {
                    for (; elem[j] != null; j++) {
                        this[i].parentNode.insertBefore(elem[i], nextSibling(this[i]));
                    }
                }
            }

            return this;
        },
        append: function (elem) {
            var i = 0,
                j = 0;
            for (; this[i] != null; i++) {
                for (; elem[j] != null; j++) {
                    this[i].appendChild(elem[i]);
                }
            }

            return this;
        },

        prepend: function (elem) {
            var i = 0,
                j = 0;
            for (; this[i] != null; i++) {
                for (; elem[j] != null; j++) {
                    this[i].insertBefore(elem[j], this[i].firstChild);
                }
            }

            return this;
        }

    });

    //again prototype to this
    xQuery.fn.init.prototype = xQuery.fn;

    window.xQuery = window.$ = xQuery;

    })()



