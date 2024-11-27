import express from 'express'
import multer from 'multer'
import path from 'path'
import * as fs from 'fs'
import axios from 'axios'
import https from 'https';

const app = express();

// 定义一个简单的路由
app.get('/', (req, res) => {
  console.log("requer /, ", __dirname)
  res.send('This server runing!8');
  // res.sendFile(__dirname + '/template/index.html');
});

const BACKUP_SERVER_URL = 'http://<另一台服务器的地址>:<端口>'; // 另一个服务器的地址

// 文件下载 API
app.get('/files/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  if (!fs.existsSync(filePath)) {
    res.status(404).send('File not found.');
    return
  }
  res.download(filePath);
});

app.get('/sync', async (req, res) => {
  const url: string = 'https://api.example.com/data';
  const resp = https.get(url)
  const data = await resp.json()
})

export default app
