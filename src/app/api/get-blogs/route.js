import connectToDB from "@/app/database";
import Blog from "@/app/models/blogModel";
import { NextResponse } from "next/server"




export async function GET() {


  try {
    await connectToDB()
    const extractAllBlogsFromDatabase = await Blog.find({})

    if(extractAllBlogsFromDatabase) {
      return NextResponse.json({
        success: true,
        data: extractAllBlogsFromDatabase
      })
    } else {
      
      return NextResponse.json({
        success: false,
        message: "Something went wrong"
      })
    }
    
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong"
    })
    
  }
}