sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		createSchoolModel: function () {
			var oModel = new JSONModel();
			oModel.loadData("model/school.json");
			return oModel;
		},
		createDataModel: function () {
			var oModel = new JSONModel();
			oModel.loadData("model/data.json");
			return oModel;
		}

	};
});