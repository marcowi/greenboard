var classroom;

$.get('plugins/sitin/js/mig-test.csv', function(data) {
    classroom = new Classroom(getPupils(data), $("#container-center"), 32, 4, 8);
});

function getPupils(fileText) {
    var pupils = [];
    var counter = 1;
    fileText.split(/\r\n|\n/).forEach(function (line) {
       var pupilSplits = line.split(";");
       if (pupilSplits.length > 0) {
           pupils.push(new Pupil(counter, pupilSplits[1], pupilSplits[0], pupilSplits[2]));
           counter++;
       }
    });
    return pupils;
}