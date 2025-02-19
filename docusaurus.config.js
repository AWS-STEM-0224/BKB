// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Bedrock',
  tagline: 'Bedrock Knowledge Base',
  favicon: 'img/aws-logo.png',

  // Set the production url of your site here
  url: 'https://aws.amazon.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'aws-stem', // Usually your GitHub org/user name.
  projectName: 'awsbedrock', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: false,
          blogTitle: 'Contributors',
          blogDescription: 'Meet our contributors',
          blogSidebarTitle: 'All Contributors',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          // onInlineTags: 'warn',
          // onInlineAuthors: 'warn',
          // onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'AWS',
        logo: {
          alt: 'AWS Logo',
          src: 'img/aws-logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial',
          },
          {to: '/blog', label: 'Contributor', position: 'left'},
          {
            href: 'https://aws.amazon.com/bedrock/?gclid=CjwKCAiA2cu9BhBhEiwAft6IxBoSpIdCU00g-wkL5Pj8Ax-MY8eHXSqgTVc7IhRk3suLDltg4ix3qxoCLGYQAvD_BwE&trk=24a8f13a-f5db-4127-bcb7-8b2876aa4265&sc_channel=ps&ef_id=CjwKCAiA2cu9BhBhEiwAft6IxBoSpIdCU00g-wkL5Pj8Ax-MY8eHXSqgTVc7IhRk3suLDltg4ix3qxoCLGYQAvD_BwE:G:s&s_kwcid=AL!4422!3!692062155749!e!!g!!aws%20bedrock!21058131112!157173586057',
            label: 'AWS Bedrock',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'AWS',
                href: 'https://aws.amazon.com/ko/free/?gclid=Cj0KCQiA_NC9BhCkARIsABSnSTacJ6XsM3kkpAjLYReSWlmmrJ1xXHTFM31kWLcPmER57TUrygKkfEAaAnaHEALw_wcB&trk=fa2d6ba3-df80-4d24-a453-bf30ad163af9&sc_channel=ps&ef_id=Cj0KCQiA_NC9BhCkARIsABSnSTacJ6XsM3kkpAjLYReSWlmmrJ1xXHTFM31kWLcPmER57TUrygKkfEAaAnaHEALw_wcB:G:s&s_kwcid=AL!4422!3!563761819834!e!!g!!aws!15286221779!129400439466&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all',
              },
              
              {
                label: 'AWS re:Post',
                href: 'https://repost.aws/ko',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Contributor',
                to: '/blog',
              },
              {
                label: 'AWS Bedrock',
                href: 'https://aws.amazon.com/ko/bedrock/?nc1=h_ls',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} STEM, Inc. Built with AWS.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
