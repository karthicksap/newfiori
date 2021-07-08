sap.ui.define([
    'new/fin/ar/controller/BaseController',
    'new/fin/ar/util/formatter',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageToast',
    'sap/m/MessageBox',
    'sap/ui/core/Fragment'
], function (BaseController, Format, Filter, FilterOperator, JSONModel, MessageToast, MessageBox, Fragment) {
    'use strict';

    return BaseController.extend("new.fin.ar.controller.View1", {

        onInit: function () {

            this.oList = this.getView().byId("idList");

            this.oRouter = this.getOwnerComponent().getRouter();

            this.oLocalModel = new JSONModel();
            this.oLocalModel.setData({

                "ProductData": {
                    "PRODUCT_ID": "",
                    "TYPE_CODE": "PR",
                    "CATEGORY": "Files & Binders",
                    "NAME": "",
                    "DESCRIPTION": "",
                    "SUPPLIER_ID": "0100000011",
                    "SUPPLIER_NAME": "Depot-4All",
                    "TAX_TARIF_CODE": "1 ",
                    "MEASURE_UNIT": "EA",
                    "PRICE": "",
                    "CURRENCY_CODE": "USD",
                    "DIM_UNIT": "CM"
                }
            });

            this.getView().setModel(this.oLocalModel, "data");

        },

        onSave: function () {

            // Step 1: Get OData model object
            var oDataModel = this.getView().getModel();
            // Step 2: Prepare Payload
            var payLoad = this.oLocalModel.getProperty("/ProductData");
            // Step 3: send the POST call
            oDataModel.create("/ProductSet", payLoad, {

                success: function () {

                    MessageToast.show("Product has been created successfully!");

                },

                error: function (oErr) {

                    debugger;
                    MessageBox.error(JSON.parse(oErr.responseText).error.innererror.errordetails[0].message);

                }

            });

        },

        onDelete: function () {

            debugger;
            var oDataModel = this.getView().getModel();

            var productId = this.oLocalModel.getProperty("/ProductData/PRODUCT_ID");

            oDataModel.remove("/ProductSet('" + productId + "')", {

                success: function () {

                   MessageToast.show("Product has been deleted now");

                },

                error: function (oError) {

                    MessageBox.error(JSON.parse(oError.responseText).error.innererror.errordetails[0].message);

                }

            });

        },

        oSupp: null,

        onHelp: function (oControlEvent) {

            this.oSuppInp = oControlEvent.getSource();

            if (!this.oSupp) {

                Fragment.load({

                    name: "new.fin.ar.fragments.popup",
                    controller: this,
                    id: "idSupp"

                }).then(this.callBack.bind(this));

            } else {

                this.oSupp.open();

            };

        },

        callBack: function (oFragment) {

            // debugger;

            this.oSupp = oFragment;

            this.getView().addDependent(this.oSupp);

            this.oSupp.setMultiSelect(false);

            this.oSupp.bindAggregation("items", {

                path: "/SupplierSet",
                template: new sap.m.StandardListItem({

                    title: "{BP_ID}",
                    icon: "sap-icon://home",
                    description: "{COMPANY_NAME}"

                })


            });

            this.oSupp.setTitle("Supplier List");

            this.oSupp.open();

        },
        onConfirm: function (oEvent) {

            // Differentiate between whether event is triggred for cars or since
            debugger;
            var sId = oEvent.getParameter("id");

            if (sId.indexOf("Supp") !== -1) {

                var oSelecteItem = oEvent.getParameter("selectedItem");

                var sSupplier = oSelecteItem.getTitle();

                this.oSuppInp.setValue(sSupplier);

            }
            else {

                // var aSelectedItems = oEvent.getParameter("selectedItems");

                // var aFilter = [];

                // for (var index = 0; index < aSelectedItems.length; index++) {

                //     const element = aSelectedItems[index];

                //     const sTitle = element.getTitle();

                //     var oFilter = new Filter("name", "Contains", sTitle);

                //     aFilter.push(oFilter);

                // };

                // var oFilterFinal = new Filter({

                //     filters: aFilter,
                //     and: false

                // });

                // this.getView().byId("idTable").getBinding("items").filter(oFilterFinal);

            };

        },

        onChange: function (oControlEvent) {

            debugger;

            var productId = oControlEvent.getParameter("value");

            var oDataModel = this.getView().getModel();

            var that = this;

            oDataModel.read("/ProductSet('" + productId + "')", {

                success: function (data) {

                    that.oLocalModel.setProperty("/ProductData", data)

                },

                error: function (oError) {

                    MessageBox.error(JSON.parse(oError.responseText).error.innererror.errordetails[0].message);

                }

            });

        },

        onLoad: function(){

            debugger;
            var oDataModel = this.getView().getModel();

            var that = this;

            oDataModel.callFunction("/GetMostExpensiveProduct",{

                urlParameters: {

                    "I_CATEGORY": 'Trays'
                },

                success: function(data){

                    that.oLocalModel.setProperty("/ProductData", data);

                },

                error: function(oError){

                    MessageBox.error("Dude ther is an error!");

                }

            });

        }

    });

});