function StatusBar(greenboard) {
    this.selector = $("<div>", {id: "status-bar", style: "text-align: center;"});
    this.greenboard = greenboard;
    this.permanentRender(500);

}

StatusBar.prototype.render = function () {

    if (this.greenboard.activePlugin !== undefined && this.greenboard.activePlugin !== null) {
        this.selector.html("");
        this.selector.append($("<b>", {text: "<<", style: "float: left;cursor:pointer;"}).click(function() {
            this.greenboard.activePlugin = null;
            this.greenboard.init();
            this.render();
        }.bind(this)));
        this.selector.append($("<b>", {text: this.greenboard.activePlugin.name}));
        this.selector.append($("<b>", {text: new Date().toLocaleString(), style: "float: right;"}));
    } else {
        this.selector.html("<b>Kein Plugin geladen</b>");
    }

};

StatusBar.prototype.notify = function(notification) {
    console.log(notification);
};

StatusBar.prototype.permanentRender = function (refreshRate) {
    setTimeout(function () {
        this.render();
        this.permanentRender(refreshRate)
    }.bind(this), refreshRate);
};