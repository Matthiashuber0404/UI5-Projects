var points = 0
var fragen = []
var cnt = 0
var count = 30;
var stoper = 0
var username = 0
var max = 0
var once = 0

sap.ui.define([
  "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/Filter", "sap/ui/model/FilterOperator"
], function (Controller, MessageBox, Filter, FilterOperator) {
  "use strict";

  return Controller.extend("routing.template.controller.Detail", {

    GetMax: function () {
      var oModel = this.getView().getModel("quiz");
      var sPath = "/questionSet";
      var fnSuccess = function (data) {
        data.results.forEach(element => {
          max = max + 1
        });
      }

      var fnError = function () {

      }
      oModel.read(sPath, {
        success: fnSuccess,
        error: fnError
      });
    },

    PushHighscore: function () {

      var oModel = this.getView().getModel("quiz");
      var punkte = 0
      var sPath = "/personSet";
      let aFilter = []
      if (true) {
        aFilter.push(new Filter("Pid", FilterOperator.EQ, username))
      }


      var fnSuccess = function (data) {
        data.results.forEach(element => {
          if (element.Pid == username) {
            punkte = element.Pershighscore
            console.log("Aktuelle Punkte", punkte)
            console.log("gesp punkte:", points)
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
        if (punkte < points) {

          var that = this;
          var oModel = this.getView().getModel("quiz");
          var pupilId = parseInt(username, 10);
          var sPath = "/highscoreSet(" + pupilId + ")";

          var fnSuccess = function () {
            console.log("alter Highscore gelöscht!")
          };

          var fnError = function (oError) {

          };

          var mSettings = {
            success: fnSuccess,
            error: fnError
          };

          oModel.remove(sPath, mSettings);


          setTimeout(() => {

            var oModel = this.getView().getModel("quiz");
            var oNewPupil = {
              "Pershighscore": points
            };
            var sPath = "/personSet(" + username + ")";
            var fnSuccess = function (data) {
            };
            var fnError = function () {

            };
            var mSettings = {
              success: fnSuccess,
              error: fnError
            };
            oModel.update(sPath, oNewPupil, mSettings);



            setTimeout(() => {
              var that = this;
              var oModel = this.getView().getModel("quiz");
              let userId = parseInt(username, 10);
              var oNewPupil = {
                "Hid": 1,
                "Punkte": points,
                "Pid": userId,          
              };
              var sPath = "/highscoreSet/";
              var mSettings = {
                success: fnSuccess,
                error: fnError
              };
              var fnSuccess = function (data) {
              };
              var fnError = function () {
              };
              oModel.create(sPath, oNewPupil, mSettings);
            }, 1400);

          }, 1500);

        } else {
          console.log("Nichts zum speichern!")
          console.log("Aktuelle Punkte", punkte)
          console.log("gesp punkte:", points)
          console.log(punkte > points)
        }

      }, 1300);
    },
    onUpdateFrage: function () {

      if (once == 0) {
        this.GetMax()
        once = 1
      }

        let dings = this.byId("idEndPunkteText")
        dings.setText("")
        dings.removeStyleClass("trueish");
        dings.removeStyleClass("wrong");
        const min = 1;

        let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        if (fragen.includes(randomNumber)) {
          while (fragen.includes(randomNumber)) {
            randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
          }
          fragen.push(randomNumber)
        } else {
          fragen.push(randomNumber)
        }


        let aFilter = []
        let aFilter2 = []
        var textFieldQ = this.getView().byId("idFrageText")
        if (cnt >= 10) {
          textFieldQ.setText("")
          randomNumber = 10000
          stoper = 1
          var oTextfield3 = this.getView().byId("idTimeText");
          var oButton = this.getView().byId("idHighScoresButton")
          oButton.setEnabled(true)
          oButton.setVisible(true);
          var oButton2 = this.getView().byId("idSpielneuStartenButton")
          oButton2.setEnabled(true)
          oButton2.setVisible(true);
          oTextfield3.setText("");
          oTextfield3 = this.getView().byId("idEndPunkteText");
          oTextfield3.setText("Checken Sie ihre Platzierung auf der HighScoreliste aus! :D");
          // idEndPunkteText
          alert("Spiel beendet")
          this.PushHighscore()
        } else {
          cnt = cnt + 1
          textFieldQ.setText("Frage " + cnt + ": ")
        }
        if (randomNumber) {
          aFilter.push(new Filter("Aid", FilterOperator.EQ, randomNumber))
          aFilter2.push(new Filter("Fid", FilterOperator.EQ, randomNumber))
        }

        let oBinding = this.byId("idQuizanswerSetPanel").getBinding("content")
        oBinding.filter(aFilter)

        let oBinding2 = this.byId("idQuestionSetPanel").getBinding("content")
        oBinding2.filter(aFilter2)

        count = 30    // Zurücksetzen des Timers

    },

    onInit: function () {


      var oRouter = new sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("DetailRoute").attachPatternMatched(this._onObjectMatched, this);
      var that = this;
      this.startCountdown();
      setTimeout(function () {
        console.log("Punkte:", points);
        that.onUpdateFrage();
      }, 100);
      
    },
    _onObjectMatched: function (oEvent) {
      username = oEvent.getParameter("arguments").detailPath;
      console.log("Pid:", username)
    },
    startCountdown: function () {
      var oTextfield = this.getView().byId("idTimeText");
      var countdownInterval = setInterval(function () {
        if (stoper != 1) {
          oTextfield.setText("" + count);

          count--;

          if (count < 0) {

            stoper = 1
          }
        }

      }, 1000);
    },


    onGenericTilePress: function (oEvent) {
      stoper = 1

      var oTextfield = this.getView().byId("idTimeText");
      var time = oTextfield.getText();

      var oTile = oEvent.getSource();
      let panel = this.byId("idAnswerGenericTile")
      console.log(panel)

      var elements = $(".test");


      elements.each(function (index, element) {



        console.log("Element at index " + index + ": ", $(element).text());
        var pruef = $(element).text()
        if (pruef.endsWith("A: 1")) {
          $(element).addClass("true");
        } else {
          $(element).addClass("false");
        }


      });

      var oSecondTileContent = oTile.getTileContent()[1];
      console.log(oTile)
      var oTextControl = oSecondTileContent.getContent().getText();
      var sTextValue = oTextControl

      var oTileContent = oTile.getTileContent()[0];
      var oTextControl1 = oTileContent.getContent().getText();
      var sTextValue2 = oTextControl1
      console.log("Richtig:", sTextValue);
      let dings = this.byId("idEndPunkteText")
      if (sTextValue.endsWith("A: 1")) {
        dings.addStyleClass("trueish");
        dings.setText("Richtig!")
        var bAddClass = (sTextValue.endsWith("A: 1"));
        console.log(bAddClass)
        oTile.toggleStyleClass("true", bAddClass);
        var oTextfield2 = this.getView().byId("idPunkteText");
        points = points + ((25 * time) * 0.5)   // Aktueller Max-Punkte Wert: 3750. Ohne 0.5: 7500
        oTextfield2.setText("Punkte: " + points);
      } else {
        dings.addStyleClass("wrong");
        dings.setText("Falsch! ( Angeklickt wurde: " + sTextValue2 + " )")
      }

      var genericTile = oEvent.getSource();
      var genericTileDom = genericTile.getDomRef();
      var classes = genericTileDom.classList;

      // Konvertiert die DOM-Klassen in ein Array, um sie leichter auszugeben
      var classArray = Array.from(classes);

      // Gibt die Klassen in der Konsole aus
      console.log("Klassen des angeklickten GenericTile:", classArray);
      console.log("Click");
      var that = this;
      setTimeout(function () {
        stoper = 0
        console.log("Punkte:", points);
        that.onUpdateFrage();
      }, 2000);
    },

    onSpielneuStartenButtonPress: function (oEvent) {
      // Timer wird bei Neustart nicht runtergezählt
      // ToDo
      cnt = 0
      points = 0
      count = 30
      stoper = 0
      var oTextfield2 = this.getView().byId("idPunkteText");
      oTextfield2.setText("Punkte: " + points);
      var oTextfield3 = this.getView().byId("idTimeText");
      oTextfield3.setText("30")
      var oButton = this.getView().byId("idHighScoresButton")
      oButton.setEnabled(false)
      oButton.setVisible(false);
      var oButton2 = this.getView().byId("idSpielneuStartenButton")
      oButton2.setEnabled(false)
      oButton2.setVisible(false);

      setTimeout(() => {
        this.onUpdateFrage()
      }, 200);
    },

    onHighScoresButtonPress: function (oEvent) {
      setTimeout(() => {
        let text = username + "[1]" + points
        var oRouter = new sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("HighscoreRoute", { detailPath: text });
      }, 400);
    },



  });

});
