import path from 'node:path'
import fs from 'node:fs';

export const copyFile = (from, to) => {
  const sourceFile = fs.readdirSync(from, { withFileTypes: true});
  for (const file of sourceFile){
    const srcFile = path.resolve(from, file.name);
    const tagFile = path.resolve(to, file.name);
    
    if(file.isDirectory()) {
      if(!fs.existsSync(tagFile)){
        // 创建目的文件夹
        fs.mkdirSync(tagFile, err => console.log(err));
      }

      copyFile(srcFile, tagFile);
    }else {
      fs.copyFileSync(srcFile, tagFile, fs.constants.COPYFILE_FICLONE);
    }
  }
}