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

		onGenericTilePress: function(oEvent) {
			let auftragid = oEvent.getSource().getHeader();
			auftragid = auftragid.replace('Auftrag ', '')
			console.log(auftragid);

			let obj = this.getView().getModel("sales").getData().Afko;
			console.log(obj);
			console.log(obj.length)


			var oRouter = new sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("DetailRoute", { detailPath: auftragid });
		},

	});

});