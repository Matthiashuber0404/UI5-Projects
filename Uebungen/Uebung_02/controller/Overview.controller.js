/* eslint-disable no-console */
sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/MessageToast"
], function (Controller, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("routing.template.controller.Overview", {

		onInit: function () {
			MessageToast.show("gestartet");
		},

		onZurDetailseiteButtonPress: function (oEvent) {
			var oRouter = new sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("DetailRoute", { detailPath: 1 });
		},

		onHobbysListSelectionChange: function(oEvent) {
			
		},

		onKollegenTableItemPress: function(oEvent) {
			var obj = oEvent.getParameters().listItem;
			var oEntry = obj.getBindingContext("data").getObject();
			console.log(oEntry);
			console.log(oEntry.Buero)
		},

	});

});