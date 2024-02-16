import Head from "next/head";
import Header from "./Header";

export default function Layout({ children }) {

  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="Description" content=""></meta>
        <title>Célestin Ballèvre</title>
        <link rel="shortcut icon" href={prefix + '/favicon.ico'} />
        <script async src="https://eu.umami.is/script.js" data-website-id="ca8a6ca0-048f-457c-a3df-b1505e35414d"></script>
      </Head>
      <main className="mx-auto max-w-2xl p-8 md:px-0">
        <Header />
        <div className="content">{children}</div>
      </main>
    </>
  );
}
