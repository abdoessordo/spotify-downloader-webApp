import { logout } from "@/lib/spotify";
import { Button } from "./ui/button";

interface HeaderProps {
  profileImg: string;
  displayName: string;
  followers_total: number;
  playlists_total: number;
}

export default function Header({
  profileImg,
  displayName,
  followers_total,
  playlists_total,
}: HeaderProps) {
  return (
    <header
      className=" 
  px-[15vw] mb-10
  h-[30vh] max-h-[400px] min-h-[340px] 
  bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.82)] bg-gray-700 bg-grad
  flex items-end justify-center
  "
    >
      {/* Logout container */}
      {/* sticky  */}
      <div className="absolute top-0 right-0 p-4">
        <Button className="rounded-full font-black" onClick={logout}>
          Log Out
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center  space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-end md:justify-center">
          <img
            className="w-28 h-28 md:w-48 md:h-48 rounded-full"
            src={profileImg}
            alt="profile"
          />
          <div className="flex flex-col justify-center items-center md:block">
            <span className="hidden md:block text-sm text-gray-500 cursor-pointer hover:underline">
              Profile
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl">{displayName}</h1>
            <p className="mt-2 text-sm text-gray-500">
              {playlists_total} playlists · {followers_total} followers
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
