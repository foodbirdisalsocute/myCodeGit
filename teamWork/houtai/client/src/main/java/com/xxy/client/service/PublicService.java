package com.xxy.client.service;

import com.xxy.client.utils.HttpClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * @ClassName PublicService
 * @Description TODO
 * @Author xu_xinyuan
 * @Date 2019/5/22 14:24
 * @Version 1.0
 */
@Component
public class PublicService {
    @Value("${wechat.appId}")
    private String appid;
    @Value("${wechat.secretKey}")
    private String secretKey;


    //根据code获取openId
    public String getOpenIdByCode(String code){
        String results="";
        String url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + secretKey
                + "&js_code=" + code + "&grant_type=authorization_code";   //接口地址
        System.out.println("url"+url);
        results = HttpClient.sendGetReq(url);// 发送http请求
        System.out.println("results"+results);
        return  results;
    }


}
