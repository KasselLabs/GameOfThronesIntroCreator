sed -i -e "s/export const TIME_FACTOR = .*;/export const TIME_FACTOR = $1;/g" src/js/api/config.js
sed -i -e "s/\$TIME_FACTOR = .*;/\$TIME_FACTOR = $1;/g" src/styles/animations.styl
# git apply ./renderer.patch
