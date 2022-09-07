import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function Home({ posts, totalPosts }) {
  return (
    <>
      <div>
        <p className="font-bold mb-4">Hey 🤘</p>
        <p className="mb-3">Je suis un développeur fullstack spécialisé en JavaScript et ses principaux frameworks Vue, React. En 4 ans d'expérience, j'ai aussi travaillé avec Python, Laravel et même Flutter.</p>
        <p className="mb-3">Avant de plonger dans la technique, j'étudiais l'expérience utilisateur et le design. Depuis, je cherche à créer un pont entre ces deux mondes.</p>
        <p className="mb-8">Je suis particulièrement sensible au sujet de l'accessibilité, de la cartographie, et du numérique responsable pour n'en faire qu'une courte liste. </p>
      </div>
      <div className="mb-4 inline-flex items-baseline">
      <h2 className="font-bold">Dès fois j'écris</h2>
      { totalPosts > 10 && <a className="ml-2" href="/posts">
        Tout afficher ({totalPosts})
      </a>}
      </div>
      { totalPosts == 0 && <p>Du moins, ça devrait arriver sous peu...</p> }
      <ul className="mb-8">
        {posts.map((post) => {
          const createdAt = new Date(post.createdAt) 
          return (
            <li className="flex items-baseline" key={post.slug}>
              <a href={post.slug}>{post.title} </a>
              <p className="ml-2 text-sm">{createdAt.toLocaleDateString('fr-FR')}</p>
            </li>
          );
        })}
      </ul>
      <h2 className="mb-4 font-bold">Autre part</h2>
      <ul className="mb-8">
        <li>Github <a href="https://github.com/cballevre">@cballevre</a></li>
        <li>Linkedin <a href="https://www.linkedin.com/in/cballevre/">@cballevre</a></li>
        <li>Email <a href="mailto:celestin.ballevre@protonmail.com">envoie-moi un email</a></li>
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
    .filter((post) => post.draft === false);

  const totalPosts = posts.length;

  return {
    props: {
      posts: posts.slice(posts.length-10, posts.length).reverse(),
      totalPosts
    },
  };
}
