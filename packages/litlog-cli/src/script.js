module.exports.run = (verb, slug, comment, timestamp) => {
  const { execSync } = require('child_process');
  
  const isTrackedInGit = (file) => {
    const gitLsFiles = `git ls-files ${file}`;
    // console.log(gitLsFiles);
    const gitLsFilesOut = execSync(gitLsFiles);
    if (gitLsFilesOut.toString() == "") {
      return false;
    } else {
      return true;
    }
  };

  const site = process.env.LITLOG_SITE;
  if (site === undefined) {
    console.log("please set LITLOG_SITE");
  } else {
    const fs = require("fs-extra");
    
    const now = new Date();
    const today = now.toISOString().substring(0, 10);
    if (timestamp === undefined) {
      timestamp = now.toISOString().substring(0, 16).replace(":", "");
    }
    let slug_remainder = slug;
    let file = "";
    let change_file = "";
    let type = slug;
    let change_title = "";
    let change_status = "";
    let change = "";
    let content = "";
    if (comment === undefined) {
      comment = "";
    }

    if (verb === "created") {
      change_title = 'Create';
      change_status = 'created';
    } else if (verb === "creating") {
      change_title = 'Create';
      change_status = 'creating';
    } else if (verb === "updated") {
      change_title = 'Update';
      change_status = 'updated';
    } else if (verb === "updating") {
      change_title = 'Update';
      change_status = 'updating';
    }

    let matches = slug.match(/^([^/]+)\//);
    if (matches && !slug.match(/index\.md$/)) {
      type = matches[1];
      slug_remainder = slug.replace(new RegExp(`^${type}`), "");
      if (type === "files") {
        slug = slug.replace(/$/, ".file");
        if (slug.match(/^files\/src\/pages\/litlog/) || 
          slug.match(/^files\/src\/components\/litlog/) ||
          slug.match(/^files\/src\/templates\/litlog/)
        ) {
          file = `.${slug_remainder}`;
          // change_file = `src/pages/litlog/changes/${slug}/${timestamp}.md`;
          change_file = `sites/common/files/src/pages/litlog/changes/${slug}/${timestamp}.md`;
        } else {
          file = `./sites/${site}/${type}${slug_remainder}`;
          // change_file = `src/pages/litlog/sites/${site}/changes/${slug}/${timestamp}.md`;
          change_file = `sites/${site}/files/src/pages/litlog/changes/${slug}/${timestamp}.md`;
        }
      } else {
        // file = `./src/pages/litlog/sites/${site}/${type}${slug_remainder}`;
        file = `./sites/${site}/files/src/pages/litlog/${type}${slug_remainder}`;
        // change_file = `src/pages/litlog/sites/${site}/changes/${slug}/${timestamp}.md`;
        change_file = `sites/${site}/files/src/pages/litlog/changes/${slug}/${timestamp}.md`;
      }
      if (type !== "files" && !slug.match(/\.md$/)) {
        file = file.replace(/$/, ".md");
      }
    } 

    console.log(`creating new change ${change_file}`);

    change = `---
title: "${change_title}"
status: "${change_status}"
---
${comment}
`  

    if (verb.match(/ed$/)) {
      console.log(`adding git diff of ${file} to change ${change_file}`);
      change = `${change}\`\`\`diff`;
      if (verb === "updated" && isTrackedInGit(file)) {
        const gitDiff = `git diff ${file} | tail -n +3`;
        console.log("git apply << EOF");
        const gitDiffOut = execSync(gitDiff);
        const gitDiffOutStr = gitDiffOut.toString();
        console.log(`${gitDiffOutStr}EOF`);
        let lines = gitDiffOutStr.split('\n');
        lines.shift();
        lines.shift();
        change = `${change}
${lines.join('\n')}`;
      } else {
        console.log(`${file} is untracked`);
        const blank_file = "__blank";
        if (fs.existsSync(blank_file)) {
          console.log(`${blank_file} exists. Please fix.`);
        } else {
          try{
            fs.outputFileSync(blank_file, "");
          }catch (e){
            console.log("Cannot write file ", e);
          }
          const gitDiff = `git diff --no-index ${blank_file} ${file} | tail -n +3`;
          console.log("touch __blank");
          console.log("git apply << EOF");
          const gitDiffOut = execSync(gitDiff);
          const gitDiffOutStr = gitDiffOut.toString();
          console.log(`${gitDiffOutStr}EOF`);
          console.log("rm __blank");
          let lines = gitDiffOutStr.split('\n');
          lines.shift();
          lines.shift();
          change = `${change}
${lines.join('\n')}`;
          if (fs.existsSync(blank_file)) {
            fs.unlinkSync(blank_file);
          }            

        }
      }
      change = `${change}\`\`\``;
    } else if (verb === "creating" && slug.match(/^tasks\/task-/)) {
      content = `---
title: ""
date: "${today}"
request: ""
status: "not-started"
---
## Plan
`              
    } else if (verb === "creating" && slug.match(/^requests\/request-/)) {
      content = `---
title: ""
date: "${today}"
status: "open"
---
## Specification
`              
    }
    if (change_file !== "") {
      try {
        fs.outputFileSync(change_file, change);
      } catch (e){
        console.log("Cannot write file ", e);
      }
    }
    if (verb === "creating" && file !== "") {
      try {
        fs.outputFileSync(file, content);
      } catch (e){
        console.log("Cannot write file ", e);
      }
    }
  
    // console.log("site", site);
    // console.log("verb", verb);
    // console.log("slug", slug);
    // console.log("slug_remainder", slug_remainder);
    // console.log("file", file);
    // console.log("comment", comment);
    // console.log("timestamp", timestamp);
    // console.log("today", today);
  }
};
