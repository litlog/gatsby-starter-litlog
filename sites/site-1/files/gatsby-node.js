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
    if (/src\/pages\/litlog/.test(node.fileAbsolutePath)) {
      createNodeField({
        node,
        name: 'slug',
        value: `/litlog${slug}`,
      })
    } else {
      createNodeField({
        node,
        name: 'slug',
        value: slug,
      })
    }
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const litlogPageTemplate = path.resolve('./src/templates/litlog-page.js');
    const contentPageTemplate = path.resolve(`./src/templates/content-page.js`);
    const contentPostTemplate = path.resolve(`./src/templates/content-post.js`);
    graphql(`
      {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/content\/pages/|content\/posts/|src\/pages\/litlog/" } }
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

      // Create content pages
      const contentPages = items.filter(item => /content\/pages/.test(item.node.fileAbsolutePath));
      contentPages.forEach(({ node }) => {
        const slug = node.fields.slug;
        createPage({
          path: slug,
          component: contentPageTemplate,
          context: {
            slug,
          },
        })
      })

      // Create content posts
      const contentPosts = items.filter(item => /content\/posts/.test(item.node.fileAbsolutePath));
      contentPosts.forEach(({ node }) => {
        const slug = node.fields.slug;
        createPage({
          path: slug,
          component: contentPostTemplate,
          context: {
            slug,
          },
        })
      })

      resolve()
    })
  })
}
