/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const INSTAGRAM_APP_ID = 488837020617937;
const INSTAGRAM_APP_SECRET = "a5088330f02b37fdce69759089810ba1";
const INSTAGRAM_USER_TOKEN =
  "IGQWRQWHZADVm5yZAFA2ZAmxpamZAULS1MaWFCUWt0RWpIVzZAiLXFMOW12ZA0wyOXZA2RHBVMTFKcjZAiZAWhpNzdJeWlsalQzaDlYX0xmbTc5OUwzVVlzSXZAoTV9TUDFSYjl2amFqeVpYWFdoQjlsdEp4ZAkFkaWlGRGVWRFUZD";
const INSTAGRAM_REDIRECT_URI = "https://newsletter-builderio.vercel.app";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { code?: string; access_token?: string };
}) {
  const apiRoute = `https://api.instagram.com/oauth/authorize/?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${INSTAGRAM_REDIRECT_URI}&response_type=code&scope=user_profile,user_media`;

  // if (searchParams.code) {
  //   const res = await fetch(`https://api.instagram.com/oauth/access_token`, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       client_id: INSTAGRAM_APP_ID,
  //       client_secret: INSTAGRAM_APP_SECRET,
  //       grant_type: "authorization_code",
  //       redirect_uri: INSTAGRAM_REDIRECT_URI,
  //       code: searchParams.code,
  //     }),
  //   });
  //   const data = await res.json();
  //   console.log(data);
  //   return (
  //     <div className="flex h-screen items-center justify-center">
  //       <pre>{JSON.stringify(data, null, 2)}</pre>
  //       <pre>
  //         {JSON.stringify({
  //           client_id: INSTAGRAM_APP_ID,
  //           client_secret: INSTAGRAM_APP_SECRET,
  //           grant_type: "authorization_code",
  //           redirect_uri: INSTAGRAM_REDIRECT_URI,
  //           code: searchParams.code,
  //         })}
  //       </pre>
  //     </div>
  //   );
  // }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <a href={apiRoute}>authorize</a>
      <pre>
        {JSON.stringify({
          client_id: INSTAGRAM_APP_ID,
          client_secret: INSTAGRAM_APP_SECRET,
          grant_type: "authorization_code",
          redirect_uri: INSTAGRAM_REDIRECT_URI,
          code: searchParams.code,
        })}
      </pre>
    </div>
  );
}
// AQAgzMy2bcUxqThKR_3Fvi-3jHumleRzK3Uv4SLn7PhBjk3GtNKl5OT4wO8NZbeXcon6b7J7SPYE9_5e0QGvnHAaZyWPs96FXH86no0w0XIgP47cLTQogj80NNOC1EVz7Kj6eakWi5_r8iiFvT8747CM7Z7VmpmEfkzPZOqt8JTbeQV31ktXUuabm17LYd1NowGSjb9TxE46OWXtFSnOX6GGg_B-GT3PHR8kjJgFfA6JSg
