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
            初めまして、山本です。このブログでは、私が学んだことや趣味で作った作品などを公開しています。
              
            </p>
            
            <div className={styles.skills}>
              <h3>現在学習しいていること</h3>
             <p>JavaScript, HTML, CSS</p>
            </div>

            <div className={styles.skills}>
              <h3>今後学習したいこと</h3>
             <p>JQuery, React, Next.js, シェーダー,グラッフィック関連</p>
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