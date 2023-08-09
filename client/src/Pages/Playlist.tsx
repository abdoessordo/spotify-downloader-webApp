import { useTokenContext } from "@/hooks/useTokenContext";

export default function Playlist() {
  const tokenContext = useTokenContext();
  console.log(tokenContext.getTokensFromContext());
  return (
    <div>
      <h1>Playlist</h1>
      <p>
        {tokenContext.getTokensFromContext()?.access_token}
        {tokenContext.getTokensFromContext()?.refresh_token}
      </p>
    </div>
  );
}
