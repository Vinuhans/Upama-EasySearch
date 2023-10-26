const { Client } = require("@elastic/elasticsearch");
const cors = require("cors");
const express = require("express");
const app = express();

// Configure middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: true }));// Parse incoming URL-encoded data

const port = 3001; // Define the port number

// Define HTML tag markers for highlighting search results
const pre_tag = '<strong><i>';
const post_tag = '</strong></i>';

// Create an Elasticsearch client
const client = new Client({
    node: "http://localhost:9200",
});

// Define a route for checking the health of the Elasticsearch cluster
app.get("/health", async (req, res) => {
    const health = await client.cluster.health();
    res.json(health);
});

// Define a route for performing a search based on a user-provided phrase
app.post("/search", async (req, res, next) => {
    console.log(`Phrase for category search: ${req.body.phrase}`);
    const { phrase } = req.body;
    const result = await client.search({
        index: "upama-easysearch",
        body: {
          size: 83,
          query: {
            "multi_match": {
              "query": phrase,
              "fields": [ "Poem Name", "Poet", "Line", "metaphorical terms", "Source Domain", "Target Domain", " Meaning"," Year","Simile term"]
            }
          },
          highlight: {
            fields: {
                "Poem Name": {},
                "Poet": {},
                "Line": {},
                "metaphorical terms": {},
                "Source Domain": {},
                "Target Domain": {},
                "Meaning.case_insensitive_and_inflections": {},
                "Simile term":{}
            },
            pre_tags: pre_tag,
            post_tags: post_tag,
          },
        },
    
    });
    res.json(result.hits.hits);
});

// Define routes for searching by specific categories (Author, Title, Year, Source, Simile, Target, Meaning)
app.post("/author", async (req, res, next) => {
    console.log(`Phrase for category Author - ${req.body.phrase}`);
    const { phrase } = req.body;
    const result = await client.search({
        index: "upama-easysearch",
        body: {
        size: 83,
        query: {
            bool: {
            should: [
                {
                match: { Poet: { query: phrase } },
                },
            ],
            },
        },
        highlight: {
            fields: {
            Poet: {},
            },
            pre_tags: pre_tag,
            post_tags: post_tag,
        },
        },

    });

    res.json(result.hits.hits);
});

app.post("/title", async (req, res, next) => {
    console.log(`Phrase for category Poem - ${req.body.phrase}`);
    const { phrase } = req.body;
    const result = await client.search({
        index: "upama-easysearch",
        body: {
        size: 83,
        query: {
            bool: {
            should: [
                {
                match: { "Poem Name": { query: phrase } },
                },
            ],
            },
        },
        highlight: {
            fields: {
            Poet: {},
            },
            pre_tags: pre_tag,
            post_tags: post_tag,
        },
        },
    });
    res.json(result.hits.hits);
});
app.post("/year", async (req, res, next) => {
    console.log(`Phrase for category Year - ${req.body.phrase}`);
    const { phrase } = req.body;
    const result = await client.search({
        index: "upama-easysearch",
        body: {
            size: 83,
            query: {
                bool: {
                    should: [
                        {
                            match: { " Year": { query: phrase } },
                        },
                    ],
                },
            },
        },
    });
    console.log("The Data",result.hits.hits)
    res.json(result.hits.hits);
});

app.post("/source", async (req, res, next) => {
    console.log(`Phrase for category Source - ${req.body.phrase}`);
    const { phrase } = req.body;
    const result = await client.search({
        index: "upama-easysearch",
        body: {
        size: 83,
        query: {
            bool: {
            should: [
                {
                match: { "Source Domain": { query: phrase } },
                },
            ],
            },
        },
        highlight: {
            fields: {
            "Source Domain": {},
            },
            pre_tags: pre_tag,
            post_tags: post_tag,
        },
        },
    });
    res.json(result.hits.hits);
});

app.post("/simile", async (req, res, next) => {
    console.log(`Phrase for category Simile - ${req.body.phrase}`);
    const { phrase } = req.body;
    const result = await client.search({
        index: "upama-easysearch",
        body: {
        size: 83,
        query: {
            bool: {
            should: [
                {
                match: { "Simile present or not": { query: "Yes" } },
                },
            ],
            },
        },
        highlight: {
            fields: {
            "Source Domain": {},
            },
            pre_tags: pre_tag,
            post_tags: post_tag,
        },
        },
    });
    res.json(result.hits.hits);
});
app.post("/target", async (req, res, next) => {
    console.log(`Phrase for category Target - ${req.body.phrase}`);
    const { phrase } = req.body;
    const result = await client.search({
        index: "upama-easysearch",
        body: {
          size: 83,
          query: {
            bool: {
              should: [
                {
                  match: { "Target Domain": { query: phrase } },
                },
              ],
            },
          },
          highlight: {
            fields: {
              "Target Domain": {},
            },
            pre_tags: pre_tag,
            post_tags: post_tag,
          },
        },    
    });
    res.json(result.hits.hits);
});

app.post("/meaning", async (req, res, next) => {
    console.log(`Phrase for category Meaning - ${req.body.phrase}`);
    const { phrase } = req.body;
    const result = await client.search({
        index: "upama-easysearch",
        body: {
          size: 83,
          query: {
            bool: {
              should: [
                {
                  match: {
                    " Meaning": { query: phrase },
                  },
                },
              ],
            },
          },
          highlight: {
            fields: {
              "Meaning.case_insensitive_and_inflections": {},
            },
            pre_tags: pre_tag,
            post_tags: post_tag,
          },
        },
    });
    console.log("The Data",result.hits.hits)
    res.json(result.hits.hits);
});
// Start the Express server on 3001
app.listen(port, () => {
    console.log(`Listening on port ${port}............`);
});
