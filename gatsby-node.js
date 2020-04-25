/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`);

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // adding attributes to MarkdownRemark node
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  };  
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { 
    createPage,
  } = actions

  const templateComponent = path.resolve(`src/templates/notes.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___title]}, limit: 1000) {
        nodes {
          parent {
            id
            ... on File {
              id
              relativeDirectory
              modifiedTime(fromNow: true)
              name
            }
          }
          headings {
            value
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.nodes.forEach(node => {
    createPage({
      path: node.parent.name,
      component: templateComponent,
      context: {}, // additional data can be passed via context
    })
  })
}
