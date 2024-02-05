sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/Filter", "sap/ui/model/FilterOperator"
], function (Controller, MessageBox, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("routing.template.controller.Detail", {

		onInit: function () {

		},

		onSearchFieldSearch: function (oEvent) {
			let sSearch = oEvent.getParameter("query")
			if (sSearch) {
				console.log("Suchfeld gefüllt");
			}
			else {
				sSearch = 1;
			}

			let oModel = this.getView().getModel("schueler");
			let sPath = "/classSet(" + sSearch + ")";
			let that = this;

			oModel.read(sPath, {
				success: function (data) {
					let oClassModel = new sap.ui.model.json.JSONModel();
					oClassModel.setData(data);
					that.getView().setModel(oClassModel, "class")
				},
				error: function (err) {
					console.log("err")
				},
				urlParameters: {
					$expand: ["pupilSet"]
				}
			})
		}


	});

});