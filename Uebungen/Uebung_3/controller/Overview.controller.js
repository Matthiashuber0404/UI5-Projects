/* eslint-disable no-console */
sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/MessageToast", "sap/ui/model/Filter", "sap/ui/model/FilterOperator"
], function (Controller, MessageBox, MessageToast, Filter, FilterOperator)  {
	"use strict";

	return Controller.extend("routing.template.controller.Overview", {

		onInit: function () {
			MessageToast.show("gestartet");
		},

		onZurDetailseiteButtonPress: function (oEvent) {
			var oRouter = new sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("DetailRoute", { detailPath: 1 });
		},
		onSucheButtonPress: function(){
			//1.Schritt
			let sKlasse = this.byId("idKlasseInput").getValue()
			let sGruppe = this.byId("idGruppeInput").getValue()
			console.log(sKlasse +" "+sGruppe)
			//2.Schritt Filter aufbauen
			let aFilter = []
			if (sKlasse) {
				aFilter.push(new Filter("Cid", FilterOperator.EQ, sKlasse))
			}
			if (sGruppe) {
				aFilter.push(new Filter("Groupno", FilterOperator.EQ, sGruppe))
			}
			console.log(aFilter)
			//3.Schritt Filter auf die Tabelle anwenden - Data Binding
			let oBinding = this.byId("idSchuelerTable").getBinding("items")
			oBinding.filter(aFilter)
		}

	});

});