sap.ui.define([
    'sap/ui/core/UIComponent'
], function (UIComponent) {
    'use strict';

    return UIComponent.extend("new.fin.ar.Component", {

        metadata: {

            manifest: "json"

        },

        init: function () {

            UIComponent.prototype.init.apply(this);

            var oRouter = this.getRouter();

            oRouter.initialize();


        },

        // createContent: function () {

        //     var oView = new sap.ui.view({

        //         viewName: "new.fin.ar.view.App",
        //         type    : "XML",
        //         id      : "myView"

        //     });

        //     // Step 1: Get app container control object
        //     var oAppCont = oView.byId("idAppCon");

        //     //  Step 2: Create View Objects
        //     var oView1 = new sap.ui.view({

        //         viewName: "new.fin.ar.view.View1",
        //         type    : "XML",
        //         id      : "myView1"

        //     });
        //     var oView2 = new sap.ui.view({

        //         viewName: "new.fin.ar.view.View2",
        //         type    : "XML",
        //         id      : "myView2"

        //     });
        //     var oView3 = new sap.ui.view({

        //         viewName: "new.fin.ar.view.View3",
        //         type    : "XML",
        //         id      : "myView3"

        //     });
        //     var oView4 = new sap.ui.view({

        //         viewName: "new.fin.ar.view.View4",
        //         type    : "XML",
        //         id      : "myView4"

        //     });
        //     var oView5 = new sap.ui.view({

        //         viewName: "new.fin.ar.view.View5",
        //         type    : "XML",
        //         id      : "myView5"

        //     });
        //     //  Step 3: Add Pages
        //     oAppCont.addMasterPage(oView1).addDetailPage(oView3).addDetailPage(oView2).addDetailPage(oView4).addDetailPage(oView5);

        //     return oView;

        // },

        destroy: function () {


        }

    });

});