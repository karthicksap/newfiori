sap.ui.define([
    'emc/fin/ar/controller/BaseController',
    'sap/ui/core/routing/History'
], function (BaseController, History) {
    'use strict';

    return BaseController.extend("emc.fin.ar.controller.View3", {

        onInit: function () {

            this.oRouter = this.getOwnerComponent().getRouter();

            this.oRouter.getRoute("cars").attachMatched(this.routeChange, this);

        },

        routeChange: function (oEvent) {

            // MessageToast.show("Detail event triggered..!!");

            debugger;

            var sPath = "/cars/" + oEvent.getParameter("arguments").carId;

            this.getView().bindElement(sPath);

        },

        onBack: function () {

            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("detail", {

                    // value: 0

                }, true);
            }

        }



    });

});