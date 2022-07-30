import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId={"axfSKqnKQAuheMSGuWUHYAM4SGcsWp0x6z9Wxz2a"}
      serverUrl={"https://b5jzhuh8vowz.usemoralis.com:2053/server"}
    >
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
