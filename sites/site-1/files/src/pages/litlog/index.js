import React from 'react'
import Layout from '../../components/layout'
import { graphql } from 'gatsby'

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
                {node.fileAbsolutePath}
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
    allMarkdownRemark(sort: { fields: [fileAbsolutePath] }) {
      totalCount
      edges {
        node {
          id
          fileAbsolutePath
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
