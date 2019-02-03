function Desk(id) {
    this.id = id;
    this.pupils = [];
    this.selector = $("<div>", {class: "desk", "data-desk-id": this.id});
    this.selector.on("dragover", this.onDragOver.bind(this));
    this.selector.on("drop", this.onDrop.bind(this));

    return this;
}

Desk.prototype.onDragOver = function(e) {
    e.preventDefault();
};

Desk.prototype.onDrop = function(e) {
    e.preventDefault();
    var targetDesk = this.id;
    var pupil = e.originalEvent.dataTransfer.getData("text");
    classroom.movePupil(pupil, targetDesk);
};

Desk.prototype.render = function () {
    this.selector.innerHTML = "";
    this.pupils.forEach(function (pupil) {
        this.selector.append(pupil.selector);
    }.bind(this));
};
