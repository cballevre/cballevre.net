---
title: "Make my own blog"
draft: true
createdAt: 2022-07-24
updatedAt: 2022-09-07
---

Philosophie :
- Se concentrer sur le contenu 

Cahier des charges de mon blog : 
- Techno : NextJS, Typescript, TailwindCSS, Markdown

Structure :
- Homepage 
- Blog
	- {slug} --> page de blog 

### Nextjs to github pages 

Expliquer en général github actions 

.nojekills pour que github qu'il n'ignore pas _next 

penser au variable d'environnement pour le routeur :
- basePath

et pour les image :
- assetPrefix

Pour les variables d'environnement, il suffit d'utiliser NEXT_PUBLIC_ comme cela on les retrouve dans process.env automatiquement
