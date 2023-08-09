import { useEffect, useState } from "react";
import {
  getAccessToken,
  getUserPlaylists,
  getUserProfile,
} from "@/lib/spotify";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

interface SpotifyUser {
  display_name: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  type: string;
  uri: string;
  followers: {
    href: string | null;
    total: number;
  };
  country: string;
  product: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  email: string;
}

interface SpotifyPlaylist {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: {
    height: number | null;
    url: string;
    width: number | null;
  }[];
  name: string;
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: string | null;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}

export default function Home() {
  const [isLogged, setIsLogged] = useState<boolean>(
    getAccessToken() ? true : false
  );

  const [userData, setUserData] = useState<SpotifyUser>();
  const [userPlaylists, setUserPlaylists] = useState<{
    total: number;
    items: SpotifyPlaylist[];
  }>();

  useEffect(() => {
    if (getAccessToken()) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }

    getUserProfile().then((res) => {
      setUserData(res);
      getUserPlaylists(20, res.id).then((res) => {
        console.log(res.items);
        setUserPlaylists({
          total: res.total,
          items: res.items,
        });
      });

      if (!userData) return;
    });

    //   if (!access_token || !refresh_token || !expires_in) return;
    //   const newTokens: Tokens = {
    //     access_token: access_token,
    //     refresh_token: refresh_token,
    //     expires_in: expires_in,
    //     time_stamp: Date.now(),
    //   };
    //   tokenContext.setTokensInContext(newTokens);

    //   const refreshToken = async () => {
    //     return await axios.get(`http://localhost:8888/refresh_token`, {
    //       params: {
    //         refresh_token: refresh_token,
    //       },
    //     });
    //   };

    //   if (refresh_token && access_token) {
    //     refreshToken().then((res) => {
    //       const newTokens: Tokens = {
    //         access_token: res.data.access_token,
    //         refresh_token: refresh_token,
    //         expires_in: res.data.expires_in,
    //         time_stamp: Date.now(),
    //       };
    //       tokenContext.setTokensInContext(newTokens);
    //     });
    //   }
  }, []);

  return (
    <div>
      {isLogged ? (
        <>
          <Header
            profileImg={userData?.images[1].url || ""}
            displayName={userData?.display_name || ""}
            followers_total={userData?.followers.total || 0}
            playlists_total={userPlaylists?.total || 0}
          />

          {/* 
        Grid of playlists cards
      */}
          <div
            className="
       px-[15vw] 
      grid grid-cols-1 gap-4 py-4 mx-auto mt-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {userPlaylists?.items.map((playlist) => (
              <div className="flex flex-col items-center justify-center p-4 space-y-4 bg-gray-800 rounded-lg shadow-lg">
                <img
                  className="w-24 h-24 rounded-full"
                  src={playlist.images[0].url}
                  alt="playlist"
                />
                <h1 className="text-xl font-bold">{playlist.name}</h1>
                <p className="text-sm text-gray-500">{playlist.description}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold">Welcome to Spotify Downloader</h1>
          <Link
            // to="https://spotifyapi-2t9t.onrender.com/login"
            to="http://localhost:8888/login"
            className="mt-5"
          >
            <Button>Login</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
