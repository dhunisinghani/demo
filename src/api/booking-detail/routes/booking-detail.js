'use strict';

/**
 * booking-detail router
 

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::booking-detail.booking-detail');
*/

module.exports = {
    routes: [
        {
            method: "POST",
            path: "/bookings",
            handler: "booking-detail.book",
            config: {
                auth: false
            }
        },
        {
            method: "GET",
            path:"/bookings/user/:id",
            handler:"booking-detail.getBookingByUserID",
            config: {
                auth: false,
            }
        },
        {
            method: "GET",
            path:"/bookings/property/:id",
            handler:"booking-detail.getBookingByPropertyID",
            config: {
                auth: false,
            }
        }
    ]
}