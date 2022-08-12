import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function Home({ posts }) {
  return (
    <>
      <div class="mx-auto ">
        <p class="font-medium mb-4">Hey 🤘</p>
        <p class="mb5"></p>
      </div>

      <h2 class="mb-4">Dès fois j'écris</h2>
      <ul class="mb-4">
        {posts.map((post) => {
          return (
            <li>
              <a href={post.slug}>{post.title}</a>
            </li>
          );
        })}
      </ul>

      <h2>Autre part</h2>
      <ul class="mb-4">
        <li>Github @cballevre</li>
        <li>Linkedin @cballevre</li>
        <li>Email send me an email</li>
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files
    .map((filename) => {
      const markdownWithMeta = fs.readFileSync(
        path.join("posts", filename),
        "utf-8"
      );

      const { data: frontmatter } = matter(markdownWithMeta);

      return {
        slug: "posts/" + filename.replace(".md", ""),
        ...frontmatter,
      };
    })
    .filter((post) => post.draft === false)
    .slice(0, 10);

  return {
    props: {
      posts,
    },
  };
}
