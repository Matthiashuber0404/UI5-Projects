let userid = 0
let newPass = ""
let frrpass = ""
sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/MessageToast", "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, MessageBox, MessageToast, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("routing.template.controller.User", {

		onInit: function () {

			var oRouter = new sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("UserRoute").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			let daten = oEvent.getParameter("arguments").detailPath;
			userid = daten
			console.log(userid)
			let that = this
			var oModel = this.getView().getModel("quiz");
			var punkte = 0
			var sPath = "/personSet";
			let aFilter = []
			if (true) {
				aFilter.push(new Filter("Pid", FilterOperator.EQ, userid))
			}


			var fnSuccess = function (data) {
				data.results.forEach(element => {
					if (element.Pid == userid) {
						punkte = element.Pershighscore
						let username = element.Username
						let passwort = element.Passwort

						var first = passwort.substring(0, 6)
						var last = passwort.substring(passwort.length - 6);

						passwort = first + "[...]" + last

						that.getView().byId("idUserText").setText(username);
						that.getView().byId("idPWText").setText(passwort);
						that.getView().byId("idPunkteText").setText("" + punkte);
					}
				});

			}
			var fnError = function () {
				MessageBox.error("User nicht gefunden!");
			}
			oModel.read(sPath, {
				filters: aFilter,
				success: fnSuccess,
				error: fnError
			});
		},
		onidPasswortNdernButtonPress: function (oEvent) {
			this.getView().byId("idPasswortNdernButton").setEnabled(false);
			this.getView().byId("idPasswortaendernBestaetigenButton").setVisible();
			this.getView().byId("idAltesPasswortEingebenInput").setVisible();
			this.getView().byId("idNeuesPasswortEingebenInput").setVisible();
			this.getView().byId("idAbbrechenButton").setVisible();
			this.getView().byId("idPasswortaendernBestaetigenButton").setEnabled();
			this.getView().byId("idAltesPasswortEingebenInput").setEnabled();
			this.getView().byId("idNeuesPasswortEingebenInput").setEnabled();
			this.getView().byId("idAbbrechenButton").setEnabled();
		},

		onidPasswortaendernBestaetigenButtonPress: function (oEvent) {
			let that = this
			async function hashStringToSHA256(inputString) {
				const encoder = new TextEncoder();
				const data = encoder.encode(inputString);
				const hashBuffer = await crypto.subtle.digest('SHA-256', data);
				const hashArray = Array.from(new Uint8Array(hashBuffer));
				const hashedString = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
				return hashedString;
			}

			var pass = this.getView().byId("idAltesPasswortEingebenInput").getValue();
			hashStringToSHA256(pass).then(result => {
				console.log('Hashed String:', result);
				pass = result
			});

			var newPass = this.getView().byId("idNeuesPasswortEingebenInput").getValue();
			hashStringToSHA256(newPass).then(result => {
				console.log('New Hashed String:', result);
				newPass = result
			});


			var oModel = this.getView().getModel("quiz");
			var punkte = 0
			var sPath = "/personSet";
			let aFilter = []
			if (true) {
				aFilter.push(new Filter("Pid", FilterOperator.EQ, userid))
			}

			setTimeout(() => {



				var fnSuccess = function (data) {
					data.results.forEach(element => {
						if (element.Pid == userid) {
							console.log("aktuelles Pw:", element.Passwort)
							console.log("hinterlegtes Pw:", pass)
							console.log("neues Pw:", newPass)
							frrpass = element.Passwort
						}
					});

				}
				var fnError = function () {
					MessageBox.error("User nicht gefunden!");
				}
				oModel.read(sPath, {
					filters: aFilter,
					success: fnSuccess,
					error: fnError
				});

				setTimeout(() => {


					if (pass.toUpperCase() == frrpass.toUpperCase()) {
						console.log("dingdong")
						setTimeout(() => {
							var oModel = this.getView().getModel("quiz");
							console.log("Wirklich gesp. Passwort: ", newPass)
							var oNewPupil = {
								"Passwort": newPass
							};
							var sPath = "/personSet(" + userid + ")";
							var fnSuccess = function (data) {
								alert("Passwort wurde geändert!")
							};
							var fnError = function () {
								console.log("wow")
							};
							var mSettings = {
								success: fnSuccess,
								error: fnError
							};
							setTimeout(() => {
								oModel.update(sPath, oNewPupil, mSettings);
								this.onidAbbrechenButtonPress(oEvent)
								this.getView().byId("idAltesPasswortEingebenInput").setValue("")
								this.getView().byId("idNeuesPasswortEingebenInput").setValue("")
								setTimeout(() => {
									var oModel = this.getView().getModel("quiz");
									var punkte = 0
									var sPath = "/personSet";
									let aFilter = []
									if (true) {
										aFilter.push(new Filter("Pid", FilterOperator.EQ, userid))
									}


									var fnSuccess = function (data) {
										data.results.forEach(element => {
											if (element.Pid == userid) {
												punkte = element.Pershighscore
												let username = element.Username
												let passwort = element.Passwort

												var first = passwort.substring(0, 6)
												var last = passwort.substring(passwort.length - 6);

												passwort = first + "[...]" + last

												that.getView().byId("idUserText").setText(username);
												that.getView().byId("idPWText").setText(passwort);
												that.getView().byId("idPunkteText").setText("" + punkte);
											}
										});

									}
									var fnError = function () {
										MessageBox.error("User nicht gefunden!");
									}
									oModel.read(sPath, {
										filters: aFilter,
										success: fnSuccess,
										error: fnError
									});
								}, 1000);
							}, 1000);

						}, 1250);
					}
				}, 1250);

			}, 1250);

		},

		onidAbbrechenButtonPress: function (oEvent) {
			this.getView().byId("idPasswortNdernButton").setEnabled();
			this.getView().byId("idPasswortaendernBestaetigenButton").setVisible(false);
			this.getView().byId("idAltesPasswortEingebenInput").setVisible(false);
			this.getView().byId("idNeuesPasswortEingebenInput").setVisible(false);
			this.getView().byId("idAbbrechenButton").setVisible(false);
			this.getView().byId("idPasswortaendernBestaetigenButton").setEnabled(false);
			this.getView().byId("idAltesPasswortEingebenInput").setEnabled(false);
			this.getView().byId("idNeuesPasswortEingebenInput").setEnabled(false);
			this.getView().byId("idAbbrechenButton").setEnabled(false);
		}

	});

});