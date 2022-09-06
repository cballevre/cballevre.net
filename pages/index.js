import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function Home({ posts }) {
  return (
    <>
      <div class="mx-auto">
        <p class="font-bold mb-4 mt-5">Hey 🤘</p>
        <p class="mb-3">Je suis un développeur fullstack spécialisé en JavaScript et ses principaux frameworks Vue, React. En 4 ans d'expérience, j'ai aussi travaillé avec Python, Laravel et même Flutter.</p>
        <p class="mb-3">Avant de plonger dans la technique, j'étudiais l'expérience utilisateur et le design. Depuis, je cherche à créer un pont entre ces deux mondes.</p>
        <p class="mb-8">Je suis particulièrement sensible au sujet de l'accessibilité, de la cartographie, et du numérique responsable pour n'en faire qu'une courte liste. </p>
      </div>
      <h2 class="mb-4 font-bold">Dès fois j'écris</h2>
      <ul class="mb-8">
        {posts.map((post) => {
          return (
            <li>
              <a href={post.slug}>{post.title}</a>
            </li>
          );
        })}
      </ul>
      <h2 class="mb-4 font-bold">Autre part</h2>
      <ul class="mb-8">
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
