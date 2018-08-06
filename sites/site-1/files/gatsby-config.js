module.exports = {
  siteMetadata: {
    title: 'Gatsby Litlog Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'litlog',
          path: `${__dirname}/src/pages/litlog`,
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'pages',
          path: `${__dirname}/content/pages`,
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'posts',
          path: `${__dirname}/content/posts`,
        },
      },
      {
        resolve: 'gatsby-transformer-remark',
        options: {
          plugins: ['gatsby-remark-prismjs']
        }
      },
  ],
  pathPrefix: '/gatsby-starter-litlog'
}
