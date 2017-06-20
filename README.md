# 人脸相似度对比插件

eyekey官网http://www.eyekey.com/index.html

clone项目地址
git clone 


一.官网注册得appID,appKey
二.下载插件引入,依赖jquery
三.EyeKey对象
	1.创建EyeKey对象的语法：
	<pre>
		new EyeKey({
			appID: '',
        	appKey: ''
		});
	</pre>

	2.EyeKey对象方法
		faceID(type,file): 用于获取图片的faceID
			type和file分别为传输图片方式和路径，有三种传输方式
				'url':'http://...'
				'img': base64
				'file': file

		compare(faceID1,faceID2): 将2张faceID作相似度对比

四.demo
<pre>
	var eye = new EyeKey({
			appID: '',
        	appKey: ''
		});

	//获得第一张图片faceID
	var a = eye.faceID('url','http://api.touchworld-sh.com:8000/face/face_1.png');

	//获得第二张图片faceID
	var b = eye.faceID('url','http://api.touchworld-sh.com:8000/face/face_2.png');

	//传入2张图片的faceID比较得到相似度百分比
	var c = eye.compare(a,b);
	document.write('相似度'+ c + '%');

</pre>
