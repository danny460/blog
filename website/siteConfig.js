const users = [
  {
    caption: 'User1',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/image.jpg'.
    image: '/img/undraw_open_source.svg',
    infoLink: 'https://www.facebook.com',
    pinned: true,
  },
];

const baseUrl = '/blog/';

const siteConfig = {
  title: 'Danny\'s', // Title for your website.
  tagline: 'A website for my learning notes',
  repoUrl: 'https://github.com/danny460/blog',
  url: 'https://danny460.github.io/blog/', // Your website URL
  baseUrl, 
  projectName: 'blog',
  organizationName: 'danny460',
  headerLinks: [
    { doc: 'toc', label: 'Notes'},
    { blog: 'posts', label: 'Blog'},
  ],
  editUrl: 'https://github.com/danny460/blog/edit/master/docs/',
  
  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  // headerIcon: 'img/favicon.ico',
  footerIcon: 'img/favicon.ico',
  favicon: 'img/favicon.ico',

  /* Colors for website */
  colors: {
    primaryColor: '#4285F4',
    secondaryColor: '#FBBC05',
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Zhang Linghan Danny`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
    'https://buttons.github.io/buttons.js',
    {
      src: `${baseUrl}js/waypoint.js`,
      async: false,
    },
  ],
  stylesheets: [
    {
      href: `${baseUrl}css/custom.css`,
      type: 'text/css',
    }
  ],

  onPageNav: 'separate',
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',

  enableUpdateBy: true,
  enableUpdateTime: true,
};

module.exports = siteConfig;
