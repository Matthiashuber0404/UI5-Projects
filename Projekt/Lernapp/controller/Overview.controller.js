/* eslint-disable no-console */
let id = 0
let that = this
let iO = 0
let pass = ""
let frpass = ""
let eingabe = ""
sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/MessageToast", "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, MessageBox, MessageToast, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("routing.template.controller.Overview", {

		onInit: function () {
			MessageToast.show("gestartet");
			
		},
		

		onSpielStartenButtonPress: function (oEvent) {

			if (iO == 1) {
				var oRouter = new sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("DetailRoute", { detailPath: id });
			}



		},

		onInputChange: function () {
			let pass = this.getView().byId("idPassInput").getValue()
			let eing = this.getView().byId("idNameInput").getValue()
			
			if (pass == "" || eing == "") {
				this.getView().byId("idAnmeldenButton").setEnabled(false)
				this.getView().byId("idRegistrierenButton").setEnabled(false)
			}else{
				this.getView().byId("idAnmeldenButton").setEnabled()
				this.getView().byId("idRegistrierenButton").setEnabled()
			}	
		},

		onHighScoresButtonPress: function (oEvent) {
			var oRouter = new sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("HighscoreRoute", { detailPath: 1 });
		},
		
		onAnmeldenButtonPress: function (oEvent) {

			async function hashStringToSHA256(inputString) {
				const encoder = new TextEncoder();
				const data = encoder.encode(inputString);
			
				const hashBuffer = await crypto.subtle.digest('SHA-256', data);

				const hashArray = Array.from(new Uint8Array(hashBuffer));
				const hashedString = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
			
				return hashedString;
			}
			
			pass = this.getView().byId("idPassInput").getValue();
			hashStringToSHA256(pass).then(result => {
				// console.log('Hashed String:', result);
				pass = result
			});
			
			let zw = eingabe
			var oModel = this.getView().getModel("quiz");
			if (eingabe == "") {
				eingabe = this.getView().byId("idNameInput").getValue()
				
			}
			var sPath = "/personSet";
			let aFilter = []
			if (eingabe) {
				aFilter.push(new Filter("Username", FilterOperator.EQ, eingabe))
			}

			

			var fnSuccess = function (data) {
				data.results.forEach(element => {
					if (element.Username == eingabe) {
						id = element.Pid
						frpass = element.Passwort
						console.log(frpass)
						pass = pass.toUpperCase()
						frpass = frpass.toUpperCase()
						console.log(pass)
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
				if (this.getView().byId("idNameInput").getValue()  != "" && this.getView().byId("idPassInput").getValue() != "") {
					console.log(frpass)
						console.log(pass)
					if (frpass.toUpperCase() == pass.toUpperCase()) {
						iO = 1
						this.getView().byId("idNameInput").setValue("");
						this.getView().byId("idPassInput").setValue("");
						this.getView().byId("idSpielStartenButton").setEnabled()
						this.getView().byId("idNameInput").setEnabled(false);
						this.getView().byId("idPassInput").setEnabled(false);
						this.getView().byId("idRegistrierenButton").setEnabled(false);
						this.getView().byId("idAnmeldenButton").setEnabled(false);
						this.getView().byId("idUserButton").setText(eingabe)
						this.getView().byId("idAbmeldenButton").setEnabled();
						this.getView().byId("idAbmeldenButton").setVisible();
					} else {
						alert("Falsches Passwort eingegeben!")
					}

				} else {
					alert("Nutzername und Passwort eingeben!")
				}

				console.log(iO)
			}, 1250);

		},

		onRegistrierenButtonPress: function (oEvent) {
			async function hashStringToSHA256(inputString) {
				// Convert the string to an ArrayBuffer
				const encoder = new TextEncoder();
				const data = encoder.encode(inputString);
			
				// Calculate the SHA-256 hash
				const hashBuffer = await crypto.subtle.digest('SHA-256', data);
			
				// Convert the hash to a hex string
				const hashArray = Array.from(new Uint8Array(hashBuffer));
				const hashedString = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
			
				return hashedString;
			}
			
			pass = this.getView().byId("idPassInput").getValue();
			const inputString = 'bfs2021ik';
			hashStringToSHA256(pass).then(result => {
				console.log('Hashed String:', result);
				pass = result
			});

			setTimeout(() => {
				console.log("Hashed:",pass)
			eingabe = this.getView().byId("idNameInput").getValue();
			

			frpass = ""

			var oModel = this.getView().getModel("quiz");

			var sPath = "/personSet";
			let aFilter = []
			if (eingabe) {
				aFilter.push(new Filter("Username", FilterOperator.EQ, eingabe))
			}


			var fnSuccess = function (data) {
				data.results.forEach(element => {
					if (element.Username == eingabe) {
						id = element.Pid
						frpass = element.Passwort
						console.log(frpass)
						console.log(pass)
					}
				});
				console.log(id)
			}
			var fnError = function () {
				MessageBox.error("User nicht gefunden!");
			}
			oModel.read(sPath, {
				filters: aFilter,
				success: fnSuccess,
				error: fnError
			});

			// var that = this;
			let abr = 0
			var oModel = this.getView().getModel("quiz");
			var oNewPupil = {
				"Pid": 1,
				"Username": eingabe,
				"Passwort": pass,
				"Pershighscore": 0
			};
			var sPath = "/personSet/";
			var fnSuccess = function (data) {

				if (data.Pid == 0) {
					alert("Benutzername bereits vorhanden!")
					abr = 1
				}
			};
			var fnError = function () {

			};
			var mSettings = {
				success: fnSuccess,
				error: fnError
			};
			if (eingabe != "" && pass != "") {
				oModel.create(sPath, oNewPupil, mSettings);
			
			


			setTimeout(() => {
				if (abr == 0) {
					eingabe = this.getView().byId("idNameInput").getValue();
					let pass = this.getView().byId("idPassInput").getValue();
					var that = this;
					var oModel = this.getView().getModel("quiz");
					var oNewPupil = {
						"Hid": 1,
						"Punkte": 0,
						"Pid": id,           

					};
					var sPath = "/highscoreSet/";
					var mSettings = {
						success: fnSuccess,
						error: fnError
					};
					var fnSuccess = function (data) {

					};
					oModel.create(sPath, oNewPupil, mSettings);

					alert("Benutzer erfolgreich erstellt")
					console.log(id, "Userid")
					that.onAnmeldenButtonPress()
				}
			}, 2050);

		}else{
			alert("Benutzername und Passwort eingeben!")
		}
			}, 250);
			
		},

		

		onUserButtonPress: function (oEvent) {
			if (iO == 1) {
				var oRouter = new sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("UserRoute", { detailPath: id });
			}else{
				MessageBox.information("Erst nach dem Anmelden verfügbar!")
			}
		},


		onAbmeldenButtonPress: function (oEvent) {
			frpass = ""
			eingabe = ""
			iO = 0
			this.getView().byId("idNameInput").setValue("");
			this.getView().byId("idPassInput").setValue("");
			this.getView().byId("idSpielStartenButton").setEnabled(false)
			this.getView().byId("idNameInput").setEnabled(true);
			this.getView().byId("idPassInput").setEnabled(true);
			this.getView().byId("idRegistrierenButton").setEnabled(true);
			this.getView().byId("idAnmeldenButton").setEnabled(true);
			this.getView().byId("idUserButton").setText("Kein User angemeldet")
			this.getView().byId("idAbmeldenButton").setEnabled(false);
			this.getView().byId("idAbmeldenButton").setVisible(false);
		}


	});

});