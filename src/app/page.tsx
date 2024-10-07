import { env } from "@/env";
import { redirect } from "next/navigation";

export default function HomePage({
  searchParams,
}: {
  searchParams: { code?: string; access_token?: string };
}) {
  const apiRoute = `https://api.instagram.com/oauth/authorize/?app_id=${env.INSTAGRAM_APP_ID}&redirect_uri=${env.INSTAGRAM_REDIRECT_URI}&response_type=code&scope=user_profile,user_media`;

  if (searchParams.code) {
    redirect(
      `https://api.instagram.com/oauth/access_token?app_id=${env.INSTAGRAM_APP_ID}&app_secret=${env.INSTAGRAM_APP_SECRET}grant_type=authorization_code&redirect_uri=${env.INSTAGRAM_REDIRECT_URI}&code=${searchParams.code}`,
    );
  }

  if (searchParams.access_token) {
    return (
      <div className="flex h-screen items-center justify-center">
        {searchParams.access_token}
      </div>
    );
  }

  return <a href={apiRoute}>authorize</a>;
}
// AQAgzMy2bcUxqThKR_3Fvi-3jHumleRzK3Uv4SLn7PhBjk3GtNKl5OT4wO8NZbeXcon6b7J7SPYE9_5e0QGvnHAaZyWPs96FXH86no0w0XIgP47cLTQogj80NNOC1EVz7Kj6eakWi5_r8iiFvT8747CM7Z7VmpmEfkzPZOqt8JTbeQV31ktXUuabm17LYd1NowGSjb9TxE46OWXtFSnOX6GGg_B-GT3PHR8kjJgFfA6JSg
