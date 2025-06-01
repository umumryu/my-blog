import Link from 'next/link';
import { client } from '../libs/microcms';
import styles from './page.module.css';
import Pagination from './components/Pagination';

// ブログ記事の型定義を拡張
type Post = {
  id: string;
  title: string;
  publishedAt?: string;
  category?: {
    name: string;
  };
};

// ページネーション対応の記事取得
type BlogPostsResult = {
  contents: Post[];
  totalCount: number;
  limit: number;
  offset: number;
};

async function getBlogPosts(page: number = 1, limit: number = 3): Promise<BlogPostsResult> {
  const offset = (page - 1) * limit;
  const data = await client.get({
    endpoint: 'blog',
    queries: {
      fields: 'id,title,publishedAt,category',  // 日付とカテゴリ情報も取得
      limit,
      offset,
    },
  });
  return data;
}

export default async function Home() {
  const data = await getBlogPosts(1);

  return (
    <main className={styles.main}>
      {/* 背景動画 */}
      <video 
        className={styles.backgroundVideo}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/neptune.mp4" type="video/mp4" />
        お使いのブラウザは動画をサポートしていません。
      </video>
      
      {/* オーバーレイ */}
      <div className={styles.videoOverlay}></div>
      
      {/* メインコンテンツ */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.siteTitle}>noriumum</h1>
          <div className={styles.nav}>
            <Link href="/about" className={styles.navLink}>
              about
            </Link>
          </div>
        </div>

        <div className={styles.featuredSection}>
          <h2 className={styles.sectionTitle}>最新の記事</h2>
          <div className={styles.cardGrid}>
            {data.contents.map((post) => (
              <Link href={`/blog/${post.id}`} key={post.id} className={styles.card}>
                <div className={styles.cardImagePlaceholder}></div>
                <div className={styles.cardContent}>
                  <div className={styles.cardMeta}>
                    {post.category && (
                      <span className={styles.cardCategory}>{post.category.name}</span>
                    )}
                    {post.publishedAt && (
                      <time className={styles.cardDate}>
                        {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                      </time>
                    )}
                  </div>
                  <h3 className={styles.cardTitle}>{post.title}</h3>
                  <div className={styles.cardReadMore}>
                    <span>読む</span>
                    <span className={styles.arrowIcon}>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <Pagination 
            totalCount={data.totalCount} 
            currentPage={1} 
            perPage={3}
          />
        </div>

        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p>© 2025 noriumum. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </main>
  );
}