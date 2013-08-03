( function () {

    var private = 12;

    var global = this,
        obj = {};

    obj['some'] = true;

    var Super = function () {
        var age = 1;

        this.getAge = function () {
            return age;
        };
        this.setAge = function () {
            age += 1;
        };           
    };

    Super.prototype.method = function () {
        this.setAge();
        alert(this.getAge());
    }

    global.obj = obj;
    global.age = new Super;
    global.age1 = new Super;


}())
