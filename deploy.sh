# deploy.sh
#!/usr/bin/env sh

# Use `chmod +x deploy.sh` to allow executing deploy.sh
# abort on errors
set -e

# Set your GitHub UserName and Repo
repo="InactiveGroupUsersVK"
user="danil-kuk"

# build
echo Building. This may take a minute...
export PUBLIC_URL="/${repo}/"
npm run build -- --public-url $PUBLIC_URL

# copy additional files into the build output directory
echo Copying additional files...
cp src/assets/404.html dist

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

# Creating new git repository for deploy
now=$(date +"%d-%m-%Y %H:%M")
echo Deploying...
rm -rf .git
git init
git add -A
git commit -m "Deploy ${now}"

# Pushing to gh-pages
echo Pushing to GitHub Pages...
git push -f https://github.com/${user}/${repo}.git master:gh-pages

# Removing output build folder and cache
echo Removing build folder...
cd -
rm -rf dist
rm -rf .cache