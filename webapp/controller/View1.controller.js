sap.ui.define([
    'new/fin/ar/controller/BaseController',
    'new/fin/ar/util/formatter',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], function (BaseController,Format,Filter,FilterOperator) {
    'use strict';

    return BaseController.extend("new.fin.ar.controller.View1", {

        onInit: function(){

            this.oList = this.getView().byId("idList");

            this.oRouter = this.getOwnerComponent().getRouter();



        },

        onNext: function (sPlayerId) {

            // Step 1: Get App Container Control Object
            var oAppCon = this.getView().getParent().getParent();

            // Step 2: Navigate
            // oAppCon.to("myView2");

            this.oRouter.navTo("detail",{

                "value": sPlayerId
            });

        },

        formatter: Format,

        onSearch: function(oSearch){

            // Step 1: What was searched
            var whatWassearched = oSearch.getParameter("query");
            if(!whatWassearched){

                var whatWassearched = oSearch.getParameter("newValue");

            };

            // Step 2: Create condition or Filetr object
            var oFilter   = new Filter("CATEGORY", FilterOperator.Contains, whatWassearched);
            // var oFilter2  = new Filter("team", FilterOperator.Contains, whatWassearched);

            // Step 3: Get list object
            var aFilter = [oFilter];

            var oNewFilter = new Filter({

                filters: aFilter,
                and: false

            });

            var oList = this.getView().byId("idList");

            // Step 4: Get the list binding and inject our filter into the same
            oList.getBinding("items").filter(oNewFilter);

        },

        action: function(){

            alert("Ordered !!");
        },

        // onDelete: function(oDelete){

        //     var oListItem = oDelete.getParameter("listItem");

        //     var oList = oDelete.getSource();

        //     oList.removeItem(oListItem);

        // },

        getSelectedItems: function(){

            var aSelectedItems = this.oList.getSelectedItems();

            return aSelectedItems;

        },

        onDelete: function(){

            var aSelectedItems = this.getSelectedItems();

            for (var i = 0; i < aSelectedItems.length; i++) {
                
                this.oList.removeItem(aSelectedItems[i]);
                
            };

        },

        // onNav: function(){


        //     var aSelectedItems = this.getSelectedItems();

        //     var aSelect = [];

        //     for (var i = 0; i < aSelectedItems.length; i++) {
 
        //         var oData = this.getView().getModel().getProperty(aSelectedItems[i].getBindingContextPath());

        //         aSelect.push(oData);
                
        //     };

        //     this.getView().getModel().setProperty("/selectedItems", aSelect);

        //     // this.onNext();

        // },

        onChange: function(oChange){

            var sPath = oChange.getParameter("listItem").getBindingContextPath();

            // var oView2 = this.getView().getParent().getParent().getDetailPages()[1];

            // oView2.bindElement(sPath);

            var index = sPath.split("/")[sPath.split("/").length -1];

            this.onNext(index);

        },

        onAdd: function(){

            debugger;
            this.oRouter.navTo("addProduct");

        }

    });

});