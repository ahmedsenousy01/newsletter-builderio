export default function HomePage() {
  const apiRoute = `https://api.instagram.com/oauth/authorize/?app_id=${process.env.INSTAGRAM_APP_ID}&redirect_uri=https://newsletter-builderio.vercel.app/&response_type=code&scope=user_profile,user_media`;

  return <a href={apiRoute}>authorize</a>;
}
