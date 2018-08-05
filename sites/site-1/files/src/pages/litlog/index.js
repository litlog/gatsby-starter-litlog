import React from 'react'
import Layout from '../../components/layout'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'

export default ({ data }) => {
  return (
    <Layout>
      <table>
        <thead>
          <tr>
            <th>fileAbsolutePath</th>
            <th>title</th>
          </tr>
        </thead>
        <tbody>
          {data.allMarkdownRemark.edges.map(({ node }, index) =>
            <tr key={index}>
              <td>
                <Link to={node.fields.slug}>{node.fields.slug}</Link>
              </td>
              <td>
                {node.frontmatter.title}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
};

export const query = graphql`
  {
    allMarkdownRemark(sort: { fields: [fileAbsolutePath], order: ASC }) {
      totalCount
      edges {
        node {
          id
          fileAbsolutePath
          frontmatter {
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
