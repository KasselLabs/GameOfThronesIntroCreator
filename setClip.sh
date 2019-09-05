sed -i -e "s/export const VIDEO_START_AT = .*;/export const VIDEO_START_AT = $1;/g" src/js/api/config.js
sed -i -e "s/export const VIDEO_END_AT = .*;/export const VIDEO_END_AT = $2;/g" src/js/api/config.js
sed -i -e "s/\$VIDEO_START_AT = .*;/\$VIDEO_START_AT = $1;/g" src/styles/animations.styl