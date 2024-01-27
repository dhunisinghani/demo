'use strict';

/**
 * booking-detail controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::booking-detail.booking-detail', ({ strapi }) => ({
    
    async book(ctx) {
        try {

            const data = ctx.request.body;
            const user = await strapi.service('plugin::users-permissions.user').fetch(data.userID);
            if (user === null) {
                throw new Error("No Such User");
            }


            const property = await strapi.service('api::property.property').findOne(data.propertyID);
            if (property === null) {
                throw new Error("No such Property")
            }

            let { workSpace } = property;
            if ((workSpace.available - data.totalSeats) >= 0) {
                let newWorkSpace = {
                    available: workSpace.available - data.totalSeats,
                    total: workSpace.total,
                }

                let updatedProperty = await strapi.service('api::property.property').update(data.propertyID,{data:{ workSpace: newWorkSpace} });
            } else {
                throw new Error(`${data.totalSeats} seats Not available`);
            }

            let result = await strapi.service('api::booking-detail.booking-detail').create({ data });
            ctx.body = {
                success: true,
                data: {
                    ...result
                }
            };

        } catch (error) {
            ctx.send({
                success: false,
                error: error.message
            }, 500)
        }
    },

    async getBookingByUserID(ctx) {
        try {
            let result = await strapi.service('api::booking-detail.booking-detail').find({filters:{userID: ctx.request.params.id}});
            ctx.body = {
                success: true,
                data: result
            };
        } catch (error) {
            ctx.send({
                success: false,
                error: error.message
            },500)
        }
    },

    async getBookingByPropertyID(ctx) {
        try {
            let result = await strapi.service('api::booking-detail.booking-detail').find({filters:{propertyID: ctx.request.params.id}});
            ctx.body = {
                success: true,
                data: result
            };
        } catch (error) {
            ctx.send({
                success: false,
                error: error.message
            },500)
        }
    },

}));
