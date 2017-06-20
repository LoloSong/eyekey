function EyeKey(options){
	this.options = {
		appID: options.appID || '',
		appKey: options.appKey || ''
	}
	if(options.appID == '' || !options.appID){
		console.error('No arguments appID');
	}
	if(options.appKey == ''){
		console.error('No arguments appKey');
	}
}

EyeKey.prototype = {
	constructor : EyeKey,

	faceID: function(type,file){
		var aid = this.options.appID;
		var akey = this.options.appKey;
		var param = {
			'app_id': aid,
            'app_key': akey
		}
		var result;
		if(type == 'url'){
			param.url = file;
		}
		if(type == 'img'){
			param.img = file;
		}
		if(type == 'file'){
			param.File = file;
		}
		jQuery.ajax({
			type: 'POST',
			url: 'http://api.eyekey.com/face/Check/checking',
			data: param,
			contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            async: false,
            success: function (data) {
            	//响应成功200
            	if(data.res_code == '0000'){
            		result = data.face[0].face_id
            	}
            	//未检测到人脸
            	if(data.res_code == '1067'){
            		result = data.message
            	}
            	//图片文件超出最大限制范围
            	if(data.res_code == '1012'){
            		result = data.message
            	}
            },
            error: function (res) {
            	result = JSON.stringify(res);
            }
		});
		return result;
	},

	compare: function(faceID1,faceID2){
		var aid = this.options.appID;
		var akey = this.options.appKey;
		var param = {
			'app_id': aid,
            'app_key': akey,
            'face_id1': faceID1,
            'face_id2': faceID2
		}
		var result;
		jQuery.ajax({
            url: "http://api.eyekey.com/face/Match/match_compare",
            type: 'GET',
            dataType: 'json',
            data: param,
            async: false,
            success: function (data) {
                result = Math.round(data.similarity * 100) / 100;
            },
            error: function (res) {
                result = JSON.stringify(res);
            }
        })
        return result;
	}
}
