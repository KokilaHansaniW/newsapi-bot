import express from "express";
import Parser from "rss-parser";

const app = express();
const parser = new Parser();

app.get("/news", async (req, res) => {
  try {
    //const feed = await parser.parseURL("https://feeds.bbci.co.uk/news/world/rss.xml");
    const feed = await parser.parseURL("https://techcrunch.com/feed/");

    const articles = feed.items.slice(0, 5).map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      content: item.contentSnippet,
      image: item.enclosure?.url || null
    }));

    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
