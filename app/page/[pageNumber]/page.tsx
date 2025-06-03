import Link from 'next/link';
import { client } from '../../../libs/microcms';
import styles from '../../page.module.css';
import Pagination from '../../components/Pagination';

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
      fields: 'id,title,publishedAt,category',
      limit,
      offset,
    },
  });
  return data;
}

// 全記事数を取得してページ数を計算
async function getTotalPages(perPage: number = 3): Promise<number> {
  const data = await client.get({
    endpoint: 'blog',
    queries: {
      fields: 'id',
      limit: 1,
    },
  });
  return Math.ceil(data.totalCount / perPage);
}

export default async function BlogPage({ params }: { params: Promise<{ pageNumber: string }> }) {
  const { pageNumber } = await params;
  const currentPage = parseInt(pageNumber, 10);
  
  // ページ番号が無効な場合はエラー
  if (isNaN(currentPage) || currentPage < 1) {
    throw new Error('Invalid page number');
  }

  const data = await getBlogPosts(currentPage);
  
  // ページが存在しない場合はエラー
  if (data.contents.length === 0 && currentPage > 1) {
    throw new Error('Page not found');
  }

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
          <h2 className={styles.sectionTitle}>記事一覧 - ページ {currentPage}</h2>
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
            currentPage={currentPage} 
            perPage={3}
          />
        </div>

        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p>© 2025 noriumum</p>
          </div>
        </footer>
      </div>
    </main>
  );
}

// 静的パスを生成
export async function generateStaticParams() {
  const totalPages = await getTotalPages(3);
  
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    pageNumber: (i + 2).toString(), // 2ページ目以降を生成（1ページ目は/で表示）
  }));
}