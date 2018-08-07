import { graphql } from 'gatsby'

export default ({ 
  data: {
    allPosts: { edges },
  } 
}) => {
  return (
    JSON.stringify(
      edges.map(edge => edge.node)
    )
  )
}

export const query = graphql`
  {
    allPosts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content\/posts/" } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
