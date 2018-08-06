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
        resolve: 'gatsby-transformer-remark',
        options: {
          plugins: ['gatsby-remark-prismjs']
        }
      },
  ],
  pathPrefix: '/gatsby-starter-litlog'
}
