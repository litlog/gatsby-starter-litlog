---
title: "Create a documentation site to record changes to the site"
date: "2018-07-31"
request: "request-1"
status: "in-progress"
---
## Plan

1. create @litlog/litlog-cli to automate the documentation of changes (undocumented).
```bash
mkdir gatsby-starter-litlog
cd gatsby-starter-litlog
git init
mkdir packages
cp -R ../gatsby-starter-litlog-1/packages/litlog-cli/ packages/
cat << EOF > .gitignore
node_modules
packages/*/lib
EOF
cd packages/litlog-cli/
npm link
git add .
git commit -m "litlog-cli v0.0.11"
```
1. create new [Gatsby](https://next.gatsbyjs.org/) site from [the default starter](https://github.com/gatsbyjs/gatsby-starter-default/tree/v2)
```bash
# already have npm and git installed
# run in a bash terminal
npm install --global gatsby-cli
# or npm update --global gatsby-cli
gatsby_new_timestamp=$(date +%Y-%m-%dT%H%M)
cd ..
gatsby new gatsby-starter-temp https://github.com/gatsbyjs/gatsby-starter-default#v2
echo $gatsby_new_timestamp
# 2018-07-30T0923
cd gatsby-starter-litlog
rm -r ../gatsby-starter-temp/node_modules
# node_modules/
# packages/*/lib
cp -R ../gatsby-starter-temp/* .
cp ../gatsby-starter-temp/.gitignore .
cp ../gatsby-starter-temp/.prettierrc .
npm install
gatsby develop
# update .gitignore for packages
cat << EOF >> .gitignore
#
# Built source for packages
packages/*/lib
EOF
# move everything except .gitignore to site folder
# .gitignore
# .prettierrc
# LICENSE
# README.md
# gatsby-browser.js
# gatsby-config.js
# gatsby-node.js
# gatsby-ssr.js
# package.json
# package-lock.json
# src/components/header.js
# src/components/layout.css
# src/components/layout.js
# src/pages/404.js
# src/pages/index.js
# src/pages/page-2.js
export LITLOG_SITE=site-1
# incorporate into 'litlog init' command
mkdir sites/
mkdir sites/$LITLOG_SITE/
mkdir sites/$LITLOG_SITE/files
mkdir sites/$LITLOG_SITE/files/src
mkdir sites/$LITLOG_SITE/files/src/components
mkdir sites/$LITLOG_SITE/files/src/pages
#
mv .prettierrc sites/$LITLOG_SITE/files
mv LICENSE sites/$LITLOG_SITE/files
mv README.md sites/$LITLOG_SITE/files
mv gatsby-browser.js sites/$LITLOG_SITE/files
mv gatsby-config.js sites/$LITLOG_SITE/files
mv gatsby-node.js sites/$LITLOG_SITE/files
mv gatsby-ssr.js sites/$LITLOG_SITE/files
mv package-lock.json sites/$LITLOG_SITE/files
mv package.json sites/$LITLOG_SITE/files
mv src/components/header.js sites/$LITLOG_SITE/files/src/components/
mv src/components/layout.css sites/$LITLOG_SITE/files/src/components/
mv src/components/layout.js sites/$LITLOG_SITE/files/src/components/
mv src/pages/404.js sites/$LITLOG_SITE/files/src/pages
mv src/pages/index.js sites/$LITLOG_SITE/files/src/pages
mv src/pages/page-2.js sites/$LITLOG_SITE/files/src/pages
# put into changes
export gatsby_new_timestamp=2018-07-30T0923
litlog created files/.prettierrc "Ran 'gatsby new $LITLOG_SITE https://github.com/gatsbyjs/gatsby-starter-default#v2'" $gatsby_new_timestamp
litlog created files/LICENSE "Ran 'gatsby new $LITLOG_SITE https://github.com/gatsbyjs/gatsby-starter-default#v2'" $gatsby_new_timestamp
litlog created files/README.md "Ran 'gatsby new $LITLOG_SITE https://github.com/gatsbyjs/gatsby-starter-default#v2'" $gatsby_new_timestamp
# I'm leaving out package-lock.json because it's automatically generated.
litlog created files/gatsby-browser.js "Ran 'gatsby new $LITLOG_SITE https://github.com/gatsbyjs/gatsby-starter-default#v2'" $gatsby_new_timestamp
litlog created files/gatsby-config.js "Ran 'gatsby new $LITLOG_SITE https://github.com/gatsbyjs/gatsby-starter-default#v2'" $gatsby_new_timestamp
litlog created files/gatsby-node.js "Ran 'gatsby new $LITLOG_SITE https://github.com/gatsbyjs/gatsby-starter-default#v2'" $gatsby_new_timestamp
litlog created files/gatsby-ssr.js "Ran 'gatsby new $LITLOG_SITE https://github.com/gatsbyjs/gatsby-starter-default#v2'" $gatsby_new_timestamp
litlog created files/package.json "Ran 'gatsby new $LITLOG_SITE https://github.com/gatsbyjs/gatsby-starter-default#v2'" $gatsby_new_timestamp
litlog created files/src/components/header.js "Ran 'gatsby new $LITLOG_SITE https://github.com/gatsbyjs/gatsby-starter-default#v2'" $gatsby_new_timestamp
litlog created files/src/components/layout.css "Ran 'gatsby new $LITLOG_SITE https://github.com/gatsbyjs/gatsby-starter-default#v2'" $gatsby_new_timestamp
litlog created files/src/components/layout.js "Ran 'gatsby new $LITLOG_SITE https://github.com/gatsbyjs/gatsby-starter-default#v2'" $gatsby_new_timestamp
litlog created files/src/pages/404.js "Ran 'gatsby new $LITLOG_SITE https://github.com/gatsbyjs/gatsby-starter-default#v2'" $gatsby_new_timestamp
litlog created files/src/pages/index.js "Ran 'gatsby new $LITLOG_SITE https://github.com/gatsbyjs/gatsby-starter-default#v2'" $gatsby_new_timestamp
litlog created files/src/pages/page-2.js "Ran 'gatsby new $LITLOG_SITE https://github.com/gatsbyjs/gatsby-starter-default#v2'" $gatsby_new_timestamp
# commit changes
git add .
git commit -m "initial setup from gatsby-starter-default#v2"
#
# modify .gitignore
cat << EOF >> .gitignore
#
# Site files
/*
!LICENSE
!README.md
!sites
EOF
#
# when files copied manually gatsby develop runs OK
# try copyfiles plus onchange
cp sites/$LITLOG_SITE/files/package.json .
npm install --save-dev copyfiles
npm install --save-dev onchange
npm install --save-dev cross-var
npm install --save-dev npm-run-parallel
npm install --save-dev gh-pages
npm install copyfiles -g
# modify scripts section of packages.json
cp package.json sites/$LITLOG_SITE/files/
cp package-lock.json sites/$LITLOG_SITE/files/
# make sure development site runs
npm run site-develop
# make sure site builds
npm run build
git add .gitignore
git add sites
git commit -m "set up for site files"
git remote add origin https://github.com/litlog/gatsby-starter-litlog.git
git push -u origin master
```
1. update *pathPrefix* in *gatsby-config.js*.
```bash
npm run site-develop #in a different terminal
litlog updating files/gatsby-config.js
# edit file
git apply << EOF
>--- a/sites/site-1/files/gatsby-config.js
>+++ b/sites/site-1/files/gatsby-config.js
>@@ -1,6 +1,7 @@
> module.exports = {
>   siteMetadata: {
>-    title: 'Gatsby Default Starter',
>+    title: 'Gatsby Litlog Starter',
>   },
>   plugins: ['gatsby-plugin-react-helmet'],
>+  pathPrefix: '/gatsby-starter-litlog'
> }
EOF
# note the > above which is not part of the actual command but included
# because there's an issue rendering diff syntax
litlog updated files/gatsby-config.js "added pathPrefix"
litlog updating files/package.json
# edit file
git apply << EOF
>--- a/sites/site-1/files/package.json
>+++ b/sites/site-1/files/package.json
>@@ -19,6 +19,7 @@
>     "develop": "gatsby develop",
>     "format": "prettier --write '**/*.js'",
>     "test": "echo \"Error: no test specified\" && exit 1",
>+    "deploy": "npm run site && gatsby build --prefix-paths && gh-pages -d public",
>     "site": "cross-var copyfiles --all --up 3 --exclude \"**/LICENSE\" --exclude \"**/README.md\" \"sites/$LITLOG_SITE/files/**/*\" ./",
>     "site-develop": "npm-run-parallel site-watch develop",
>     "site-watch": "cross-var onchange \"sites/$LITLOG_SITE/files/**/*\" -- npm run site"
EOF
litlog updated files/package.json "added deploy to scripts section"
npm run build
npm run deploy
git add sites
git commit -m "configured for deploy"
git push origin master
```
1. create <g-link to="/litlog/requests/request-1">request-1</g-link>, <g-link to="/litlog/tasks/task-1">task-1</g-link>, and commit changes.
```bash
export LITLOG_SITE=site-1
litlog creating requests/request-1
# update request-1 with specification
litlog created requests/request-1 "added specification"
litlog creating tasks/task-1
# update task-1 with plan including setting title, request, and status
litlog created tasks/task-1 "added plan step-1 to step-4"
git add sites
git commit -m "added request-1 spec and task-1 plan step-1 to step-4"
```
1. Follow [part-six](https://next.gatsbyjs.org/tutorial/part-six/) of the [Gatsby.js Tutorial] so <g-link to="/litlog/">litlog</g-link> pages can be listed. Structure *gatsby-node.js* more like [gatsby-starter-hero-blog](https://github.com/greglobinski/gatsby-starter-hero-blog) so other content types can be added later.
```bash
export LITLOG_SITE=site-1
diff package.json sites/site-1/files/package.json
litlog updating tasks/task1
npm install --save gatsby-transformer-remark
git apply << EOF
>--- a/sites/site-1/files/package.json
>+++ b/sites/site-1/files/package.json
>@@ -6,6 +6,7 @@
>   "dependencies": {
>     "gatsby": "next",
>     "gatsby-plugin-react-helmet": "next",
>+    "gatsby-transformer-remark": "^1.7.44",
>     "react": "^16.4.1",
>     "react-dom": "^16.4.1",
>     "react-helmet": "^5.2.0"
EOF
cp package-lock.json sites/$LITLOG_SITE/files/
litlog updated files/package.json "ran 'npm install --save gatsby-transformer-remark' (following [part-six](https://next.gatsbyjs.org/tutorial/part-six/) of the [Gatsby.js Tutorial])"
# commit these files because I'm going to run another npm install
git add sites
git commit -m "ran 'npm install --save gatsby-transformer-remark'"
npm install --save gatsby-source-filesystem
git apply << EOF
>--- a/sites/site-1/files/package.json
>+++ b/sites/site-1/files/package.json
>@@ -6,6 +6,7 @@
>   "dependencies": {
>     "gatsby": "next",
>     "gatsby-plugin-react-helmet": "next",
>+    "gatsby-source-filesystem": "^1.5.39",
>     "gatsby-transformer-remark": "^1.7.44",
>     "react": "^16.4.1",
>     "react-dom": "^16.4.1",
EOF
cp package-lock.json sites/$LITLOG_SITE/files/
litlog updated files/package.json "ran 'npm install --save gatsby-source-filesystem' (following [part-six](https://next.gatsbyjs.org/tutorial/part-six/) of the [Gatsby.js Tutorial])"
litlog updating files/gatsby-config.js
# update file
git apply << EOF
>--- a/sites/site-1/files/gatsby-config.js
>+++ a/sites/site-1/files/gatsby-config.js
>@@ -2,6 +2,16 @@ module.exports = {
>   siteMetadata: {
>     title: 'Gatsby Litlog Starter',
>   },
>-  plugins: ['gatsby-plugin-react-helmet'],
>+  plugins: [
>+    'gatsby-plugin-react-helmet',
>+      {
>+        resolve: 'gatsby-source-filesystem',
>+        options: {
>+          name: 'litlog',
>+          path: \`\${__dirname}/src/pages/litlog\`,
>+        },
>+      },
>+      'gatsby-transformer-remark',
>+  ],
>   pathPrefix: '/gatsby-starter-litlog'
> }
EOF
litlog updated files/gatsby-config.js "following [part-six](https://next.gatsbyjs.org/tutorial/part-six/) of the [Gatsby.js Tutorial]"
# restart dev server
npm run site-develop
```
Check out this query in [GraphiQL](http://localhost:8000/___graphql):
```graphql
{
  allMarkdownRemark(sort: {fields: [fileAbsolutePath] }) {
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
```
Create the index page for the <g-link to="/litlog/">litlog</g-link> folder folder. Right now it will just list the *fileAbsolutePath* of the markdown files and the *title* from the frontmatter.
```bash
litlog creating files/src/pages/litlog/index.js
# edit file and check out http://localhost:8000/litlog/
touch __blank
git apply << EOF
>--- a/__blank
>+++ b/sites/common/files/src/pages/litlog/index.js
>@@ -0,0 +1,47 @@
>+import React from 'react'
>+import Layout from '../../components/layout'
>+import { graphql } from 'gatsby'
>+
>+export default ({ data }) => {
>+  return (
>+    <Layout>
>+      <table>
>+        <thead>
>+          <tr>
>+            <th>fileAbsolutePath</th>
>+            <th>title</th>
>+          </tr>
>+        </thead>
>+        <tbody>
>+          {data.allMarkdownRemark.edges.map(({ node }, index) =>
>+            <tr key={index}>
>+              <td>
>+                {node.fileAbsolutePath}
>+              </td>
>+              <td>
>+                {node.frontmatter.title}
>+              </td>
>+            </tr>
>+          )}
>+        </tbody>
>+      </table>
>+    </Layout>
>+  );
>+};
>+
>+export const query = graphql\`
>+  {
>+    allMarkdownRemark(sort: { fields: [fileAbsolutePath] }) {
>+      totalCount
>+      edges {
>+        node {
>+          id
>+          fileAbsolutePath
>+          frontmatter {
>+            title
>+          }
>+        }
>+      }
>+    }
>+  }
>+\`;
EOF
rm __blank
cp sites/common/files/src/pages/litlog/index.js sites/site-1/files/src/pages/litlog/
litlog created files/src/pages/litlog/index.js "following [part-six](https://next.gatsbyjs.org/tutorial/part-six/) of the [Gatsby.js Tutorial], simplified to return fewer/different fields and use a table"
litlog updated tasks/task-1 "added task-1 plan step-5"
git add sites
git commit -m "added task-1 plan step-5"
```
1. Follow [part-seven](https://next.gatsbyjs.org/tutorial/part-seven/) of the [Gatsby.js Tutorial] and [gatsby-starter-hero-blog](https://github.com/greglobinski/gatsby-starter-hero-blog) so <g-link to="/litlog/">litlog</g-link> pages can be viewed. First create <g-link to="/litlog/files/gatsby-node.js">gatsby-node.js</g-link> *gatsby-node.js* except use *litlog-page.js* instead of *blog-post.js*. Then create <g-link to="/litlog/files/src/templates/litlog-page.js">litlog-page.js</g-link>. Modify <g-link to="/litlog/files/src/pages/litlog/index.js">the litlog index page</g-link> to add *import { Link } from "gatsby"*, replace *fileAbsolutePath* with *link*, *{node.fileAbsolutePath}* with *<Link to={node.fields.slug}>{node.fields.slug}</Link>*, and change the graphql to add the slug.
```bash
litlog updating tasks/task-1
litlog updating files/gatsby-node.js
# update file
git apply << EOF
>--- a/sites/site-1/files/gatsby-node.js
>+++ a/sites/site-1/files/gatsby-node.js
>@@ -4,4 +4,55 @@
>  * See: https://www.gatsbyjs.org/docs/node-apis/
>  */
> 
>-// You can delete this file if you're not using it
>+const path = require('path')
>+const { createFilePath } = require('gatsby-source-filesystem')
>+
>+exports.onCreateNode = ({ node, getNode, actions }) => {
>+  const { createNodeField } = actions
>+  if (node.internal.type === 'MarkdownRemark') {
>+    const slug = createFilePath({ node, getNode, basePath: 'pages' })
>+    createNodeField({
>+      node,
>+      name: 'slug',
>+      value: slug,
>+    })
>+  }
>+}
>+
>+exports.createPages = ({ graphql, actions }) => {
>+  const { createPage } = actions
>+  return new Promise((resolve, reject) => {
>+    const litlogPageTemplate = path.resolve('./src/templates/litlog-page.js');
>+    graphql(\`
>+      {
>+        allMarkdownRemark(
>+          filter: { fileAbsolutePath: { regex: "/src\/pages\/litlog/" } }
>+        ) {
>+          edges {
>+            node {
>+              fileAbsolutePath
>+              fields {
>+                slug
>+              }
>+            }
>+          }
>+        }
>+      }
>+    \`).then(result => {
>+      const items = result.data.allMarkdownRemark.edges;
>+      // Create litlog pages
>+      const litlogPages = items.filter(item => /src\/pages\/litlog/.test(item.node.fileAbsolutePath));
>+      litlogPages.forEach(({ node }) => {
>+        const slug = node.fields.slug;
>+        createPage({
>+          path: slug,
>+          component: litlogPageTemplate,
>+          context: {
>+            slug,
>+          },
>+        })
>+      })
>+      resolve()
>+    })
>+  })
>+}
EOF
litlog updated files/gatsby-node.js "following [part-seven](https://next.gatsbyjs.org/tutorial/part-seven/) of the [Gatsby.js Tutorial and [gatsby-starter-hero-blog](https://github.com/greglobinski/gatsby-starter-hero-blog), except using *litlog-page.js* instead of *blog-post.js*"
litlog creating files/src/templates/litlog-page.js
# create file
touch __blank
git apply << EOF
>--- a/__blank
>+++ b/sites/common/files/src/templates/litlog-page.js
>@@ -0,0 +1,26 @@
>+import React from "react"
>+import { graphql } from "gatsby"
>+import Layout from "../components/layout"
>+
>+export default ({ data }) => {
>+  const post = data.markdownRemark
>+  return (
>+    <Layout>
>+      <div>
>+        <h1>{post.frontmatter.title}</h1>
>+        <div dangerouslySetInnerHTML={{ __html: post.html }} />
>+      </div>
>+    </Layout>
>+  )
>+}
>+
>+export const query = graphql\`
>+  query(\$slug: String!) {
>+    markdownRemark(fields: { slug: { eq: \$slug } }) {
>+      html
>+      frontmatter {
>+        title
>+      }
>+    }
>+  }
>+\`
EOF
rm __blank
touch __blank
git apply << EOF
>--- a/__blank
>+++ b/sites/site-1/files/src/templates/litlog-page.js
>@@ -0,0 +1,26 @@
>+import React from "react"
>+import { graphql } from "gatsby"
>+import Layout from "../components/layout"
>+
>+export default ({ data }) => {
>+  const post = data.markdownRemark
>+  return (
>+    <Layout>
>+      <div>
>+        <h1>{post.frontmatter.title}</h1>
>+        <div dangerouslySetInnerHTML={{ __html: post.html }} />
>+      </div>
>+    </Layout>
>+  )
>+}
>+
>+export const query = graphql\`
>+  query(\$slug: String!) {
>+    markdownRemark(fields: { slug: { eq: \$slug } }) {
>+      html
>+      frontmatter {
>+        title
>+      }
>+    }
>+  }
>+\`
EOF
rm __blank
litlog created files/src/templates/litlog-page.js "following [part-seven](https://next.gatsbyjs.org/tutorial/part-seven/)"
# restart dev server
litlog updating files/src/pages/litlog/index.js
# edit file
git apply << EOF
>--- a/sites/common/files/src/pages/litlog/index.js
>+++ b/sites/common/files/src/pages/litlog/index.js
>@@ -1,6 +1,7 @@
> import React from 'react'
> import Layout from '../../components/layout'
> import { graphql } from 'gatsby'
>+import { Link } from 'gatsby'
> 
> export default ({ data }) => {
>   return (
>@@ -8,7 +9,7 @@ export default ({ data }) => {
>       <table>
>         <thead>
>           <tr>
>-            <th>fileAbsolutePath</th>
>+            <th>link</th>
>             <th>title</th>
>           </tr>
>         </thead>
>@@ -16,7 +17,7 @@ export default ({ data }) => {
>           {data.allMarkdownRemark.edges.map(({ node }, index) =>
>             <tr key={index}>
>               <td>
>-                {node.fileAbsolutePath}
>+                <Link to={node.fields.slug}>{node.fields.slug}</Link>
>               </td>
>               <td>
>                 {node.frontmatter.title}
>@@ -40,6 +41,9 @@ export const query = graphql\`
>           frontmatter {
>             title
>           }
>+          fields {
>+            slug
>+          }
>         }
>       }
>     }
EOF
git apply << EOF
>--- a/sites/site-1/files/src/pages/litlog/index.js
>+++ b/sites/site-1/files/src/pages/litlog/index.js
>@@ -1,6 +1,7 @@
> import React from 'react'
> import Layout from '../../components/layout'
> import { graphql } from 'gatsby'
>+import { Link } from 'gatsby'
> 
> export default ({ data }) => {
>   return (
>@@ -8,7 +9,7 @@ export default ({ data }) => {
>       <table>
>         <thead>
>           <tr>
>-            <th>fileAbsolutePath</th>
>+            <th>link</th>
>             <th>title</th>
>           </tr>
>         </thead>
>@@ -16,7 +17,7 @@ export default ({ data }) => {
>           {data.allMarkdownRemark.edges.map(({ node }, index) =>
>             <tr key={index}>
>               <td>
>-                {node.fileAbsolutePath}
>+                <Link to={node.fields.slug}>{node.fields.slug}</Link>
>               </td>
>               <td>
>                 {node.frontmatter.title}
>@@ -40,6 +41,9 @@ export const query = graphql\`
>           frontmatter {
>             title
>           }
>+          fields {
>+            slug
>+          }
>         }
>       }
>     }
EOF
litlog updated files/src/pages/litlog/index.js "following [part-seven](https://next.gatsbyjs.org/tutorial/part-seven/) of the [Gatsby.js Tutorial], modify to get the slug in the graphql query and use in a Link"
litlog updated tasks/task-1 "added plan step-6" 
git add .
git commit -m "added task-1 plan step-6"
```
1. Configure code and syntax highlighting with PrismJS by following [these instructions](https://next.gatsbyjs.org/packages/gatsby-remark-prismjs/)
    1. Install prismjs
```bash
litlog updating tasks/task-1
npm install --save gatsby-remark-prismjs prismjs
git apply << EOF
>--- a/sites/site-1/files/package.json
>+++ b/sites/site-1/files/package.json
>@@ -6,8 +6,10 @@
>   "dependencies": {
>     "gatsby": "next",
>     "gatsby-plugin-react-helmet": "next",
>+    "gatsby-remark-prismjs": "^2.0.5",
>     "gatsby-source-filesystem": "^1.5.39",
>     "gatsby-transformer-remark": "^1.7.44",
>+    "prismjs": "^1.15.0",
>     "react": "^16.4.1",
>     "react-dom": "^16.4.1",
>     "react-helmet": "^5.2.0"
EOF
cp package-lock.json sites/$LITLOG_SITE/files/
litlog updated files/package.json "ran 'npm install --save gatsby-remark-prismjs prismjs' following [these instructions](https://next.gatsbyjs.org/packages/gatsby-remark-prismjs/)"
```
   1. Update <g-link to="/litlog/files/gatsby-config.js">gatsby-config.js</g-link>
```bash
litlog updating files/gatsby-config.js
# update file
git apply << EOF
>--- a/sites/site-1/files/gatsby-config.js
>+++ b/sites/site-1/files/gatsby-config.js
>@@ -11,7 +11,12 @@ module.exports = {
>           path: \`\${__dirname}/src/pages/litlog\`,
>         },
>       },
>-      'gatsby-transformer-remark',
>+      {
>+        resolve: 'gatsby-transformer-remark',
>+        options: {
>+          plugins: ['gatsby-remark-prismjs']
>+        }
>+      },
>   ],
>   pathPrefix: '/gatsby-starter-litlog'
> }
EOF
litlog updated files/gatsby-config.js "following [these instructions](https://next.gatsbyjs.org/packages/gatsby-remark-prismjs/)"
# restart dev server
```
   1. Update <g-link to="/litlog/files/src/components/layout.js">components/layout.js</g-link>
```bash
litlog updating files/src/components/layout.js
# update file
git apply << EOF
>--- a/sites/site-1/files/src/components/layout.js
>+++ b/sites/site-1/files/src/components/layout.js
>@@ -4,6 +4,7 @@ import Helmet from 'react-helmet'
> import { StaticQuery, graphql } from 'gatsby'
>
> import Header from './header'
>+import "prismjs/themes/prism-okaidia.css"
> import './layout.css'
>
> const Layout = ({ children, data }) => (
EOF
litlog updated files/src/components/layout.js "following [these instructions](https://next.gatsbyjs.org/packages/gatsby-remark-prismjs/)"
```
   1. Check out this page. Does it look OK?
```bash
litlog updated tasks/task-1 "added plan step-7" 
git add .
git commit -m "added task-1 plan step-7"
```
1. Add more pages and posts types using [gatsby-starter-hero-blog](https://github.com/greglobinski/gatsby-starter-hero-blog) as a model.
```bash
export LITLOG_SITE=site-1
litlog updating tasks/task-1
git apply << EOF
>--- a/sites/site-1/files/gatsby-config.js
>+++ b/sites/site-1/files/gatsby-config.js
>@@ -11,6 +11,20 @@ module.exports = {
>           path: \`\${__dirname}/src/pages/litlog\`,
>         },
>       },
>+      {
>+        resolve: 'gatsby-source-filesystem',
>+        options: {
>+          name: 'pages',
>+          path: \`\${__dirname}/content/pages\`,
>+        },
>+      },
>+      {
>+        resolve: 'gatsby-source-filesystem',
>+        options: {
>+          name: 'posts',
>+          path: \`\${__dirname}/content/posts\`,
>+        },
>+      },
>       {
>         resolve: 'gatsby-transformer-remark',
>         options: {
EOF
litlog updated files/gatsby-config.js
git apply << EOF
>--- a/sites/site-1/files/gatsby-node.js
>+++ b/sites/site-1/files/gatsby-node.js
>@@ -23,10 +23,12 @@ exports.createPages = ({ graphql, actions }) => {
>   const { createPage } = actions
>   return new Promise((resolve, reject) => {
>     const litlogPageTemplate = path.resolve('./src/templates/litlog-page.js');
>+    const contentPageTemplate = path.resolve(\`./src/templates/content-page.js\`);
>+    const contentPostTemplate = path.resolve(\`./src/templates/content-post.js\`);
>     graphql(\`
>       {
>         allMarkdownRemark(
>-          filter: { fileAbsolutePath: { regex: "/src\/pages\/litlog/" } }
>+          filter: { fileAbsolutePath: { regex: "/content\/pages/|content\/posts/|src\/pages\/litlog/" } >}
>         ) {
>           edges {
>             node {
>@@ -52,6 +54,33 @@ exports.createPages = ({ graphql, actions }) => {
>           },
>         })
>       })
>+
>+      // Create content pages
>+      const contentPages = items.filter(item => /content\/pages/.test(item.node.fileAbsolutePath));
>+      contentPages.forEach(({ node }) => {
>+        const slug = node.fields.slug;
>+        createPage({
>+          path: slug,
>+          component: contentPageTemplate,
>+          context: {
>+            slug,
>+          },
>+        })
>+      })
>+
>+      // Create content posts
>+      const contentPosts = items.filter(item => /content\/posts/.test(item.node.fileAbsolutePath));
>+      contentPosts.forEach(({ node }) => {
>+        const slug = node.fields.slug;
>+        createPage({
>+          path: slug,
>+          component: contentPostTemplate,
>+          context: {
>+            slug,
>+          },
>+        })
>+      })
>+
>       resolve()
>     })
>   })
EOF
cp sites/common/files/src/templates/litlog-page.js sites/common/files/src/templates/content-page.js
cp sites/common/files/src/templates/litlog-page.js sites/common/files/src/templates/content-post.js
cp sites/common/files/src/templates/litlog-page.js sites/$LITLOG_SITE/files/src/templates/content-page.js
cp sites/common/files/src/templates/litlog-page.js sites/$LITLOG_SITE/files/src/templates/content-post.js
litlog created files/src/templates/content-page.js "copied from litlog-page.js"
litlog created files/src/templates/content-post.js "copied from litlog-page.js"
litlog updated tasks/task-1 "added plan step-8"
git add .
git commit -m "added task-1 plan step-8"
```
1. Follow [Managing Content with Netlify CMS](https://www.gatsbyjs.org/docs/netlify-cms/) to setup site with content management using [Netlify CMS](https://github.com/netlify/netlify-cms).
    1. Configure Gatsby
```bash
export LITLOG_SITE=site-1
litlog updating tasks/task-1
npm install --save netlify-cms gatsby-plugin-netlify-cms
git apply << EOF
>--- a/sites/site-1/files/package.json
>+++ b/sites/site-1/files/package.json
>@@ -5,10 +5,12 @@
>   "author": "Carl W. Hunt <cwhunt@litlog.io>",
>   "dependencies": {
>     "gatsby": "next",
>+    "gatsby-plugin-netlify-cms": "^2.0.1",
>     "gatsby-plugin-react-helmet": "next",
>     "gatsby-remark-prismjs": "^2.0.5",
>     "gatsby-source-filesystem": "^1.5.39",
>     "gatsby-transformer-remark": "^1.7.44",
>+    "netlify-cms": "^2.0.8",
>     "prismjs": "^1.15.0",
>     "react": "^16.4.1",
>     "react-dom": "^16.4.1",
EOF
cp package-lock.json sites/$LITLOG_SITE/files/
litlog updated files/package.json "ran 'npm install --save netlify-cms gatsby-plugin-netlify-cms' following [Managing Content with Netlify CMS](https://www.gatsbyjs.org/docs/netlify-cms/)"
litlog updating files/gatsby-config.js
git apply << EOF
>--- a/sites/site-1/files/gatsby-config.js
>+++ b/sites/site-1/files/gatsby-config.js
>@@ -3,6 +3,7 @@ module.exports = {
>     title: 'Gatsby Litlog Starter',
>   },
>   plugins: [
>+    'gatsby-plugin-netlify-cms',
>     'gatsby-plugin-react-helmet',
>       {
>         resolve: 'gatsby-source-filesystem',
EOF
litlog updated files/gatsby-config.js "following [Managing Content with Netlify CMS](https://www.gatsbyjs.org/docs/netlify-cms/)"
litlog creating files/static/admin/config.yml
touch __blank
git apply << EOF
>--- a/__blank
>+++ b/sites/site-1/files/src/static/admin/config.yml
>@@ -0,0 +1,26 @@
>+backend:
>+  name: git-gateway
>+  repo: litlog/gatsby-starter-litlog
>+
>+media_folder: static/assets
>+public_folder: assets
>+
>+collections:
>+  - name: pages
>+    label: Pages
>+    folder: content/pages
>+    create: true
>+    fields:
>+      - { name: path, label: Path }
>+      - { name: date, label: Date, widget: date }
>+      - { name: title, label: Title }
>+      - { name: body, label: Body, widget: markdown }
>+  - name: posts
>+    label: Posts
>+    folder: content/posts
>+    create: true
>+    fields:
>+      - { name: path, label: Path }
>+      - { name: date, label: Date, widget: date }
>+      - { name: title, label: Title }
>+      - { name: body, label: Body, widget: markdown }
EOF
rm __blank
litlog created files/static/admin/config.yml "following [Managing Content with Netlify CMS](https://www.gatsbyjs.org/docs/netlify-cms/)"
litlog updated tasks/task-1 "added plan step-9"
git add .
git commit -m "added task-1 plan step-9"
```
    1. Configure Netlify
        * Set build command as `cp sites/$LITLOG_SITE/files/package* . && npm install && npm run build`.
        * Set environment variable LITLOG_SITE.
        * Enable Identify on Site Settings
           * Invite Only Registration
           * Github External Provider (default configuration)
        * Identity tab
           * Invite users
1. Follow [custom-components](https://using-remark.gatsbyjs.org/custom-components/) to set up using custom components in markdown and check out <g-link to="/litlog/tasks/task-1">this page</g-link> when done.
```bash
export LITLOG_SITE=site-1
litlog updating tasks/task-1
```
   1. Install *rehype-react* as a dependency
```bash
npm install --save rehype-react
git apply << EOF
>--- a/sites/site-1/files/package.json
>+++ b/sites/site-1/files/package.json
>@@ -14,7 +14,8 @@
>     "prismjs": "^1.15.0",
>     "react": "^16.4.1",
>     "react-dom": "^16.4.1",
>-    "react-helmet": "^5.2.0"
>+    "react-helmet": "^5.2.0",
>+    "rehype-react": "^3.0.3"
>   },
>   "keywords": [
>     "gatsby"
EOF
cp package-lock.json sites/$LITLOG_SITE/files/
litlog updated files/package.json "ran 'npm install --save rehype-react' following [custom-components](https://using-remark.gatsbyjs.org/custom-components/)"
litlog updating files/src/templates/litlog-page.js
```   
   1. Import *rehype-react* and *Gatsby Link* to <g-link to="/files/src/templates/litlog-page.js">litlog-page.js</g-link>. Create a render function with references to *Gatsby Link*. Render the content using htmlAst instead of html. Change html to htmlAst in the graphql query.
```bash
git apply << EOF
>--- a/sites/common/files/src/templates/litlog-page.js
>+++ b/sites/common/files/src/templates/litlog-page.js
>@@ -1,14 +1,24 @@
> import React from "react"
>-import { graphql } from "gatsby"
>+import { graphql, Link } from "gatsby"
>+import rehypeReact from "rehype-react"
>+
> import Layout from "../components/layout"
>
> export default ({ data }) => {
>   const post = data.markdownRemark
>+  const renderAst = new rehypeReact({
>+    createElement: React.createElement,
>+    components: {
>+      "g-link": Link
>+    },
>+  }).Compiler;
>   return (
>     <Layout>
>       <div>
>         <h1>{post.frontmatter.title}</h1>
>-        <div dangerouslySetInnerHTML={{ __html: post.html }} />
>+        {
>+          renderAst(post.htmlAst)
>+        }
>       </div>
>     </Layout>
>   )
>@@ -16,8 +26,8 @@ export default ({ data }) => {
>
> export const query = graphql\`
>   query(\$slug: String!) {
>-    markdownRemark(fields: { slug: { eq:  \$slug } }) {
>-      html
>+    markdownRemark(fields: { slug: { eq: \$slug } }) {
>+      htmlAst
>       frontmatter {
>         title
>       }
EOF
cp sites/common/files/src/templates/litlog-page.js sites/common/files/src/templates/content-page.js
cp sites/common/files/src/templates/litlog-page.js sites/common/files/src/templates/content-post.js
cp sites/common/files/src/templates/litlog-page.js sites/$LITLOG_SITE/files/src/templates/litlog-page.js
cp sites/common/files/src/templates/litlog-page.js sites/$LITLOG_SITE/files/src/templates/content-page.js
cp sites/common/files/src/templates/litlog-page.js sites/$LITLOG_SITE/files/src/templates/content-post.js
litlog updated files/src/templates/litlog-page.js "followed [custom-components](https://using-remark.gatsbyjs.org/custom-components/) to set up using custom components in markdown"
litlog updated files/src/templates/content-page.js "copied from litlog-page.js"
litlog updated files/src/templates/content-post.js "copied from litlog-page.js"
# fix path of litlog pages
litlog updating files/gatsby-node.js
git apply << EOF
>--- a/sites/site-1/files/gatsby-node.js
>+++ b/sites/site-1/files/gatsby-node.js
>@@ -11,11 +11,19 @@ exports.onCreateNode = ({ node, getNode, actions }) => {
>   const { createNodeField } = actions
>   if (node.internal.type === 'MarkdownRemark') {
>     const slug = createFilePath({ node, getNode, basePath: 'pages' })
>-    createNodeField({
>-      node,
>-      name: 'slug',
>-      value: slug,
>-    })
>+    if (/src\/pages\/litlog/.test(node.fileAbsolutePath)) {
>+      createNodeField({
>+        node,
>+        name: 'slug',
>+        value: \`/litlog\${slug}\`,
>+      })
>+    } else {
>+      createNodeField({
>+        node,
>+        name: 'slug',
>+        value: slug,
>+      })
>+    }
>   }
> }
>
EOF
litlog updated files/gatsby-node.js "fixed path of litlog pages"
litlog updated tasks/task-1 "added plan step-10"
git add .
git commit -m "added task-1 plan step-10"
```
