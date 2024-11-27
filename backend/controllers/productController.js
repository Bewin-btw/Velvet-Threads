import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";


const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                try {
                    let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                    return result.secure_url
                } catch (error) {
                    console.log(error)
                    res.status(500).json({ success: false, msg: error.message })
                }
            })
        )

        let parsedSizes = [];
        try {
            parsedSizes = JSON.parse(sizes);
        } catch (err) {
            return res.status(400).json({ success: false, msg: "Invalid sizes format" });
        }

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true",
            sizes: parsedSizes,
            image: imagesUrl,
            date: Date.now()
        }
        const product = new productModel(productData)
        await product.save()

        res.status(200).json({
            success: true,
            msg: "product created succesfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, msg: error.message })
    }
}

const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, msg: error.message })
    }
}

const removeProduct = async (req, res) => {

}

const singleProduct = async (req, res) => {

}

export { addProduct, listProducts, removeProduct, singleProduct }