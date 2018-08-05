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
