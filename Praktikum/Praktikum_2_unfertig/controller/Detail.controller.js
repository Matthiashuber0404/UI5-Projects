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
				aFilter.push(new Filter("kategorie", FilterOperator.EQ, katid))
			}
			let oObject = this.byId("idFoodList");
			let oBinding = oObject.getBinding("items");
			oBinding.filter(aFilter);
		},

		formatPreis: function (sValue) {
			return (parseFloat(sValue).toFixed(2));
		},
		onListItem: function (oEvent) {
			let obj = oEvent.getSource().getSelectedItem()
			// Möglichkeit 1
			let OEntry = obj.getBindingContext("food").getObject();
			console.log(OEntry.bezeichnung)
			// Möglichkeit 2
			let speise = obj.getProperty("title").split(", ");
			console.log(speise[0] + " " + speise[1])
		}


	});

});