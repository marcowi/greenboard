function Greenboard() {
    this.selector = $("#greenboard");
    this.statusbar = new StatusBar(this);
    this.pluginContainer = $("<div>", {id: "plugin-container"});
    this.plugins = [];
    this.activePlugin = null;
}

Greenboard.prototype.init = function () {
    console.log("Loaded " + this.plugins.length + " plugins.");
    this.selector.append(this.statusbar.selector);
    this.selector.append(this.pluginContainer);
    this.listPlugins();
};

Greenboard.prototype.loadPlugins = function () {
    $.getJSON("enabled-plugins.json", function (data) {
        this.plugins = data;
        this.init();
    }.bind(this));
};

Greenboard.prototype.listPlugins = function () {
    var that = this;
    this.pluginContainer.html("");
    var $table = $("<div>", {class: "table"});

    this.plugins.forEach(function (plugin) {
        $table.append($("<div>", {id: plugin.folder, class: "cell plugin", text: plugin.name}).click(function () {
            that.showPlugin(plugin.folder)
        }));
    });

    that.pluginContainer.append($table);
};

Greenboard.prototype.showPlugin = function (id) {
    this.pluginContainer.html("");
    this.activePlugin = $.grep(this.plugins, function(e) {return e.folder === id;})[0];
    this.pluginContainer.load("plugins/" + id + "/index.html");

    this.render();
};

Greenboard.prototype.render = function () {
    this.statusbar.render();
};