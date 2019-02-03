function Pupil(id, lastName, firstName, gender) {
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.gender = gender;
    this.selector = $("<div>", {class: "pupil", "draggable": "true"});
    this.selector.on('dragstart', this.onDragStart.bind(this));
    this.render();
}

Pupil.prototype.onDragStart = function (event) {
    event.originalEvent.dataTransfer.setData("text/plain", this.id);
};

Pupil.prototype.render = function () {
    if (this.gender === "w") {
        this.selector.append($("<img>", {src: "plugins/sitin/img/girl.png"}));
    } else {
        this.selector.append($("<img>", {src: "plugins/sitin/img/boy.png"}));
    }

    this.selector.append($("<span>", {text: this.firstName + " " + this.lastName}));
};



