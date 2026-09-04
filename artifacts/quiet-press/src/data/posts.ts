export type InlinePart =
  | { type: 'text'; value: string }
  | { type: 'em'; value: string }
  | { type: 'strong'; value: string }
  | { type: 'code'; value: string };

export type ContentBlock =
  | { type: 'paragraph'; parts: InlinePart[] }
  | { type: 'heading'; value: string }
  | { type: 'quote'; value: string; cite?: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; language: string; filename?: string; value: string };

export type PostStatus = 'published' | 'draft';

export type Post = {
  slug: string;
  title: string;
  dek: string;
  content?: ContentBlock[];
  markdown?: string;
  status: PostStatus;
  author: string;
  readTime: number;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
};

const p = (...parts: InlinePart[]): ContentBlock => ({ type: 'paragraph', parts });
const heading = (value: string): ContentBlock => ({ type: 'heading', value });

export const posts: Post[] = [
  {
    slug: 'attention-is-a-place',
    title: 'I Built An API to Document One',
    dek: 'I taught myself how to document an API by creating my own as a side project with an agent from Replit.',
    status: 'published',
    author: 'Jay',
    readTime: 7,
    tags: ['Docs', 'APIs'],
    publishedAt: '2026-09-04',
    updatedAt: '2026-09-04',
    markdown: `

    API Documentation. As I look for my next role in technical writing, I read job posting after job posting looking for someone to create developer-facing documentation. Most of my experience in technical writing, up until now, has had a focus of client-facing documentation. Knowledge base articles. Product announcement emails. I crafted sentence after sentence to make complex software easy to use for non-technical (or at least non-developer) audiences. Always from the user interface, never from the API. I recently decided to change that, as I had built some side projects, and I could (or at least Replit could) create APIs out of them.

  ## Keys and Endpoints

    Enter Job Finder. As part of my own job search, I built an aggregation tool to scan company websites for open technical writing, instructional design, developer relations, and adjacent roles. To build the API, I just prompted Replit's AI agent to create one, and then I simply deployed the app again. Easy. Now for the documentation part. I wasn't sure of the best way to document an API, so I asked Replit to create an outline for the documentation but not to fill out the details. I ended up with the following sections:
    
    * Base URL
    * Authentication
    * Quick Start
    * Endpoints
    * Errors
    * Rate Limits
    * Data Freshness
    * Contact
    
    To authenticate with the app, a user would request an API key from me, but, in reality, the API was really meant for my documentation purposes, so I created a key for myself. The user (or I) would authenticate this way:

    \` X-API-Key: YOUR_API_KEY \`

    The API would have a few endpoints, with the goal of pulling job listings from the app. It would also retrieve some statistics like the number of jobs aggregated and from which platform they are sourced. I also added an endpoint for the number of jobs available in each location, which, of course, isn't always 100 percent clear. I documented only GET requests because my goal was to keep the project simple. I only really wanted the API to retrieve data. Any changes I would need to make (like add new target companies) I would likely do through the agent itself.

 
      
  ## Testing The API

  To test the API, I signed up for Postman. The sign-up process was incredibly simple, and I was up and running in no time. (Side note: When I think of Postman, I think of that old song from the 60's.) It was kind of a thrill to do my first API calls and have the API return data like a job posting from Hacker News. I am so used to the end user experience: You just click a button or a link, and data displays in rows and tables. Having the data returned to me in code was something else:

  \`\`\`json

  {
      "jobs": [
          {
              "id": 236,
              "title": "Technical content developer",
              "company": "Klara Systems",
              "platform": "hackernews",
              "location": "Remote",
              "isRemote": true,
              "salaryRaw": null,
              "url": "https://news.ycombinator.com/item?id=49161851",
              "postedAt": "2026-08-03T21:43:16.000Z",
              "scrapedAt": "2026-08-19T20:04:53.339Z",
              "searchTerm": "technical content developer"
          }
       ],
      "total": 1,
      "page": 1,
      "pageSize": 1
  }

  \`\`\`

  To test the less-than-ideal use cases, I made my own mistakes. After all, not everything goes according to plan, and someone newer to APIs like me is prone to make mistakes every now and then. For instance, I tried pulling some information using an endpoint that didn't exist and received:

  \`\`\` 
  {
      "error": {
          "code": "NOT_FOUND",
          "message": "The requested public API endpoint does not exist."
      }
  }
  \`\`\`




  And, of course, I tried submitting a GET request without providing my key and the result was as expected:

  \`\`\` 
  {
      "error": {
          "code": "UNAUTHORIZED",
          "message": "A valid API key is required."
       }
  }
  \`\`\`
  
  ## Lessons

  All in all, I think my first experience with documenting APIs was a success. I think if I had to take any lessons away from it, they would be the following:

  - I would recommend that anyone who wants to gain technical skills beyond what they learned in previous roles is to simply build something for yourself (this is also advice I have heard echoed through Write the Docs meetups). And then document it. It's always more fun to document something that you have an interest in and documenting a job search API was a perfect fit for someone looking for a job.
  * I would also recommend that you let your AI agent guide you but not do the work for you. Have the AI agent outline the docs but not write them outright. As it is fully capable of doing so, I instructed it specifically not to write the docs for me. This approach provides much-needed structure, while it still allows you to do the work.

  Now that I have shared my experience, I would love to have your feedback. How have you learned how to document APIs? Have you created an app with an API to learn how to create developer documentation? If you are already an API expert, how have you learned something new for technical writing? Are you learning by doing like me, or do you prefer to dive in the docs, a book, or a tutorial? Reach out to me at \`jay@technicalwriting.io\`.`,
  },
];

export function getPost(slug?: string) {
  return posts.find((post) => post.slug === slug);
}
