'use strict';

/**
 * property controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::property.property', ({strapi}) =>({
    async create (ctx) {
       try {
        let resp = await strapi.service("api::property.property").create({
            data:{
                ...ctx.request.body,
           },
           files:{
               ...ctx.request.files
           }
       })
       ctx.body= {
        success: true,
        message:"Property added Successfully"
       }
       } catch (error) {
        console.error(error);
        console.dir(error, {depth:5})
        ctx.body={
            success: false,
            message:"Failed to add Property"
        }
       }
       
       
    }
}));
