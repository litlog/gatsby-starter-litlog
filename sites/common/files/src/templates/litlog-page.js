import React from "react"
import { graphql, Link } from "gatsby"
import rehypeReact from "rehype-react"

import Layout from "../components/layout"

export default ({ data }) => {
  const post = data.markdownRemark
  const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
      "g-link": Link
    },
  }).Compiler;
  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        {
          renderAst(post.htmlAst)
        }
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      frontmatter {
        title
      }
    }
  }
`
