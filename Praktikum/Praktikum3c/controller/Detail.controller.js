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
			let auftragid = oEvent.getParameter("arguments").detailPath;
			let aFilter = [];
			if (auftragid) {
				aFilter.push(new Filter("Aufnr", FilterOperator.EQ, auftragid))
			}
			let oObject = this.byId("idAfpoTable");
			let oBinding = oObject.getBinding("items");
			oBinding.filter(aFilter);
		},


	});

});