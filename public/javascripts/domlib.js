/**
 * This library is a review of test questions from interview
 * @author Dmitry Branitskiy <dmitry.branitskiy@gmail.com>
 * TODO:
 * null in param constr
 * interface overview
 */
(function () {

    function extend (sbclass, spclass) {
        var F = function () {};
        F.prototype = spclass.prototype;
        sbclass.prototype = new f();
        sbclass.prototype.constructor = sbclass;
        
        sbclass.super = spclass.prototype;
    }

    /**
     * saving global object
     * @global 
     */
    var global = this;

    /**
     * Represents main Class
     * @param {string|nodelist} elem Passing elements to class representation
     * @constructor
     */
    var Client = function (elem) {
        var self = this
        , elem = elem || '';
        // called with new
        if (this instanceof Client) {
            console.log('new instance');
            // string passed
            if (elem.constructor === String) {
                this.elem = global.document.getElementsByTagName(elem);
            }
            else {
                this.elem = elem;
            }
        }
        // called like fn
        // return new instance
        else {
            console.log('function');
            return new Client(elem);
        }
        /** @private */
        var _privateMethod = function() {
        }
        /** @private */
        var _privateVar = 12; 
        // priveleged method
        this.getPrivate = function() {
            _privateVar += 1;
            return _privateVar;
        }
        // create array of unique nodeNames
        var dupl = []
        // call array function on NodeList
        , nodenames = Array.prototype.filter.call(this.elem, function (el) {
                if (dupl.indexOf(el.nodeName) === -1) {
                    dupl.push(el.nodeName);
                    return true;
                }
            })
        , tlength = nodenames.length;
        // dynamic methods
        for (var i = 0; i < tlength; i++) {
            // creating scope and saving i in it
            (function (i) {
                // referencing to a class variable
                // this === window here
                self['find'+nodenames[i].nodeName] = function () {
                    console.log(i);
                    // changing color of 1st element in NodeList
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
        var color = color || '#eee'
        , i = this.elem.length;
        while (i--) {
            var elem = this.elem[i];
            elem.style.color = color;
        }  
        //allow chaining
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
        var elem1 = global.document.getElementById(id1)
        , elem2 = global.document.getElementById(id2);
        while(elem1.lastChild) {
            // this will not work, because referance won't renew
            // on next iteration
            var elem = elem1.lastChild;
            // only elements
            if (elem1.lastChild.nodeType === 1) {
                // appending to new list
                elem2.appendChild(elem1.lastChild);
            }
            // removing from 1st list
            elem1.removeChild(elem1.lastChild);
        }
    };

    // TODO: subcalss
    var ClientChild = function (elem) {
        Client.call(this, elem);
        //this.elem = elem;
    }
    // exposing all dynamic methods
    // called with '*'
    ClientChild.prototype = new Client();
    ClientChild.prototype.constructor = ClientChild;

    /** @public */
    /*
    global.cl = function () {
        return new Client(arguments);
    }
    */
    global.cl = global.cl || Client;
    global.clc = global.clc || ClientChild;

}());
