sap.ui.define([
    'new/fin/ar/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/ui/core/Fragment'
], function (BaseController,MessageBox,MessageToast,Filter,FilterOperator,Fragment) {
    'use strict';

    return BaseController.extend("new.fin.ar.controller.View2", {

        onInit: function(){

            this.oRouter = this.getOwnerComponent().getRouter();

            this.oRouter.getRoute("detail").attachMatched(this.routeChange, this);

        },

        routeChange: function(oEvent){

            // MessageToast.show("Detail event triggered..!!");

            debugger;

            var sPath = "/" + oEvent.getParameter("arguments").value;

            this.getView().bindElement({

                path: sPath,
                parameters: { expand : 'To_Supplier,To_Orders' }

            });

        },

        onBack: function () {

            // Step 1: Get App Container Control Object
            var oAppCon = this.getView().getParent().getParent();

            // Step 2: Navigate
            oAppCon.to("myView3");

        },

        onSave: function () {

            MessageBox.confirm("Are you sure?", {

                title: "Confirm Me!",
                onClose: function (status) {

                    if (status === "OK") {

                        MessageToast.show("Record saved successfully");

                    } else {

                        MessageBox.error("Really you want to cancel it",{

                            title: "Cancel"

                        });

                    };

                }

            });

        },

        onItemPress: function (onItemPress) {

            var sPath = onItemPress.getParameter("listItem").getBindingContextPath();
            var sIndex = sPath.split("/")[sPath.split("/").length - 1];
            this.oRouter.navTo("cars", {

                carId: sIndex
            });

        },

        onValueChange: function(oSelect){

            var oComboBox = this.getView().byId("idComboBox");

            oComboBox.setSelectedKey(null);

            // Step 1: Get what was searched
            var sKey = oSelect.getParameter("selectedItem").getKey();

            // Step 2: Cretae condition (or) filter
            var oFilter = new Filter("state", FilterOperator.EQ, sKey);

            var aFilter = [oFilter];

            // Step 3: Get control object
            // var oComboBox = this.getView().byId("idComboBox");

            // Step 4: Get binding and inject our filter
            oComboBox.getBinding("items").filter(aFilter);
        },

        oCarsPopup: null,
        oSince: null,
        oInput: null,

        onPress: function(){

            // MessageToast.show("This functinality needs to be implemented...");

        if(!this.oCarsPopup){

            Fragment.load({

                name: "new.fin.ar.fragments.popup",
                controller: this,
                id: "idCars"

            }).then(this.callBack.bind(this));

        }else{

            this.oCarsPopup.open();

        };

        },

        onValueHelp: function(oControlEvent){

        //    MessageToast.show("This functinality needs to be implemented...");

        // debugger;

        this.oInput = oControlEvent.getSource();
        

        if(!this.oSince){

            Fragment.load({

                name: "new.fin.ar.fragments.popup",
                controller: this,
                id: "idSince"

            }).then(this.callBackSince.bind(this));

        }else{

        this.oSince.open();

        };
            
        },

        callBack: function(oFragment){

            // debugger;

            this.oCarsPopup = oFragment;

            this.getView().addDependent(this.oCarsPopup);

            this.oCarsPopup.bindAggregation("items", {

                path: "/cars",
                template: new sap.m.StandardListItem({

                    title: "{name}",
                    icon: "{icon}",
                    description: "{price}"

                })


            });

            this.oCarsPopup.setTitle("Cars List");

            this.oCarsPopup.open();

        },

        callBackSince: function(oFragment){

            this.oSince = oFragment;

            this.getView().addDependent(this.oSince);

            this.oSince.bindAggregation("items", {

                path: "/cars",
                template: new sap.m.StandardListItem({

                    title: "{since}"

                })

            });

            this.oSince.setMultiSelect(false);

            this.oSince.open();

        },

        onConfirm: function(oEvent){

            // Differentiate between whether event is triggred for cars or since
            debugger;
            var sId = oEvent.getParameter("id");

            if(sId.indexOf("Since") !== -1){

            var oSelecteItem = oEvent.getParameter("selectedItem");

            var sSinceWhen = oSelecteItem.getTitle();

            this.oInput.setValue(sSinceWhen);

            }
            else{

            var aSelectedItems = oEvent.getParameter("selectedItems");

            var aFilter = [];

            for (var index = 0; index < aSelectedItems.length; index++) {

                const element = aSelectedItems[index];

                const sTitle = element.getTitle();

                var oFilter = new Filter("name", "Contains", sTitle);

                aFilter.push(oFilter);
                
            };

            var oFilterFinal = new Filter({

                filters: aFilter,
                and: false

            });

            this.getView().byId("idTable").getBinding("items").filter(oFilterFinal);

            };

        }

    });

});