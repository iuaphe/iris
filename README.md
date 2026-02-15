<img alt="The letter 'i' on a multicolored background." src="/static/favicon.ico" width="200px"/>
 
Iris is a collection of computer science articles that use interactive figures.

## Organization

The project's source can be separated into two broad categories: _infrastructure_ and _content_. Infrastructure includes routing ([`src/routes`](./src/routes)), components common to many pages (such as `src/lib/[components, figure, graphics, styles]`), and utility functions or classes ([`src/lib/util`](./src/lib/util/)). Content includes the actual article data, and lies in [`src/lib/content`](./src/lib/content/).

### Content

All course content lies in the [`src/lib/content`](./src/lib/content/) directory.

The main entry point to course content is [`src/lib/courses.ts`](./src/lib/courses.ts), which contains a list of all content. The router uses this file to hierarchically display course materials on the site. More information about the structure of this file can be found in the interface for `Course` and `Topic`.

At the moment, articles are written in a custom article format built up using functions. These lie in subdirectories of [`src/lib/content`](./src/lib/content). Articles were, at one point, written in an extension of Markdown called [mdsvex](https://mdsvex.pngwn.io/) where Svelte components can be used in the Markdown. This actually seems way better than using functions, and I don't remember why I changed it. It might have been because mdsvex is just too silly of a name to take seriously (I think it's supposed to be [MDX](https://mdxjs.com/) + Svelte but I really don't like it). Still, it worked well and so I will probably switch to using that again at some point, or some similar framework.

## Developing

Run `npm run dev` to start the development server. Any file changes will be reflected in the browser through hot-reloading.
