import slugify from "slugify";
import Product from "../models/product.js";
import fs from "fs";
export const create = async (req, res) => {
    try {
        console.log(req.fields);
        console.log(req.files);
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // validations
        switch (true) {
            case !name.trim():
                return res.json({ error: "Name is Required" }); 
            case !description.trim():
                return res.json({ error: "Description is Required" });
            case !price.trim():
                return res.json({ error: "Price is Required" });
            case !category.trim():
                return res.json({ error: "Category is Required" });
            case !quantity.trim():
                return res.json({ error: "Quantity is Required" });
            case !shipping.trim():
                return res.json({ error: "Shipping is Required" });
            case photo && photo.size > 1000000:
                return res.json({ error: "Image should be less than 1mb in size" });
        }

        //create a product
        const product = new Product({...req.fields,slug:slugify(name)});
        

        if(photo){
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.json(product);

    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err.message });
    }
};



export const list = async (req,res)=>{
    try{
        const products = await Product.find({}).select("-photo").populate("category").limit(12).sort({createdAt:-1});
        res.json({products})


    }catch(err){
        console.log(err);

    }

}

export const read = async (req,res) => {
    try{
        const product = await Product.findOne({slug:req.params.slug}).select("-photo").populate("category");
        res.json(product);
    }catch(err){
        console.log(err)

    }

}

export const photo = async  (req,res)=>{
    try{
        const product = await Product.findById(req.params.productId).select("photo");
        if(product.photo.data){
            res.set("Content-Type",product.photo.contentType);
            return res.send(product.photo.data);
        }

    }catch(err){
        console.log(err);

    }
};


export const remove = async (req,res) =>{
    try{

        const product = await Product.findByIdAndDelete(req.params.productId).select("-photo");
        res.json(product);

    }catch(err){
        console.log(err);
    }
    
}


export const update = async (req, res) => {
    try {
        console.log(req.fields);
        console.log(req.files);
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // validations
        switch (true) {
            case !name.trim():
                return res.json({ error: "Name is Required" }); 
            case !description.trim():
                return res.json({ error: "Description is Required" });
            case !price.trim():
                return res.json({ error: "Price is Required" });
            case !category.trim():
                return res.json({ error: "Category is Required" });
            case !quantity.trim():
                return res.json({ error: "Quantity is Required" });
            case !shipping.trim():
                return res.json({ error: "Shipping is Required" });
            case photo && photo.size > 1000000:
                return res.json({ error: "Image should be less than 1mb in size" });
        }

        //update a product
        const product = await Product.findByIdAndUpdate(req.params.productId,{
            ...req.fields,slug:slugify(name),
        },{new:true});
        

        if(photo){
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.json(product);

    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err.message });
    }
};
