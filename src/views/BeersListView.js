(function(window) {
  "use strict";

  var $ = window.Zepto,
      Backbone = window.Backbone,
      _ = window._;
  window.vthirsty = window.vthirsty || {};
  var console = window.console || {};
  console.log = console.log || function() {};

  window.vthirsty.BeersListView = Backbone.View.extend({
    destructionPolicy: "never",
    events: {
      "keyup input": "search"
    },
    initialize: function() {
      _.bindAll(this, "addOne", "addAll", "render", "delay", "search");
      this.collection.on( "add", this.addOne, this );
      this.collection.on( "all", this.render, this );
      this.subViews = [];
    },
    render: function() {
      this.$el.html(
        window.JST["tpl/BeersList.hbs"]()
      );
      this.addAll();
      //this.$el.scrollTop(this.$("div.search").height()-1);
      return this;
    },
    addAll: function (models) {
      models = models || this.collection.models;
      this.collection.each(this.addOne);
      this.$(".loading").hide();
    },
    addOne: function(model) {
      var view = new window.vthirsty.ListViewItem({
        model: model
      });
      this.$("ul").append(view.render().el);
      this.subViews.push(view);
    },
    timer: 0,
    delay: function(callback, ms){
      clearTimeout (this.timer);
      this.timer = setTimeout(callback, ms);
    },
    search: function() {
      var _this = this;
      this.delay(function() {
        _this.$el.scrollTop(0);
        var letters = _this.$("input").val() || "";
        _this.collection = new window.vthirsty.BeersCollection(
          // Filtering is done on the base collection
          window.vthirsty.beersCollection.filterNames(letters)
          );
        _this.$("ul").empty();
        _this.addAll();
      }, 300);
    },
    displayVeganOnly: function() {
      this.collection = new window.vthirsty.BeersCollection(
        window.vthirsty.beersCollection.isVegan()
      );
      this.$("ul").empty();
      this.addAll();
    },
    displayAll: function() {
      this.collection = new window.vthirsty.BeersCollection(
        window.vthirsty.beersCollection.filterNames("")
      );
      this.$("ul").empty();
      this.addAll();
    }
  });

})(window);
