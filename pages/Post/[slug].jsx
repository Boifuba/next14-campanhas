import mongoose from "mongoose";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import BlogPost from "../../src/utilidades/Schema";
import Image from "next/image";
import dotenv from "dotenv";
import parse from "html-react-parser";
import Share from "../../src/components/Share";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import TableOfContents from "../../src/components/TableOfContents";
import PostsGroupedByMonth from "../../src/components/indiceData";
import "./slug.css";
import DisqusComments from "@/components/Disqus";

dotenv.config();

export async function getStaticPaths() {
  await mongoose.connect(process.env.MONGODB_URI, {});
  // Busque todos os slugs do MongoDB
  const posts = await BlogPost.find({}, "slug");
  const slugsFromDb = posts.map((post) => post.slug);

  // Filtrar quaisquer slugs inválidos
  const validSlugs = slugsFromDb.filter((slug) => slug);

  return {
    paths: validSlugs.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  await mongoose.connect(process.env.MONGODB_URI, {});

  // Busque o post específico do MongoDB com base no slug da URL
  const post = await BlogPost.findOne({ slug: params.slug });

  // Busque os 4 posts mais recentes
  const recentPosts = await BlogPost.find().sort({ date: -1 }).limit(3);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const item = post.toObject();

  item.date = item.date.toISOString();

  const { _id, __v, ...itemProps } = item;

  return {
    props: {
      item: itemProps,
      recentPosts: JSON.parse(JSON.stringify(recentPosts)), // Converta os documentos Mongoose em objetos JavaScript simples
    },
  };
}

const PostPage = ({ item, recentPosts }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const currentUrl = `https://campanhasdoboi.com.br/rpg${router.asPath}`;
  if (!item) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <Head>
        <title>{item.title}</title>
        <link rel="icon" href="/rpg/boi.svg" />
        <meta name="description" content={item.smalltext} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index,follow" />
        <meta name="author" content="Boifubá" />
        <meta property="og:title" content={item.title} />
        <meta property="og:description" content={item.smalltext} />
        <meta property="og:url" content={currentUrl} />
        <meta
          property="og:image"
          content={"https://campanhasdoboi.com.br/rpg/" + item.img}
        />
        <meta name="theme-color" content="#ea4f4c"></meta>
        <meta name="twitter:title" content={item.title} />
        <meta name="twitter:description" content={item.smalltext} />
        <meta name="twitter:card" content="summary_large_image" />{" "}
        <meta
          name="twitter:image"
          content={"https://campanhasdoboi.com.br/rpg/" + item.img}
        />
        <meta name="description" content={item.smalltext} />
      </Head>
      ;
      <div className="entire">
        <div className="post-image">
          <Image
            src={"/rpg/" + item.img}
            alt={item.title}
            width={1000}
            height={350}
          />{" "}
        </div>
        <div className="divisor">
          <div className="post-container">
            <div className="author-box">
              <div className="author-image">
                <Image
                  src={"/rpg/" + "boi.svg"}
                  alt={item.author}
                  width={80}
                  height={80}
                />
              </div>
              <div> por </div>
              <div className="author-name">{item.author}</div>
              <div> em </div>
              <div className="author-date">
                {format(new Date(item.date), "dd 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </div>{" "}
            </div>
            <h1 className="post-title">{item.title}</h1>
            <p className="post-smalltext">{item.smalltext}</p>
            <div className="post-text">{parse(item.text)}</div>{" "}
            <div className="post-title">Recomendados</div>
            <div className="recomendados-post">
              {recentPosts.map((post) => (
                <Link href={`/Post/${post.slug}`} key={post.slug}>
                  {" "}
                  {/* Substitua `/post/${post.slug}` pelo caminho correto para a página do post */}
                  <div className="recomendados-item" key={post.slug}>
                    <Image
                      src={"/rpg/" + post.img}
                      alt={post.title}
                      width={200}
                      height={150}
                    />
                    <div className="recomendados-title">{post.title}</div>
                    <div className="recomendados-smalltext">
                      {post.smalltext}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ width: "90%", margin: "auto" }}>
              <DisqusComments post={item} />{" "}
            </div>
          </div>
          <div className="aside">
            <h2>Índice</h2>
            <TableOfContents />
            <div id="ad-container" />
            <hr className="shine" />
            <PostsGroupedByMonth />
            <hr />
            <h2>Compartilhe</h2>
            <Share
              url={currentUrl}
              title={item.title}
              description={item.smalltext}
            />
            <h2>Publicidade</h2>
            <Link href={"https://www.sjgames.com/"}>
              <Image
                className="rata"
                src={"/rpg/template.jpg"}
                alt={"tu tenso que é necessário para esmagar a minha rata?"}
                width={180}
                height={500}
                link={""}
              />{" "}
            </Link>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <DisqusComments post={item} />{" "}
      </div>
    </>
  );
};

export default PostPage;
