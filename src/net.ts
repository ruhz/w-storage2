import axios from 'axios'
import fs from 'fs'
import { resolve } from 'path'

export namespace net {
  export function wget<T>(surl: string): Promise<T> {
    return new Promise<T>((resolve, rejects) => {
      axios.get<T>(surl)
        .then((r: { data: T | PromiseLike<T> }) => resolve(r.data))
        .catch((r: any) => rejects(r))
    })
  }

  export function downloadFile(surl: string, filepath: string): Promise<void> {
    return new Promise<void>(async (resolve, rejects) => {
      try {
        // 发送 HTTP GET 请求下载文件
        const response = await axios({ method: 'get', url: surl, responseType: 'stream' });
        // 创建一个写入流将文件保存到本地
        const writer = fs.createWriteStream(filepath);
        response.data.pipe(writer);
        writer.on('finish', () => {
          resolve();
        });
        writer.on('error', (err) => {
          console.error('Error writing file:', err);
          rejects('error downloading file.');
        });
      } catch (err) {
        console.error('Error downloading file:', err);
        rejects('error downloading file.');
      }
    })
  }
}
