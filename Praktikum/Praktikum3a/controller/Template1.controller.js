sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/MessageToast", "sap/ui/model/Filter", "sap/ui/model/FilterOperator"
], function (Controller, MessageBox, MessageToast, Filter, FilterOperator) {
	"use strict";

    return Controller.extend("basic.template.controller.Template1", {
        onInit: function() {},
        formatPreis: function (sValue) {
			return (parseFloat(sValue).toFixed(2));
		},

        onSearchFieldSearch: function(oEvent) {
			//MessageBox.alert("bin am suchen")
			let sQuery = oEvent.getParameter("query")
			let aFilter = [];
			if (sQuery) {
				aFilter.push(new Filter("Artname", FilterOperator.Contains, sQuery))
			}
			let oObject = this.byId("idKategoriePanel");
			let oBinding = oObject.getBinding("content");
			oBinding.filter(aFilter);
		}
    });
});