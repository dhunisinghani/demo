'use strict';

/**
 * Property Details router
 */

// const { createCoreRouter } = require('@strapi/strapi').factories;

// module.exports = createCoreRouter('api::property.property');

module.exports = {
    routes: [
        {
            method: "POST",
            path:"/properties",
            handler:"property.create",
            config:{
                auth: false
            }
        },
        {
            method: "GET",
            path:"/properties",
            handler:"property.find",
            config:{
                auth: false
            }
        },
        {
            method: "GET",
            path:"/properties/:id",
            handler:"property.findOne",
            config:{
                auth: false
            }
        },
        {
            method: "GET",
            path:"/properties/owner/:id",
            handler:"property.getPropertyListUser",
            config:{
                auth: false
            }
        },
    ]
}
