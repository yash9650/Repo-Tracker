import { cookies } from "next/headers";
// import { setCookie } from "../../utils/cookies";

// const handler = (req, res) => {
//   // The cookie middleware will add the `set-cookie` header
// //   setCookie(res, "Next.js", "api-middleware!", { path: "/" });
//   // Return the `set-cookie` header so we can display it in the browser and show that it works!
// //   console.log(res.getHeader("Set-Cookie"));
// cookies
//   res.end();
// };

// export default handler;

export default function handler(request, response) {
  const cookieStore = cookies();
  const token = cookieStore.get("auth");
  console.log(token);
  // return new Response("Hello, Next.js!", {
  //   status: 200,
  //   headers: { "Set-Cookie": `token=${token}` },
  // });
  response.json({ message: "hii" });
}
