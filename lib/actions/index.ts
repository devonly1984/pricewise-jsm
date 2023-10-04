"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import Product from "../schemas/Product";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { User } from "@/types";
import { generateEmailBody, sendEmail } from "../nodemailer";

export const scrapeAndStoreProduct = async (productUrl: string) => {
  if (!productUrl) return;
  try {
    connectToDB();
    const scrapedProduct = await scrapeAmazonProduct(productUrl);
    if (!scrapedProduct) return;
    let product = scrapedProduct;
    const existProduct = await Product.findOne({ url: scrapedProduct.url });
    if (existProduct) {
      const updatedPriceHistory: any = [
        ...existProduct.priceHistory,
        {
          price: scrapedProduct.currentPrice,
        },
      ];
      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,

        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }
    const newProduct = await Product.findOneAndUpdate({
      url: scrapedProduct.url},
      product,
      {upsert: true, new:true}
    );
    revalidatePath(`/products/${newProduct._id}`)
  } catch (error: any) {
    throw new Error(`Unable to create/update product ${error.message}`);
  }
};
export const getProductById = async (productId:string)=>{
    try {
      connectToDB();
      const product = await Product.findOne({_id: productId});
      if (!product) return null;
      return product;
    } catch (error:any) {
      throw new Error(`Unable to fetch Product Details ${error.message}`)
    }
}
export const getAllProducts = async()=>{
  try {
    connectToDB();
    const products = await Product.find();
    return products;
  } catch (error) {
    console.log(error)
  }
}
export const getSimilarProducts = async(productId:string) => {
try {
  connectToDB();
  const currentProduct = await Product.findById(productId);
  if (!currentProduct) return null;
  const similarProducts = await Product.find({
    _id: {$ne: productId}
  }).limit(3);
  return similarProducts;
} catch (error) {
  console.log(error);
}
}
export const addEmailToProduct = async(productId:string, userEmail:string)=>{
  try {
    const product =await Product.findById(productId);
    if (!product) return;
    const userExists = product.users.some((user:User)=>user.email === userEmail);
    if (!userExists)  {product.users.push({email: userEmail})
    await product.save()
  const emailContent = await generateEmailBody(product,"WELCOME")
  await sendEmail(emailContent,[userEmail]);
    }
  } catch (error) {
    console.log(error);
  }
}