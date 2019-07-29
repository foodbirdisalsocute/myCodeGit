package com.xxy.client.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;

/**
 * @Description 判断是否登录或者注册
 * @Author xu_xinyuan
 * @Date 2019/5/21 15:58
 * @Version 1.0
 */
public class SessionTokenUtils {




    //根据sessionToken获取openId到缓存中取
    public static String getOpenIdBySessionToken(StringRedisTemplate redisTemplate, String sessionToken){

//        StringRedisTemplate redisTemplate = new StringRedisTemplate();
        if (redisTemplate.opsForValue().get(sessionToken)!=null) {
            String wechatOpenId = redisTemplate.opsForValue().get(sessionToken).toString();
            return wechatOpenId;
        }else
            return "";


    }
}
