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

		createEventModel: function () {
			var oModel = new JSONModel(Device);
			oModel.loadData("model/event.json");
			return oModel;
		}

	};
});