sap.ui.define([
    'sap/ui/core/format/NumberFormat'
], function (NumberFormat) {

    return {

        getStatusText: function (status) {


            switch (status) {
                case 'Available':
                    return "Success";
                case 'Not available':
                    return "Warning";
                case 'Discontinued':
                    return "Error";

            }

        },

        getAmount: function (amt,currency) {

            var oCurrencyFormat = NumberFormat.getCurrencyInstance({
                currencyCode: false
            });

            return oCurrencyFormat.format(amt, currency);

        }

    };

});