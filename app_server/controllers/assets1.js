/**
 * Created by vghiur on 7/4/2017.
 */
/*global */
'use strict';

//---------------- BEGIN MODULE SCOPE VARIABLES --------------
var
    renderHomepage,
    homelist;
//----------------- END MODULE SCOPE VARIABLES ---------------

//---------------- BEGIN UTILITY METHODS --------------
renderHomepage = function (req, res) {
    var responseBody = [];

    res.render('asset-list', {
        title: 'LaRRS - Lab Reservation and Reclamation System',
        pageHeader: {
            title: 'LaRRS',
            strapline: 'List of lab assets in all HWE Labs'
        },
        assets: responseBody
    })
};
//----------------  END UTILITY METHODS  --------------

//---------------- BEGIN PUBLIC METHODS --------------
homelist = function (req, res) {
    renderHomepage(req, res);
};

module.exports = {
    homelist : homelist
};
//----------------  END PUBLIC METHODS  --------------