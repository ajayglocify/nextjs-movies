import fs from "fs/promises";
import path from "path";
 
export default async function uploadFile(file,dir='uploads'){
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const filePath = path.join(process.cwd(),'public',dir, file.name);
  await fs.writeFile(filePath, buffer);
  return `/${dir}/${file.name}`;
}
 
 