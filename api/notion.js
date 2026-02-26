// /api/notion.js
export default async function handler(req, res) {
  let allResults = [];
  let hasMore = true;
  let startCursor = undefined;

  while (hasMore) {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.NOTION_TOKEN}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          start_cursor: startCursor
        })
      }
    );

    const data = await response.json();

    allResults = allResults.concat(data.results);
    hasMore = data.has_more;
    startCursor = data.next_cursor;
  }

  res.status(200).json({ results: allResults });
}
