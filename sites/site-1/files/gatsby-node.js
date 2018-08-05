/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' })
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const litlogPageTemplate = path.resolve('./src/templates/litlog-page.js');
    graphql(`
      {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/src\/pages\/litlog/" } }
        ) {
          edges {
            node {
              fileAbsolutePath
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      const items = result.data.allMarkdownRemark.edges;
      // Create litlog pages
      const litlogPages = items.filter(item => /src\/pages\/litlog/.test(item.node.fileAbsolutePath));
      litlogPages.forEach(({ node }) => {
        const slug = node.fields.slug;
        createPage({
          path: slug,
          component: litlogPageTemplate,
          context: {
            slug,
          },
        })
      })
      resolve()
    })
  })
}
