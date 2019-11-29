cd docs
mkdir docs docs/master docs/1.0.0
git clone https://github.com/tomhrtly/flexCarousel.js-docs.git --depth 1
cd flexCarousel.js-docs
git fetch --all
rm README.md
cd ../
cp flexCarousel.js-docs/* docs/master
cd flexCarousel.js-docs
git checkout 1.0.0
cd ../
cp flexCarousel.js-docs/* docs/1.0.0
rm -rf flexCarousel.js-docs
cd ../
npm run docs:build
