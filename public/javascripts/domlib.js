/**
 * This library is a review of test questions from interview
 * No paramaters checking, plain and simple implementation
 *
 * Interface methods:
 * @function toggleElementsById
 * @function attachListener
 * @function sendAJAX
 * @function extend
 *
 * @example
 * var li = cl('li');
 * li.changeColor();
 *
 * @author Dmitry Branitskiy <dmitry.branitskiy@gmail.com>
 */
(function () {

    /**
     * Saving global object
     * @global
     */
    var global = this;

    /**
     * Represents main Class
     * @param {string|nodelist} elem Passing elements to class representation
     * @constructor
     */
    var Client = function (elem) {
        var self = this, 
            elem = elem || '';
        // Called with new
        if (this instanceof Client) {
            console.log('new instance');
            // String passed
            if (elem.constructor === String) {
                this.elem = global.document.getElementsByTagName(elem);
            }
            else {
                this.elem = elem;
            }
        }
        // Called like fn
        // return new instance
        else {
            console.log('function');
            return new Client(elem);
        }
        /** @private */
        var _privateMethod = function() {
        };
        /** @private */
        var _privateVar = 12;
        /** Privileged method
         * @public 
         */
        this.getPrivate = function() {
            _privateVar += 1;
            return _privateVar;
        };
        // Create array of unique nodeNames
        var dupl = [],
        // Call array function on NodeList
            nodenames = Array.prototype.filter.call(this.elem, function (el) {
                if (dupl.indexOf(el.nodeName) === -1) {
                    dupl.push(el.nodeName);
                    return true;
                }
            }),
            tlength = nodenames.length;
        /** Dynamic methods
         * @public
         */
        for (var i = 0; i < tlength; i++) {
            // Creating scope and saving i in it
            (function (i) {
                // Referencing to a class variable
                // this === window here
                self['yellow'+nodenames[i].nodeName] = function () {
                    console.log(i);
                    // Changing color of 1st element in NodeList
                    nodenames[i].style.background = 'yellow';
                }
            }(i));
        }
    };

    /**
     * Change color of current elements
     * @param {string} color Color in hex representation
     * @returns self
     * @public
     */
    Client.prototype.changeColor = function (color) {
        var color = color || '#eee',
            i = this.elem.length;
        while (i--) {
            var elem = this.elem[i];
            elem.style.color = color;
        }
        // Allow chaining
        return this;
    };

    /**
     * Move elements from 1st element to 2nd.
     * @param {string} id1 Id of first element
     * @param {string} id2 Id of second element
     * @static
     */
    Client.toggleElementsById = function (id1, id2) {
        if (!(id1 && id2)) {
            throw Error('Provide valid names');
        }
        var elem1 = global.document.getElementById(id1),
            elem2 = global.document.getElementById(id2);
        while(elem1.lastChild) {
            // This will not work, because referance won't renew
            // on next iteration
            var elem = elem1.lastChild;
            // Only elements
            if (elem1.lastChild.nodeType === 1) {
                // Appending to new list
                elem2.appendChild(elem1.lastChild);
            }
            // Removing from 1st list
            elem1.removeChild(elem1.lastChild);
        }
    };

    /**
     * Extend properties of the first object
     * with properties of second object
     * @param {object} sbclass SubClass
     * @param {object} spclass SuperClass
     * @static
     */
    Client.extend = function (sbclass, spclass) {
        var F = function () {};
        F.prototype = spclass.prototype;
        sbclass.prototype = new F();
        sbclass.prototype.constructor = sbclass;

        sbclass.super = spclass.prototype;
        // From Pro Javascript Design Patterns
        if(spclass.prototype.constructor == Object.prototype.constructor) {
            spclass.prototype.constructor = spclass;
        }

    };

    /**
     * Branching used for browser inspection
     */
    var SingleCheck = (function () {
        var attach,
            request;
        if (global.attachEvent) {
            attach = function (element, type, listener) {
                element.attachEvent('on'+type, listener);   
            };
        }
        if (global.addEventListener) {
            attach = function (element, type, listener) {
                element.addEventListener(type, listener, false);   
            };
        }
        if (global.XMLHttpRequest) {
            request = function () {
                return new global.XMLHttpRequest();
            };
        }
        else {
            request = function () {
                return new global.ActiveXObject('Msxml2.XMLHTTP')();
            };
        }
        return {
                attach: attach,
                request: request
        }
    }());

    /**
     * TODO: check in IE6
     * Attach event to an element
     * @param {element} element Element Node
     * @param {string} type Event type
     * @param {function} callback Callback function
     * @static
     */
    Client.attachListener = function (element, type, callback) {
        var handler = function (e) {
            var event = e || global.event;
            callback.call(element, event, type);
        };
        SingleCheck.attach(element, type, handler);
    };

    /**
     * TODO: check in IE6
     * Create Ajax Request
     * onreadystatechange checking can be added on demand
     * @param {string} url Url
     * @param {string} type Request type
     * @param {function} callback Callback function
     * @static
     */
    Client.sendAJAX = function (url, type, callback) {
        var request = SingleCheck.request();
        request.onload = function () {
            callback(this.responseText);
        }
        request.open(type, url, true);
        request.send();
    };

    /** Subcalss of parent class */
    var ClientChild = function (elem) {
        ClientChild.super.constructor.call(this, elem);
    }
    Client.extend(ClientChild,Client);

    /** @public */
    /**
     * global.cl = function () {
     *    return new Client(arguments);
     * }
     */
    global.cl = global.cl || Client;
    global.clc = global.clc || ClientChild;

}());
