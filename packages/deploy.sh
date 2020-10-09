#!/bin/bash
cd assetdash-blog
yarn build
cd ../assetdash-ui
yarn build
#rm -rf ../assetdash-blog/public/react
mv dist ../assetdash-blog/public/react
cd ../assetdash-blog
cp ../_redirects public/
