var points = 0

sap.ui.define([
  "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/Filter", "sap/ui/model/FilterOperator"
], function (Controller, MessageBox, Filter, FilterOperator) {
  "use strict";

  return Controller.extend("routing.template.controller.Detail", {

    onInit: function () {

    },


    onGenericTilePress: function (oEvent) {
      var click = oEvent.getSource();
      var tileDomRef = click.getDomRef();
      
      if (tileDomRef) {
        var classList = tileDomRef.classList;
        var tileClass = Array.from(classList).find((className) => className === "t");

        // Get the Panel that contains the GenericTiles
        var panel = this.getView().byId("idGenericsPanel");
        var genericTiles = panel.getContent();

        genericTiles.forEach(function (genericTile) {
          var tileDomRef = genericTile.getDomRef();
          if (tileClass) {

            if (tileDomRef.classList.contains("t") && !tileDomRef.classList.contains("true") ) {
              points = points + 25
              tileDomRef.classList.add("true");
            } else if (tileDomRef.classList.contains("f") ) {
              tileDomRef.classList.add("false");
            }

          } else {
            if (tileDomRef.classList.contains("f")) {
              tileDomRef.classList.add("false");
            } else {
              tileDomRef.classList.add("true");
            }
          }
        });


        setTimeout(function () {
          console.log("Punkte:", points)
        }, 2500);


      }
    },









  });

});