function Classroom(pupils, parent, deskCount, deskRows, deskColumns) {
    this.parent = parent;
    this.selector = $("<div>", {id: "classroom"});
    this.desks = [];
    this.deskRows = deskRows;
    this.deskColumns = deskColumns;
    this.addDesks(deskCount);
    this.placePupils(pupils);
    this.render();
    return this;
}

Classroom.prototype.addDesks = function (deskCount) {
    for (var i = 0; i < deskCount; i++) {
        this.desks.push(new Desk(i));
    }
};

Classroom.prototype.placePupils = function (pupils) {
    while (pupils.length > 0) {
        this.placeAtNextFreeDesk([pupils.pop()])
    }
};

Classroom.prototype.placeAtNextFreeDesk = function (pupils) {
    var desk = this.desks.find(function (desk) {
        return desk.pupils.length === 0;
    });

    desk.pupils = pupils;
};

Classroom.prototype.getPupilDesk = function(pupilId) {
  return this.desks.find(function (desk) { return desk.pupils.find(function (pupil) { return pupil.id === pupilId}) });
};

Classroom.prototype.movePupil = function(pupilId, targetDeskId) {
    console.log("move");
    var sourceDesk = this.getPupilDesk(parseInt(pupilId));
    var targetDesk = this.desks.find(function (desk) { return desk.id === parseInt(targetDeskId)});
    var pupil = sourceDesk.pupils.find(function (pupil) { return pupil.id === parseInt(pupilId)});

    targetDesk.pupils.push(pupil);
    var indexOfPupil = sourceDesk.pupils.indexOf(pupil);
    sourceDesk.pupils.splice(indexOfPupil, 1);

    sourceDesk.render();
    targetDesk.render();
};

Classroom.prototype.render = function () {

    var desks = this.desks.slice(0);
    for (var y = 0; y < this.deskRows; y++) {
        var row = $("<div>",  {class: "desk-row"});
        for (var x = 0; x < this.deskColumns; x++) {
            var desk = desks.pop();
            desk.render();
            row.append(desk.selector);
        }
        this.selector.append(row);
    }

    this.parent.append(this.selector);
};