import BlogOverview from "@/components/blog-overview"


async function fetchListOfBlogs() {
  try {
    const apiResponse = await fetch('http://localhost:3000/api/get-blogs', {
      method: "GET",
      cache: "no-store"
    })

    const result = await apiResponse.json()

    return result.data

  } catch (error) {
    throw new Error(error)
  }
}

async function Blogs() {

  const blogLists = await fetchListOfBlogs()

  // console.log(blogLists);
  

  return (
    <BlogOverview blogLists={blogLists} />
  )
}


export default Blogs