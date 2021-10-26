import React from 'react';
import NestedContentList from './NestedContentList';
import { useStaticQuery, graphql } from 'gatsby';
import { css } from 'linaria';

// class ContentNode {
//   constructor(key) {
//     this.key = key;
//     this.children = new Map();
//     this.displayName = null;
//     this.isLink = false;
//     this.href = null; // valid whne isLink is true
//   }

//   hasChildNode(key) {
//     return this.children.has(key);
//   }

//   getChildNode(key) {
//     return this.children.get(key);
//   }

//   addChildNode(key) {
//     const node = new ContentNode(key);
//     this.children.set(key, node);
//     return node;
//   }
// }

// /**
//  * creating a tree of content node from the list of markdown nodes
//  * @param {Array} array of markdown nodes
//  */
// const buildContentTree = markdownNodes => {
//   const root = new ContentNode(null);

//   markdownNodes.forEach(markdownNode => {
//     const { frontmatter, parent } = markdownNode;

//     const { name } = parent;
//     const { path, title } = frontmatter;
//     const keys = path.split('/');

//     let current = root;
//     while (keys.length) {
//       const key = keys.shift();

//       // _index.md only provide information,
//       // does not create new node in content tree
//       if (key == '_index' && !keys.length) {
//         const { topicName } = frontmatter;
//         if (topicName) {
//           current.displayName = topicName;
//         }
//         break;
//       }

//       if (current.hasChildNode(key)) {
//         current = current.getChildNode(key);
//       } else {
//         current = current.addChildNode(key);
//         current.displayName = getDisplayNameFromSlug(key);
//       }
//     }

//     current.displayName = title;
//     current.isLink = true;
//     current.href = path;
//   });

//   return root;
// };

// /**
//  * generate display name from slug. assume key to be 'cs-notes', generated
//  * name will be 'CS Notes'
//  * @param {string} slug the slug string
//  * @returns {string} display name
//  */
// const getDisplayNameFromSlug = slug => {
//   const DELIMITER = '-';
//   const SPACER = ' ';

//   const words = slug.split(DELIMITER);
//   return words.map(capitalize).join(SPACER);
// };

// /**
//  * captialize give string
//  * @param {string} str
//  * @returns {string}
//  */
// const capitalize = str =>
//   str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

// const styles = {
//   sidebar: css`
//     border-right: solid 1px lightgray;
//     width: 350px;
//     height: 100%;
//     min-height: 100%;
//     padding: 1rem;
//   `,
// };

// export default function SideContentNavigation() {
//   const { allMarkdownRemark } = useStaticQuery(graphql`
//     query MarkdownNotesQuery {
//       allMarkdownRemark(
//         sort: { fields: frontmatter___path }
//         filter: { frontmatter: { path: { glob: "**" } } } # match any non-empty path
//       ) {
//         nodes {
//           frontmatter {
//             title
//             path
//           }
//           parent {
//             ... on File {
//               name
//             }
//           }
//         }
//       }
//     }
//   `);

//   const { nodes } = allMarkdownRemark;

//   const contentRoot = buildContentTree(nodes);

//   return (
//     <nav className={styles.sidebar} role="navigation">
//       <NestedContentList contentNode={contentRoot} root />
//     </nav>
//   );
// }
