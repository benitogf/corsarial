#zip all files to nw archive
cp package.json ./platforms/browser/www/
cd platforms/browser/www/
zip -r ../../../com.nw ./*
cd ../../../
rm ./platforms/browser/www/package.json
#compilation to executable form
cat /opt/node-webkit/nw ./com.nw > ./platforms/nw/linux64/corsa && chmod +x ./platforms/nw/linux64/corsarial
#remove corsa.nw
rm com.nw
cp /opt/node-webkit/nwjc ./platforms/nw/linux64/
cp /opt/node-webkit/nw.pak ./platforms/nw/linux64/
cp /opt/node-webkit/icudtl.dat ./platforms/nw/linux64/
cp /opt/node-webkit/libffmpegsumo.so ./platforms/nw/linux64/
#run application
#../build/linux/my-app
