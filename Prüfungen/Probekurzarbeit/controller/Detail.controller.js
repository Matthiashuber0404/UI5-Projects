sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/Filter", "sap/ui/model/FilterOperator"
], function (Controller, MessageBox, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("routing.template.controller.Detail", {

		onInit: function () {
			var oRouter = new sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("DetailRoute").attachPatternMatched(this._onObjectMatched, this);
	
		},
		_onObjectMatched: function (oEvent) {
			let katid = oEvent.getParameter("arguments").detailPath;
			let aFilter = [];
			if (katid) {
				aFilter.push(new Filter("Ort", FilterOperator.EQ, katid))
			}
			let oObject = this.byId("idEventsTable");
			let oBinding = oObject.getBinding("items");
			oBinding.filter(aFilter);
		},

		onSucheButtonPress: function(oEvent) {
			let sVer = this.byId("idVSearchField").getValue()
			let sBez = this.byId("idBSearchField").getValue()
			let sUhr = this.byId("idUSearchField").getValue()
			//2.Schritt Filter aufbauen
			let aFilter = []
			if (sVer) {
				aFilter.push(new Filter("Ort", FilterOperator.EQ, sVer))
			}
			if (sBez) {
				aFilter.push(new Filter("Bezeichnung", FilterOperator.Contains, sBez))
			}
			if (sUhr) {
				aFilter.push(new Filter("Zeit", FilterOperator.EQ, sUhr))
			}
			console.log(aFilter)
			//3.Schritt Filter auf die Tabelle anwenden - Data Binding
			let oBinding = this.byId("idEventsTable").getBinding("items")
			oBinding.filter(aFilter)
		},

		onFilterlöschenButtonPress: function(oEvent) {
			let aFilter = []
			let oBinding = this.byId("idEventsTable").getBinding("items")
			oBinding.filter(aFilter)
		},

		onItemPressPress: function(event) {
			var obj = event.getParameters().listItem;
    		var oEntry = obj.getBindingContext("events").getObject();
			let preis = 0
			// this.getView().getModel("events").getData().forEach(element => {
			// 	if (element.Preise.kat == 2) {
			// 		console.log(element.Preise.preis)
			// 	}
			// });
			console.log(this.getView().getModel("events").getData().Preise.preis)
			MessageBox.success('Sie haben die Veranstaltung "' + oEntry.Bezeichnung + '" gewählt.' 
    + '\nDatum: ' + oEntry.Datum 
    + '\nUhrzeit: ' + oEntry.Zeit 
    + '\nVeranstaltungsort: ' + oEntry.Oid 
    + '\nPreis: ' + oEntry.preiskategorie);	}


	});

});