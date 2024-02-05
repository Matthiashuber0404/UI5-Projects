/* eslint-disable no-console */
sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/MessageToast", "sap/ui/model/Filter", "sap/ui/model/FilterOperator"
], function (Controller, MessageBox, MessageToast, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("routing.template.controller.Overview", {
		
		onInit: function () {
			MessageToast.show("gestartet");
		},

		onZurDetailseiteButtonPress: function (oEvent) {
			var oRouter = new sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("DetailRoute", { detailPath: 1 });
		},

		onGenericTilePress: function(oEvent) {
			let katId = oEvent.getSource().getSubheader();
			console.log(katId);

			let obj = this.getView().getModel("food").getData().Kategorie;
			console.log(obj);
			console.log(obj.length)

			var oRouter = new sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("DetailRoute", { detailPath: katId });
		},

		onSearchFieldSearch: function(oEvent) {
			//MessageBox.alert("bin am suchen")
			let sQuery = oEvent.getParameter("query")
			let aFilter = [];
			if (sQuery) {
				aFilter.push(new Filter("katbez", FilterOperator.Contains, sQuery))
			}
			let oObject = this.byId("idKategoriePanel");
			let oBinding = oObject.getBinding("content");
			oBinding.filter(aFilter);
		}

	});

});