package com.springdemo.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.springdemo.pojo.Data;
import com.springdemo.utils.MyHttpUrlConnection;

import java.util.Arrays;

import org.bouncycastle.jce.provider.BouncyCastleProvider;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.AlgorithmParameters;

import java.security.Security;

@Controller
@RequestMapping("/demo")
public class DemoController {
	@Autowired
	MyHttpUrlConnection connection;

	@RequestMapping(value = "/index", method = RequestMethod.GET)
	@ResponseBody  
    public String index(Data data){
        
        String jsCode=data.getCode();
        String appid="wxdXXXXXXX";
        String secret="aXXXXXXXXX";
        String url = "https://api.weixin.qq.com/sns/jscode2session?appid="+appid+"&secret="+secret+"&js_code="
				+ jsCode + "&grant_type=authorization_code";
        System.out.println(url);
        
		String res[] = connection.requestJson(url);
		
		System.out.println(res[0]);
		
		JSONObject object = JSON.parseObject(res[0]);
		String openId = object.getString("openid");
		String session_key = object.getString("session_key");
        
        System.out.println("getOpenid:::::::::"+data.getOpenid());
        System.out.println("getSession_key:::::::::"+data.getSession_key());
       
        Object object1=getPhoneNumber(data.getEncryptedData(),session_key,data.getIv());
        if (object1==null) {
			System.err.println("NULL");
		}else {
			System.err.println(object1);
			JSONObject phoneNumObj = JSON.parseObject(object1.toString());
			String phoneNumber = phoneNumObj.getString("phoneNumber");
			System.err.println(phoneNumber);
			return phoneNumber;
		}
      
        return "11011011011";
    }
	
	public Object getPhoneNumber(String encryptedData, String Session_key, String iv) {
		String session_key = "";
		if (Session_key != null) {
			session_key = Session_key;
			 // 被加密的数据
            byte[] dataByte = Base64.decode(encryptedData);
            // 加密秘钥
            byte[] keyByte = Base64.decode(session_key);
            // 偏移量
            byte[] ivByte = Base64.decode(iv);
            try {
                // 如果密钥不足16位，那么就补足.  这个if 中的内容很重要
                int base = 16;
                if (keyByte.length % base != 0) {
                    int groups = keyByte.length / base + (keyByte.length % base != 0 ? 1 : 0);
                    byte[] temp = new byte[groups * base];
                    Arrays.fill(temp, (byte) 0);
                    System.arraycopy(keyByte, 0, temp, 0, keyByte.length);
                    keyByte = temp;
                }
                // 初始化
                Security.addProvider(new BouncyCastleProvider());
                Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
                SecretKeySpec spec = new SecretKeySpec(keyByte, "AES");
                AlgorithmParameters parameters = AlgorithmParameters.getInstance("AES");
                parameters.init(new IvParameterSpec(ivByte));
                cipher.init(Cipher.DECRYPT_MODE, spec, parameters);// 初始化
                byte[] resultByte = cipher.doFinal(dataByte);
                if (null != resultByte && resultByte.length > 0) {
                    String result = new String(resultByte, "UTF-8");
                    return JSONObject.parseObject(result);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
		}
		return null;
	}

	

}