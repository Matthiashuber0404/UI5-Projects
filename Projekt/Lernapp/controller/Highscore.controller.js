var user = ""
var punkte = 0

sap.ui.define([
  "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/Filter", "sap/ui/model/FilterOperator"
], function (Controller, MessageBox, Filter, FilterOperator) {
  "use strict";

  return Controller.extend("routing.template.controller.Highscore", {




    onInit: function () {

      var oRouter = new sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("HighscoreRoute").attachPatternMatched(this._onObjectMatched, this);
    },
    _onObjectMatched: function (oEvent) {
      let daten = oEvent.getParameter("arguments").detailPath;
      let index = daten.indexOf("[1]");
      if (index !== -1) {
        user = daten.substring(0, index);

        punkte = parseInt(daten.substring(index + 3));

        console.log("user:", user);
        console.log("punkte:", punkte);
      }
    }


  });

});
