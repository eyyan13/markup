import React from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import matter from "gray-matter";
import Image from "next/image";
import path from "path";
import fs from "fs";

interface BlogData {
  title: string;
  description: string;
  author: string;
  date: string;
  slug: string;
  image: string;
}

// Server-side function to fetch blogs
const fetchBlogs = (): BlogData[] => {
  const contentDir = path.join(process.cwd(), "src/content"); // Absolute path to the content folder
  const dirContent = fs.readdirSync(contentDir, "utf-8");

  return dirContent.map((file) => {
    const fileContent = fs.readFileSync(path.join(contentDir, file), "utf-8");
    const { data } = matter(fileContent); // Extract frontmatter metadata
    return data as BlogData;
  });
};

const Blog = () => {
  const blogs = fetchBlogs();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <div key={index} className="rounded-lg shadow-md overflow-hidden dark:border-2">
            <Image
              height={300}
              width={300}
              priority
              src={blog.image}
              alt={blog.title}
              className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
              <p className="mb-4">{blog.description}</p>
              <div className="text-sm mb-4">
                <span>By {blog.author}</span> |{" "}
                <span>
                  {new Date(blog.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <Link href={`/blogpost/${blog.slug}`} className={buttonVariants({ variant: "outline" })}>
                Click here
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
