import JumbotronLarge from "@/components/JumbotronLarge";
import Navbar from "@/components/Navbar";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [help, setHelp] = useState(false);
  useEffect(() => {
    const lastSelect = localStorage.getItem("LastSelect");

    lastSelect
      ? router.push(lastSelect, undefined, { shallow: true })
      : router.push("/class/1", undefined, { shallow: true });
  }, [router]);

  useEffect(() => {
    setTimeout(() => {
      setHelp(true);
    }, 10000);
  }, []);
  return (
    <>
      <Head>
        <title>ZSTiO - Plan lekcji | Wczytywanie planu...</title>
        <meta property="og:title" content="Plan lekcji ZSTiO" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen w-screen overflow-hidden flex flex-col justify-center items-center bg-[#F7F3F5] dark:bg-[#171717] transition-all">
        <Link href={"https://zstiojar.edu.pl"} className="block md:hidden">
          <img alt="logo" className="w-20 h-20" src={"/icon-192x192.png"} />
        </Link>
        <JumbotronLarge />
        <div
          className={`transition-all text-gray-500 dark:text-gray-300 flex duration-700 justify-center items-center flex-col ${
            help ? "translate-y-0" : "translate-y-[100vh]"
          }`}
        >
          <p className="text-xl">Utknąłeś?</p>

          <Link
            href="/class/1"
            className="text-[#a91712] hover:text-white hover:border-transparent bg-transparent dark:border-[2px] border-[1px] border-[#a91712] mx-2 my-2 hover:bg-[#73110e] transition-all focus:ring-4 focus:outline-none focus:ring-transparent font-medium text-sm px-4 py-2.5 text-center inline-flex items-center dark:text-gray-300 hover:dark:text-white dark:bg-[#202020] dark:rounded-lg dark:border-none dark:hover:bg-[#141414] dark:outline-none"
            type="button"
          >
            Spróbuj przejść dalej
          </Link>

          <button
            className="text-[#a91712] hover:text-white hover:border-transparent bg-transparent dark:border-[2px] border-[1px] border-[#a91712] mx-2 my-2 hover:bg-[#73110e] transition-all focus:ring-4 focus:outline-none focus:ring-transparent font-medium text-sm px-4 py-2.5 text-center inline-flex items-center dark:text-gray-300 hover:dark:text-white dark:bg-[#202020] dark:rounded-lg dark:border-none dark:hover:bg-[#141414] dark:outline-none"
            type="button"
            onClick={() => {
              window?.location?.reload(true);
            }}
          >
            Odśwież stronę
          </button>
        </div>
      </div>
    </>
  );
}
