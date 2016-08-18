#zip all files to nw archive
cp package.json ./platforms/browser/www/
cd platforms/browser/www/
zip -r ../../../com.nw ./*
cd ../../../
rm ./platforms/browser/www/package.json
cat /opt/node-webkit/nw ./com.nw > ./platforms/nw/linux/corsarial && chmod +x ./platforms/nw/linux/corsarial
#remove com.nw
rm com.nw
