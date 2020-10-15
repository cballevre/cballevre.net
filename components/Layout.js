import Head from 'next/head'
import Header from './Header'

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="Description" content='Hello'></meta>
        <title>Hello</title>
      </Head>
      <main className='mx-auto container'>
        <Header />
        <div className="content">{children}</div>
      </main>
    </React.Fragment>
  );
}