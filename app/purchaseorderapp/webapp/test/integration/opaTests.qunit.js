sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'anu/po/purchaseorderapp/test/integration/FirstJourney',
		'anu/po/purchaseorderapp/test/integration/pages/POsList',
		'anu/po/purchaseorderapp/test/integration/pages/POsObjectPage',
		'anu/po/purchaseorderapp/test/integration/pages/POItemsObjectPage'
    ],
    function(JourneyRunner, opaJourney, POsList, POsObjectPage, POItemsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('anu/po/purchaseorderapp') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePOsList: POsList,
					onThePOsObjectPage: POsObjectPage,
					onThePOItemsObjectPage: POItemsObjectPage
                }
            },
            opaJourney.run
        );
    }
);