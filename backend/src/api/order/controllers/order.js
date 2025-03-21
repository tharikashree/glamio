"use strict";
// @ts-ignore
const stripe = require("stripe")(process.env.STRIPE_KEY);
/**
 * order controller
 */

const { factories } = require("@strapi/strapi");
const { createCoreController } = factories;

module.exports= createCoreController("api::order.order", ({ strapi }) => ({
    async create(ctx) {
        console.log('Request Body:', ctx.request.body);
        const { products } = ctx.request.body;
        
        if (!products) {
            console.log("No products in the request body");
            ctx.response.status = 400;
            return { error: "No products in the request body" };
        }
        
        try {
            const lineItems = await Promise.all(
                products.map(async (product) => {
                    const item = await strapi
                        .service("api::product.product")
                        .findOne(product.documentId);
                    console.log('Found Product:', item); 

                    return {
                        price_data: {
                            currency: "inr",
                            product_data: {
                                name: item.title,
                            },
                            unit_amount: Math.round(item.price*100),
                        },
                        quantity: product.quantity,
                    };
                })
            );

            const session = await stripe.checkout.sessions.create({
                shipping_address_collection: { allowed_countries: ['US', 'IN'] },
                payment_method_types: ["card"],
                mode: "payment",
                success_url: process.env.CLIENT_URL + "?success=true",
                cancel_url: process.env.CLIENT_URL + "?success=false",
                line_items: lineItems,
            });
            console.log('Stripe Session Created:', session);
            const order = await strapi
                .service("api::order.order")
                .create({ data: { products, stripeId: session.id } });
            console.log('Order Created:', order); 
            return { stripeSession: session };
        } catch (error) {
            
            console.error("Error in create order:", error);
            ctx.response.status = 500;
            return { error: "Internal server error" }
        }
    },
}));