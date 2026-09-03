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
    title: 'I Built An Application Programming Interface (API) to Document One',
    dek: 'I taught myself how to document an API by creating my own with an agent from Replit.',
    status: 'published',
    author: 'Jay',
    readTime: 7,
    tags: ['Docs', 'APIs'],
    publishedAt: '2026-09-02',
    updatedAt: '2026-09-02',
    markdown: `# I Created An API To Learn How To Document One

    API Documentation. As I look for my next role in technical writing, I read job posting after job posting looking for someone to create developer-facing documentation. Most of my experience in technical writing, up until now, has had a focus of client-facing documentation. Knowledge base articles. Product announcement emails. I crafted sentence after sentence to make complex software easy to use for non-technical (or at least non-developer) audiences. Always from the User Interface (UI) of the software, never the Application Programming Interface (API). I recently decided to change that, as I had built some side projects, and I could (or at least Replit could) create APIs out of them.

    ## Keys and Endpoints

    Enter Job Finder. As part of my own job search, I built an aggregation tool that would search through company websites to scan for open postings for technical writing and adjacent fields. To build the API, I just prompted Replit's AI agent to build the API for the app, and then I pushed the changes to the app to deployment. Easy. Now for the documentation part. I wasn't sure of the best way to document an API so I asked Replit to create an outline for the documentation but not to fill out the details. I ended up with the following sections: Base URL, Authentication, Quick Start, Endpoints, Errors, Rate Limits, Data Freshness, and Contact. To authenticate with the app, users would request and API key from me, but, in reality, the API was really meant for me for documentation purposes, so I created a key for myself. The user (or me) would authenticate this way:

    \` X-API-Key: YOUR_API_KEY \`

    The interesting thing I learned about the API Key is not all APIs call the key by the same variable (so when I went to test a different API in Postman, I was surprised that the parameter had a slightly different name.) The API would have a few endpoints, with the goal of pulling job listings from the app along with retrieving some statistics like the number of jobs aggregated and from which platform they are sourced. I also added an endpoints for the number of jobs available in each location, which, of course, isn't always 100 percent clear. I documented only GET Requests because the goal of the project was to keep the project simple and I was only really intending the API to pull data not to push data because any changes I would need to make (like add new target companies) I would likely do through the agent itself.

 
      
  ## Testing The API

  To test the API, I signed up for Postman. The sign-up process was incredibly simple, and I was up and running in no time. (Side note: When I think of Postman I think of that old song from the 60's or that newer remix mashup that was so popular a few years ago.) It was kind of a thrill to do my first API calls and have the API return data like a job posting from Hacker News instead of reviewing it from my app's User Interface (UI) itself. I am so used to experiencing software from the unsophistcated end user experience: you just click a button or a link and data displays in rows and tables. Having the data returned to me in code was something else:

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

  To test the less-than-idea use cases, I made my own mistakes to experience the errors for myself. After all, not everything goes according to plan, and someone newer to APIs like me is prone to make mistakes every now and then. For instance, I tried pulling some information using an endpoint that didn't exist and received:

  \`\`\` {
      "error": {
          "code": "NOT_FOUND",
          "message": "The requested public API endpoint does not exist."
      }
  }
  \`\`\`

  And, of course, I tried submitting a GET Request without providing my key and the result was as expected:

  \`\`\` {
      "error": {
          "code": "UNAUTHORIZED",
          "message": "A valid API key is required."
      }
  }
   \`\`\`

  ## Lessons

  All in all, I think my first experience with documenting APIs was a success. I think if I had to take any lessons away from it:

  * I would recommend that anyone who wants to gain technical skills beyond what they learned in previous roles is to simply build something for your self. And then document it. It's always more interesting to document something that you have an interest in and documenting a job search API was a perfect fit for someone looking for a job.
  * I would also recommend that you let your AI agent guide you but not do the work for you. Having the AI agent outline the docs but not write them ouright (it's fully capable of doing so I instructed it specifically not to write the docs for me.) This approach provides much-needed structure, while it still allows you to do the work.

  Now that I have shared my experience, I would love to have your feedback. How have you learned how to document APIs? Have you created an app with an API to learn how to create developer documentation? If you are already an API expert, how have you learned something new for technical writing? Are you learn by doing like me, or do you prefer to dive in the docs, a book, or a tutorial? Reach out to me at \`jay@technicalwriting.io \`
  `,
  },
  {
    slug: 'tiny-systems-for-the-long-middle',
    title: 'Tiny systems for the long middle',
    dek: 'What to do when the exciting beginning is over and the finish line is still a rumor.',
    status: 'published',
    author: 'Mara Ellison',
    readTime: 9,
    tags: ['Work', 'Making'],
    publishedAt: '2024-05-28',
    updatedAt: '2024-06-02',
    content: [
      p({ type: 'text', value: 'Most projects do not fail at the beginning. The beginning has its own electricity. They fail somewhere in the long middle, where progress becomes less visible and the original promise has stopped doing the motivating.' }),
      p({ type: 'text', value: 'I like small systems here. Not productivity systems, exactly. More like handrails: modest rules that reduce the number of decisions required to keep going.' }),
      heading('A system should be smaller than your ambition'),
      p({ type: 'text', value: 'The system is not the project. This distinction matters. If the ritual needs its own dashboard, it has quietly become a second project with a very convincing excuse.' }),
      p({ type: 'text', value: 'For a writing project, my smallest useful loop looks like this: make one visible change, leave one note about what comes next, close the file. In code, the same idea might be a tiny function that makes the next state explicit:' }),
      { type: 'code', language: 'ts', filename: 'next-step.ts', value: `type Session = {\\n  changed: boolean;\\n  next: string;\\n};\\n\\nexport function closeSession(next: string): Session {\\n  return { changed: true, next: next.trim() };\\n}` },
      p({ type: 'text', value: 'It is not clever. That is part of its job. The function gives tomorrow a handle instead of giving today another opportunity to optimize.' }),
      heading('Keep a little evidence'),
      p({ type: 'text', value: 'The middle is easier to cross when you can see that you have crossed some of it. Keep evidence close to the work: a short changelog, a folder of discarded sketches, a list of questions that have become less fuzzy.' }),
      { type: 'list', items: ['Record decisions, not just deliverables.', 'Make unfinished work easy to recognize.', 'Review the trail once a week, without turning it into a performance review.'] },
      heading('Let the system end'),
      p({ type: 'text', value: 'A good handrail is temporary. When the work becomes fluent, remove the scaffolding. The aim is not to become the kind of person who maintains a system; it is to make the thing you care about a little easier to continue.' }),
    ],
  },
  {
    slug: 'the-useful-edge-of-uncertainty',
    title: 'The useful edge of uncertainty',
    dek: 'A practical note on leaving a little room for the answer to change.',
    status: 'published',
    author: 'Mara Ellison',
    readTime: 6,
    tags: ['Thinking', 'Notes'],
    publishedAt: '2024-05-09',
    updatedAt: '2024-05-09',
    content: [
      p({ type: 'text', value: 'Certainty is comfortable, but it is a poor place to notice anything new. The most interesting part of a problem is often the slim border where what we know stops being sufficient.' }),
      p({ type: 'text', value: 'This is not an argument for indecision. A decision can be firm while the explanation around it remains provisional. The trick is to mark the difference.' }),
      heading('Name the shape of the unknown'),
      p({ type: 'text', value: '“I do not know” is honest but broad. “I do not know whether the constraint is technical or social” is more useful. Specific uncertainty creates a next question; vague uncertainty becomes atmosphere.' }),
      { type: 'quote', value: 'Questions are not a tax on progress. They are how progress keeps its bearings.', cite: 'Field note, Tuesday morning' },
      heading('Leave a door, not a hole'),
      p({ type: 'text', value: 'When I write a plan, I now add one sentence called “what could change this.” It keeps the plan from pretending to be a prophecy. It also tells collaborators where to bring new information.' }),
      p({ type: 'text', value: 'The result is a document that can move. It has a spine, but it is not brittle.' }),
    ],
  },
  {
    slug: 'a-note-on-finished-work',
    title: 'A note on finished work',
    dek: 'The quiet relief of putting a boundary around something you made.',
    status: 'published',
    author: 'Mara Ellison',
    readTime: 5,
    tags: ['Making', 'Notes'],
    publishedAt: '2024-04-21',
    updatedAt: '2024-04-21',
    markdown: `Finished is a practical word. It does not mean perfect, definitive, or beyond improvement. It means the work has crossed the line you drew for it and can now be met by someone other than you.

Without that line, making can become an endless, private weather system. Everything remains almost ready. Every decision can be reopened. The work never gets the chance to have a life outside its maker.

## A boundary is part of the craft

Before I begin, I try to write down what "done for now" will look like. Three pages. A clear example. A version that a thoughtful stranger can use. The boundary is not a compromise with quality; it is what gives quality somewhere to land.

Then I stop. I send the thing. I make tea. The small ceremony matters because it teaches the nervous system that completion is safe.`,
  },
];

export function getPost(slug?: string) {
  return posts.find((post) => post.slug === slug);
}
