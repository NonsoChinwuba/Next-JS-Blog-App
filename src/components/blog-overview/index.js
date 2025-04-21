"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AddNewBlog from "../add-new-blog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const initialBlogFormData = {
  title: "",
  description: "",
};

function BlogOverview({ blogLists }) {
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData);

  const router = useRouter();

  useEffect(() => {
    router.refresh()
  }, [])

  async function handleSaveBlogData() {
    try {
      setLoading(true);
      const apiResponse = await fetch("/api/add-blog", {
        method: "POST",
        body: JSON.stringify(blogFormData),
      });

      const result = await apiResponse.json();

      if (result.success) {
        setBlogFormData(blogFormData);
        setOpenBlogDialog(false);
        setLoading(false);
        router.refresh()
      }

      console.log(result);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setBlogFormData(initialBlogFormData);
    }
  }

  return (
    <div className="flex flex-col gap-10 min-h-screen bg-gradient-to-r from-purple-500 to-blue-600 p-6">
      <AddNewBlog
        openBlogDialog={openBlogDialog}
        setOpenBlogDialog={setOpenBlogDialog}
        loading={loading}
        setLoading={setLoading}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        handleSaveBlogData={handleSaveBlogData}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {blogLists && blogLists.length > 0
          ? blogLists.map((blogItem) => (
              <Card key={blogItem._id} className="p-5">
                <CardContent>
                  <CardTitle className="mb-5">{blogItem.title}</CardTitle>
                  <CardDescription> {blogItem.description} </CardDescription>
                  <div className="mt-5 flex gap-5  items-center">
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          : null}
      </div>
    </div>
  );
}

export default BlogOverview;
