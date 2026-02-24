export default async function handler(req, res) {
  const response = await fetch("https://TON-PROJET.vercel.app/api/notion")
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json"
      }
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}
