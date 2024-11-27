import express from 'express'
import multer from 'multer'
import path from 'path'
import * as fs from 'fs'
import axios from 'axios'

const app = express();

// 定义一个简单的路由
app.get('/', (req, res) => {
  console.log("requer /, ", __dirname)
  res.send('This server runing!8');
  // res.sendFile(__dirname + '/template/index.html');
});

const BACKUP_SERVER_URL = 'http://<另一台服务器的地址>:<端口>'; // 另一个服务器的地址

// 设置上传路径
const upload = multer({ dest: 'uploads/' });

// 文件上传 API
app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).send('No file uploaded.');
    return
  }

  const destPath = path.join(__dirname, 'uploads', file.originalname);
  fs.renameSync(file.path, destPath);

  // 备份到另一台服务器
  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(destPath));

    await axios.post(`${BACKUP_SERVER_URL}/upload`, formData, {
      headers: formData.getHeaders(),
    });
    console.log(`File ${file.originalname} backed up to ${BACKUP_SERVER_URL}`);
  } catch (error) {
    console.error(`Backup to ${BACKUP_SERVER_URL} failed:`, error.message);
  }

  res.send('File uploaded and backed up.');
});

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
  
})

export default app
