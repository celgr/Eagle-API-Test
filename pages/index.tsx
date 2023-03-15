import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

export interface Post {
  id: string
  url: string
  name: string
  tags: string
  ext: string
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:41595/api/item/list?limit=50');
  const result = await res.json();
  const posts = await result.data;

  return {
    props: {
      posts
    }
  }
}

const Home: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Eagle API Test</title>
        <meta name="description" content="Eagle API Test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id='app'>
        {
          posts.map((post) => {
            return (
              <div key={post.id}>
                <a href={post.url} target='_blank'>
                  {
                    post.ext != 'mp4'
                      ? <img src={`http://localhost:3000/api/posts/${post.id}`}></img>
                      : <video controls src={`http://localhost:3000/api/posts/${post.id}`} style={{ width: '100%' }}></video>
                  }
                </a>
                <p>{post.id}</p>
                <p>{post.name}</p>
                <p>{post.tags}</p>
                <p>{post.ext}</p>
              </div>
            );
          })
        }
      </div>
    </>
  )
}

export default Home
