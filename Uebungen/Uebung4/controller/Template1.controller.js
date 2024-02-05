sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, MessageBox, JSONModel) {
    "use strict";

    return Controller.extend("basic.template.controller.Template1", {
        onInit: function () { },

        onAbschickenButtonPress: function (oEvent) {
            let err = false
            if (this._onValidate(this.getView().byId("idUsernameInput"))) {
                var username = this.getView().byId("idUsernameInput").getValue()
            } else {
                err = true
            }
            if (this._onAlterValidate(this.getView().byId("idAlterInput"))) {
                var alter = this.getView().byId("idAlterInput").getValue()
            } else {
                err = true
            }

            if (!err) {
                let result = "Username: " + username + "\nAlter: " + alter
                this.getView().byId("idTextArea").setValue(result)
            }else{
                this.getView().byId("idTextArea").setValue("")
            }
        },

        _onValidate: function (oEvent) {
            let oBinding = oEvent.getBindingInfo("value")
            try {
                oBinding.type.validateValue(oEvent.getValue())
                oEvent.setValueState("Success")
                return true
            } catch (error) {
                oEvent.setValueState("Error")
                return false
            }
        },
        _onAlterValidate: function (oEvent) {
            let oBinding = oEvent.getBindingInfo("value")
            try {
                oBinding.type.validateValue(oEvent.getValue())
                oEvent.setValueState("Success")
                return true
            } catch (error) {
                oEvent.setValueState("Error")
                return false
            }
        },

        onInputChange: function (oEvent) {
            var oObject = oEvent.getSource()
            return this._onValidate(oObject)
        },

        onInputAlterChange: function (oEvent) {
            var oObject = oEvent.getSource()
            return this._onAlterValidate(oObject)
        },


    });
});