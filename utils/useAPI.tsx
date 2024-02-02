import { Price } from "@/Interfaces";

export const fetchURL = () => {
  let URL =
    process?.env?.NEXT_PUBLIC_SITE_URL || process?.env?.NEXT_PUBLIC_VERCEL_URL
      ? "wemsc.vercel.app/"
      : "http://localhost:3000/";

  URL = URL.includes("http") ? URL : `https://${URL}`;
  URL = URL.charAt(URL.length - 1) === "/" ? URL : `${URL}/`;

  return URL;
};

type postDataProps = { URL: string; data?: { price: Price } };

export const postData = async ({ URL, data }: postDataProps) => {
  console.log("Posting: ", { URL, data });

  const res: Response = await fetch(URL, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.log("Error: ", { URL, data, res });
    throw Error(res.statusText);
  }

  return res.json();
};
