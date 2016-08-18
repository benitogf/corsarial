set CORSA_BUILD_CD=%CD%\platforms\nw\win
set CORSA_PLATFORM_CD=%CD%\platforms\browser\www
rem Build: %CORSA_BUILD_CD%
rem Platform: %CORSA_PLATFORM_CD%
rem NW: %NW_HOME%
rem copy package.json to browser platform
copy %CD%\package.json %CORSA_PLATFORM_CD%
7z.exe a -tzip %CORSA_BUILD_CD%\com.nw %CORSA_PLATFORM_CD%\* -mx0 & rem zip files
rem delete package.json from browser platform
del %CORSA_PLATFORM_CD%\package.json
rem compilation to executable form
copy /b "%NW_HOME%\nw.exe"+%CORSA_BUILD_CD%\com.nw %NW_HOME%\corsarial.exe
copy /b "%NW_HOME%\nw.exe"+%CORSA_BUILD_CD%\com.nw %CORSA_BUILD_CD%\corsarial.exe
rem build done
