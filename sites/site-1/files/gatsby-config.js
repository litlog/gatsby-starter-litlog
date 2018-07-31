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
      'gatsby-transformer-remark',
  ],
  pathPrefix: '/gatsby-starter-litlog'
}
