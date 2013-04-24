/**
 * This library is a review of test questions from interview
 * @author Dmitry Branitskiy <dmitry.branitskiy@gmail.com>
 */
(function () {

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
        var private1
        ,   self = this;
        // called with new
        if (this instanceof Client) {
            // string passed
            if (elem.constructor === String) {
                this.elem = global.document.getElementsByTagName(elem);
            }
            else {
                this.elem = elem;
            }
            /** @private */
            var _privateMethod = function() {
            }
            // priveleged method
            this.privelegedMethod = function() {
                private1 = 1;
            }
            // call array function on NodeList
            var dupl = []
            // create array of unique nodeNames
            ,   nodenames = Array.prototype.filter.call(this.elem, function (el) {
                    if (dupl.indexOf(el.nodeName) === -1) {
                        dupl.push(el.nodeName);
                        return true;
                    }
                })
            ,   tlength = nodenames.length;
            // dynamic methods
            for (var i = 0; i < tlength; i++) {
                // creating scope and saving i in it
                (function (i) {
                    self['find'+nodenames[i].nodeName] = function () {
                        console.log(i);
                        // changing color of 1st element in NodeList
                        nodenames[i].style.background = 'yellow';
                    }
                }(i));
            }
        }
        // called like fn
        // return new instance
        else {
            return new Client(elem);
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
        ,   i = this.elem.length;
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
        ,   elem2 = global.document.getElementById(id2);
        while(elem1.lastChild) {
            // this will not work, because referance wont renew
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

    /** @public */
    return global.cl = Client;
}())
