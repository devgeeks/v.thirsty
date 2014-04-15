(function(window) {
  "use strict";

  var $ = window.Zepto,
      vthirsty = window.vthirsty || {},
      Backbone = window.Backbone,
      _ = window._;
  window.vthirsty = window.vthirsty || {};
  var console = window.console || {};
  console.log = console.log || function() {};

  window.setTimeout(function() {
    $("body").prepend(window.JST["tpl/Menu.hbs"]());
    window.vthirsty.appView = new window.vthirsty.AppView();
    window.vthirsty.appView.render();
  }, 0);

  window.vthirsty.navigator = new window.BackStack.StackNavigator({el:'.pages'});

  window.vthirsty.beersData = [];
  $.ajax({
    url: "./data/beer.json",
    dataType: "json",
    success: function(data) {
      window.vthirsty.beersData = data;
      window.vthirsty.beersCollection = new window.vthirsty.BeersCollection(window.vthirsty.beersData);
      var filteredCollection = new window.vthirsty.BeersCollection(
        window.vthirsty.beersCollection.filterNames("") // start with all
      );
      if (window.vthirsty.navigator.viewsStack.length === 0) {
        window.vthirsty.navigator.pushView(
          window.vthirsty.BeersListView,
          { collection: window.vthirsty.beersCollection },
          new window.BackStack.NoEffect());
      }
    }
  });

  var onDeviceReady = function() {
    if (navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 7_\d/i)) {
      $("#container").css({top: "20px"});
      $(".menu").css({top: "20px"});
    }
    if (window.StatusBar && window.deviceIsIOS) {
      window.StatusBar.styleLightContent();
    }
  };

  document.addEventListener("deviceready", onDeviceReady, false);

  window.addEventListener('load', function() {
    window.FastClick.attach(document.body);
  }, false);

})(window);
