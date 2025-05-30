import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function About() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>About me</h1>
        
        <div className={styles.profile}>
          <div className={styles.profileImage}>
            {/* プロフィール画像 */}
            <Image
              src="/profile.png"
              alt="Norifumi Yamamoto のプロフィール画像"
              width={200}
              height={200}
              className={styles.profileImageImg}
              priority
            />
          </div>
          
          <div className={styles.profileInfo}>
            <h2 className={styles.name}>Norifumi Yamamoto</h2>
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
              <h3>Links</h3>
              <ul>
                <li className={styles.socialLinks}><a href="https://github.com/umumryu" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li className={styles.socialLinks}><a href="https://soundcloud.com/noryumum" target="_blank" rel="noopener noreferrer">SoundCloud</a></li>
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