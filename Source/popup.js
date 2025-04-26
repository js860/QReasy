// 切换到“生成二维码”区
document.getElementById('tab-generate').addEventListener('click', () => {
    document.getElementById('generator').style.display = 'block';
    document.getElementById('decoder').style.display = 'none';
  });
  
  // 切换到“解码二维码”区
  document.getElementById('tab-decode').addEventListener('click', () => {
    document.getElementById('generator').style.display = 'none';
    document.getElementById('decoder').style.display = 'block';
  });
  
  // 生成二维码
  document.getElementById('generate-btn').addEventListener('click', () => {
    const text = document.getElementById('text-input').value.trim();
    const qrcodeContainer = document.getElementById('qrcode');
    qrcodeContainer.innerHTML = '';  // 清空上一二维码
    if (text) {
      // 使用 qrcode.js 库生成二维码&#8203;:contentReference[oaicite:3]{index=3}
      new QRCode(qrcodeContainer, text);
    }
  });
  
  // 解码二维码
  document.getElementById('file-input').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const resultEl = document.getElementById('decoded-result');
    resultEl.textContent = '';
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = function() {
      const img = new Image();
      img.onload = function() {
        // 将图像绘制到画布上，获取像素数据
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
        // 使用 jsQR 库解析二维码&#8203;:contentReference[oaicite:4]{index=4}
        const code = jsQR(imageData.data, canvas.width, canvas.height);
        if (code) {
          resultEl.textContent = code.data;
        } else {
          resultEl.textContent = '未识别到有效二维码';
        }
      };
      // 触发图像加载，并使用 FileReader 将文件转为 DataURL&#8203;:contentReference[oaicite:5]{index=5}
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
  