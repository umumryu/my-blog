import Link from 'next/link';
import styles from './page.module.css';

export default function About() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>自己紹介</h1>
        
        <div className={styles.profile}>
          <div className={styles.profileImage}>
            {/* プロフィール画像の代わりにプレースホルダー */}
            <div className={styles.placeholder}></div>
          </div>
          
          <div className={styles.profileInfo}>
            <h2 className={styles.name}>名前</h2>
            <p className={styles.bio}>
              ここに自己紹介文を入力してください。あなたの経歴、興味、専門分野などについて書くことができます。
              読者があなたのことをより良く理解できるように、簡潔かつ魅力的な自己紹介を心がけましょう。
            </p>
            
            <div className={styles.skills}>
              <h3>スキル</h3>
              <ul>
                <li>スキル1</li>
                <li>スキル2</li>
                <li>スキル3</li>
              </ul>
            </div>
            
            <div className={styles.contact}>
              <h3>連絡先</h3>
              <ul>
                <li>メール: example@example.com</li>
                <li>Twitter: @username</li>
                <li>GitHub: github.com/username</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className={styles.navigation}>
          <Link href="/" className={styles.backLink}>
            ホームに戻る
          </Link>
        </div>
      </div>
    </main>
  );
} 