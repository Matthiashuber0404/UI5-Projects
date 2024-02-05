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
			let oid = oEvent.getSource().getBindingContext("events").getObject().Oid

			const oRouter = this.getOwnerComponent().getRouter()			
			oRouter.navTo("DetailRoute", { detailPath: oid });
		},

	});

});