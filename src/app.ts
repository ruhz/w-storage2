import express from 'express'
import path from 'path'
import { net } from './net'

const backupFileName = path.join(process.cwd(), 'fund-server.onrender.zip')
const app = express();

// 定义一个简单的路由
app.get('/', (req, res) => {
  console.log("requer /, ", __dirname)
  res.send('This server runing!8');
  // res.sendFile(__dirname + '/template/index.html');
});

const BACKUP_SERVER_URL = 'http://<另一台服务器的地址>:<端口>'; // 另一个服务器的地址

// 文件下载 API
app.get('/backupfile', (req, res) => {
  res.download(backupFileName);
});

app.get('/backup/sync', async (req, res) => {
  const surl = 'https://fund-server.onrender.com/tool/down/info'
  if (await net.wget<string>(surl) == 'replace') {
    res.send('no')
    return
  }
  const downloadUrl = 'https://fund-server.onrender.com/tool/download'
  net.downloadFile(downloadUrl, backupFileName)
    .then(() => res.send('OK'))
    .catch(() => res.send('Error'))
})

export default app
