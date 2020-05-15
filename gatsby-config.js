module.exports = {
  siteMetadata: {
    title: `CS Study Notes`,
    description: `This is my ever growing study notes. It covers many areas of computer science / software engineering, things I have learnt and am learning. I find it very useful to write things down so that I have a place to refer back to when needed. So here it is. It's not really meant as a blog for you to learn, ultimately these documents are just a representation of my logical flow. Still, I hope you may find some of them is useful. If you have any questions or like to point out any mistakes, feel free to leave a issue on github.`,
    author: `@ZhangLinghan`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-notes`,
        path: `${__dirname}/src/markdown-notes`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
