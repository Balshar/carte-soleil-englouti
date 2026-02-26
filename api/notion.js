// /api/notion.js
export default async function handler(req, res) {
  
  const databaseId = process.env.NOTION_DATABASE_ID || process.env.DATABASE_ID;
  const notionToken = process.env.NOTION_TOKEN;

  let allResults = [];
  let hasMore = true;
  let startCursor = undefined;

  try {
    while (hasMore) {
      const response = await fetch(
        `https://api.notion.com/v1/databases/${databaseId}/query`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${notionToken}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            start_cursor: startCursor
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json({ error: data });
      }

      allResults = allResults.concat(data.results);
      hasMore = data.has_more;
      startCursor = data.next_cursor;
    }

    res.status(200).json({ results: allResults });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
}
