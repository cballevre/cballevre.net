import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import BackButton from "../../components/BackButton";

export default function Blog({ posts, totalPosts}) {
  return (
    <>
      <Head>
        <title>Articles | Célestin Ballèvre</title>
      </Head>
      <div>
        <BackButton to="/" label="Retour à l'accueil" />
        <h1 className="text-2xl font-bold mb-8">Articles ({totalPosts})</h1>
        <h2 class="font-bold mb-4">2022</h2>
        {posts.map((post) => {
          const createdAt = new Date(post.createdAt) 
          return (
            <li className="flex items-baseline" key={post.slug}>
              <a href={post.slug}>{post.title} </a>
              <p className="ml-2 text-sm">{createdAt.toLocaleDateString('fr-FR')}</p>
            </li>
          );
        })}
      </div>
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
    .filter((post) => post.draft === false);

  const totalPosts = posts.length;

  return {
    props: {
      posts: posts.slice(posts.length-10, posts.length).reverse(),
      totalPosts
    },
  };
}
