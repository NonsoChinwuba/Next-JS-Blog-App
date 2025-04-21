import connectToDB from "@/app/database";
import Blog from "@/app/models/blogModel";
import Joi from "joi";
import { NextResponse } from "next/server";


//CREATING A SCHEMA AND VALIDATING USING THE JOI PACKAGE
const AddNewBlog = Joi.object({
  title : Joi.string().required(),
  description : Joi.string().required()
})

export async function POST(req) {
  try {
    //CONNECT TO DB
    await connectToDB()

    //GRAB USER DATA
    const extractBlogData = await req.json();
    const { title, description } = extractBlogData;

    const { error } = AddNewBlog.validate({
      title, description
    })

    if(error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message
      })
    }

    //SAVING TO DB
    const savedBlogItem = await Blog.create(extractBlogData)

    if(savedBlogItem) {
      return NextResponse.json({
        success: true,
        data: savedBlogItem,
        message: "Blog added successfully"
      })
    } else {
      return NextResponse.json({
        success : false,
        message : "Something went wrong!"
      })
    }
    
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success : false,
      message : "Something went wrong!"
    })
    
  }
}