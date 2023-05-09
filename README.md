# Routes List
## A faire Clément
- Linter - npm init @eslint/config (automatisé a chaque commit)
- Prettier (automatisé a chaque commit)
- babel build 
- Image docker 
- Déployement

## A faire
- lister les routes finales
- structure bdd
- conversion bdd mango
- finir api

## /api/profile
get     /:id    
get     /localisation/:id   
get     /recherche/:id
get     /interet/:id
get     /question/:id



//routes de modifications

post    /:id
post    /localisation/:id
post    /recherche/:id
post    /interet/:id
post    /question/:i

## /api/auth
post    /signup
post    /signin

## /api/interet

get     /

## /api/question

get     /

## /api/match

get     /:id
post    /:id

## /api/contactRoutes

get     /:id
get     /list/:id


## /api/chat
rot     /


## /api/user

get     /
post    /
get     /:id
put     /:id
delete  /:id

docker build -t peelapi .
docker run -p 3001:3001 peelapi 

docker tag peelapi damiendrz/peel_api:latest  
ocker push damiendrz/peel_api:latest

docker pull damiendrz/peel_api:latest
docker run -d -p 3001:3001 damiendrz/peel_api:latest

