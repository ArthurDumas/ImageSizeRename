# ImageSizeRename
Simple little Node.js tool to rename image files so filename ends with dimensions like "-200x100".

Useful when exporting out of Adobe Illustrator using height or width mode where you don't automatically get suffixes.

Recursively process folderpath specified by rootFolder looking for image files and if the filename
doesn't end in "-MxN" where M and N are 1 or more digits then rename the file.

Should probably make the starting folder a command line parameter but all my exports go to the same folder so it works for me.

1. NPM INSTALL
2. Update rootFolder in index.js
3. NODE index.js
