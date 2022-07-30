/*testing ipfs and mfs*/
import * as IPFS from "ipfs-core";
import { create } from "ipfs-client";
import { useEffect, useRef } from "react";

export default function Web() {
  const ipfs = useRef(false);
  useEffect(() => {
    async function temp() {
      if (!ipfs.current) {
        console.log("started");
        ipfs.current = true;
        const client = create({
          grpc: "/ip4/127.0.0.1/tcp/5003/ws",
          http: "/ip4/127.0.0.1/tcp/5002/http",
        });

        const id = await client.id();
        console.log(client,id)
        
        // const temp2 = await IPFS.create();
        ipfs.current = client;
        // const { cid } = await temp2.add("Hello world");

        // console.log("==",cid);
      }
    }
    temp();
  }, []);

  async function addFile() {
    let res;
    try {
      res = await ipfs.current.files.mkdir("/wallet");
      console.log(Object.keys(res));
    } catch (err) {
      console.error(err);
    }
    console.log(res);
  }

  return (
    <div>
      <button type="submit" onClick={addFile}>
        File check
      </button>
    </div>
  );
}
