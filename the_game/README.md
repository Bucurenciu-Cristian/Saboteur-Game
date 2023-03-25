This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Entity Card

- enum
  - path 44
    - finish 3
      - 2 rocks
      - 1 gold
    - rest 41
      - 1 start
- action 27
  - 1 type action
    - 2 lights open
    - 3 lights close
    - 3 axe close
    - 2 axe open
    - 3 break path
    - 6 look at treasure
    - 3 trolley close
    - 2 trolley open
  - 2 type action
    - 1 light and trolley open
    - 1 light and axe open
    - 1 axe and trolley open
- gold nugget 28
  - 4 cards with 3 gold
  - 8 cards with 2 gold
  - 16 cards with 1 gold
- dwarf 11
  - 7 gold diggers
  - 4 saboteurs

### Tables of players

| No. of Players | No. of Saboteurs | No. of Gold-diggers |
| :------------: | :--------------: | :-----------------: |
|       3        |        1         |          3          |
|       4        |        1         |          4          |
|       5        |        2         |          4          |
|       6        |        2         |          5          |
|       7        |        3         |          5          |
|       8        |        3         |          6          |
|       9        |        3         |          7          |
|       10       |        4         |          7          |
