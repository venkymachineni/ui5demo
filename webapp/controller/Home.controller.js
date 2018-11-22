sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"com/cl/ZCLPROJ/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel,formatter,Filter,FilterOperator) {
	"use strict";

	return Controller.extend("com.cl.ZCLPROJ.controller.Home", {
		formatter:formatter,
		onInit: function () {
			var data = {
				"Name": "SAP SE",
				"Street": "Dietmar-Hopp-Allee",
				"HouseNumber": "16",
				"ZIPCode": "69190",
				"City": "Walldorf",
				"Country": "Germany",
				"Url": "http://www.sap.com",
				"Twitter": "@sap",
				"Tel": "+49 6227 747474",
				"Email": "info@sap.com"
			};
		//	var oModel = new JSONModel("model/Address.json");
		//	var oModel = new JSONModel(data);
			//this.getView().setModel(oModel);

		},
		onBtnTextChange:function(){
		/*	var oModel = new JSONModel({
				newBtnText: "I am new text"
			});
			var sBtnId = this.byId("idBtn");
			sBtnId.setModel(oModel);
			sBtnId.bindProperty("text", "/newBtnText");*/
			if(!this.fragDialog){
				this.fragDialog = sap.ui.xmlfragment(this.getView().getId(),"com.cl.ZCLPROJ.view.Dialog", this);
			//	var myFragment= sap.ui.xmlfragment(this.getView().getId(), "com.venkyZDB.view.second", this);
				this.getView().addDependent(this.fragDialog);
			
				}
				this.fragDialog.open();
		},
		onCloseDialog:function(){
			this.fragDialog.close();
		},
		onItemSelected:function(oEvent){
		var bindPath =	oEvent.getSource().getBindingContext().getPath();
			var oProductDetailPanel = this.byId("productDetailsPanel");

			oProductDetailPanel.bindElement({
				path: bindPath
			});
			oProductDetailPanel.setVisible(true);
		},
		onFilterProductsTable:function(oEvent){
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
			var oFilterID = new Filter("ProductID", FilterOperator.Contains, sQuery);
			var oFilterCategory = new Filter("Category", FilterOperator.Contains, sQuery);
			
			aFilter.push(new Filter({
					filters: [oFilterID, oFilterCategory]
				}));
			}
				this.getView().byId("idProductsTable").getBinding("items").filter(aFilter);
		},
		onTabChangeEvent:function(oEvent){
			var sSelectedkey= oEvent.getSource().getSelectedKey();
			if(sSelectedkey === "FragTab"){
				if(!this.frag){
				this.frag = sap.ui.xmlfragment(this.getView().getId(),"com.cl.ZCLPROJ.view.Table", this);
			//	var myFragment= sap.ui.xmlfragment(this.getView().getId(), "com.venkyZDB.view.second", this);
				this.getView().addDependent(this.frag);
				this.getView().byId("tab2id").insertContent(this.frag);	
				}	
			}
		}
	/*	formatUpperCase: function(sName) {
       var upperCaseCat = sName.toUpperCase();
       return upperCaseCat+"from ES5";
    }*/
	});
});