import Head from "next/head";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="Description" content=""></meta>
        <title>Célestin Ballèvre</title>
      </Head>
      <main className="mx-auto max-w-2xl">
        <Header />
        <div className="content">{children}</div>
      </main>
    </>
  );
}