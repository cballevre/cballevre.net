import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export default function BlogTemplate(props) {
  // Render data from `getStaticProps`
  return (
    <article>
      <h1>{props.frontmatter.title}</h1>
      <div
        className="post-body p-5 m-auto"
        dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
      ></div>
    </article>
  );
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}

export async function getStaticPaths() {
  //  Get files from the posts dir
  const files = fs.readdirSync(path.join("posts"));

  // Get slug and frontmatter from posts
  const temppaths = files.map((filename) => {
    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    if (frontmatter.draft === false) {
      return {
        params: {
          slug: filename.replace(".md", ""),
        },
      };
    } else {
      return null;
    }
  });
  //   remove null in tempPosts
  const paths = temppaths.filter((path) => {
    return path && path;
  });

  return {
    paths,
    fallback: false,
  };
}
