import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Head from "next/head";
import BackButton from "../../components/BackButton";

export default function BlogTemplate(props) {
  
  const createdAt = new Date(props.frontmatter.createdAt) 
  const updatedAt = new Date(props.frontmatter.updatedAt)

  return (
    <>
      <Head>
        <title>{props.frontmatter.title + " | Célestin Ballèvre"}</title>
      </Head>
      <BackButton to="/posts" label="Retour aux articles" />
      <article className="mb-8">
        <h1 className="text-2xl font-bold mb-6">{props.frontmatter.title}</h1>
        <div className="mb-4 p-4 bg-slate-200">
          <p className="mb-1">📆 Publication initiale : { createdAt.toLocaleDateString('fr-FR') }</p>
          { !!props.frontmatter.updatedAt && <p>✍ Dernière mise à jour : { updatedAt.toLocaleDateString('fr-FR') }</p> }
        </div>
        <div
          className="post-body"
          dangerouslySetInnerHTML={{ __html: marked.parse(props.content) }}
        />
      </article>
    </>
   
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
