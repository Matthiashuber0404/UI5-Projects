/* eslint-disable no-console */
sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/MessageToast"
], function (Controller, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("routing.template.controller.Overview", {

		onInit: function () {
			MessageToast.show("gestartet");
		},

		onSpielStartenButtonPress: function(oEvent) {
			let eingabe = this.getView().byId("idNameInput").getValue();
			let pass = this.getView().byId("idPassInput").getValue();
			// console.log(eingabe)
			// console.log(pass)

			if (eingabe != "" && pass != "") {
				var oRouter = new sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("DetailRoute", { detailPath: eingabe });
			}else {
				alert("Nutzername und Passwort eingeben!")
			}

			
		},

		onHighScoresButtonPress: function(oEvent) {
			
		},

	
		

	});

});