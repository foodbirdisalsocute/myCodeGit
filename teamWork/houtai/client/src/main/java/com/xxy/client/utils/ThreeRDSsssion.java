package com.xxy.client.utils;

import com.xxy.client.common.Contants;

import java.util.Random;
import java.util.UUID;

/**
 * @ClassName 3rdSession
 * @Description TODO
 * @Author xu_xinyuan
 * @Date 2019/5/21 17:20
 * @Version 1.0
 */
public class ThreeRDSsssion {
    public static String  get3rdSession(String wechatOpenId,String session_key){
//        int length = Contants.SESSION_KEY_LENGTH;
//        String str=wechatOpenId+session_key;
//        Random random=new Random();
//        StringBuffer sb=new StringBuffer();
//        for(int i=0;i<length;i++){
//            int number=random.nextInt(62);
//            sb.append(str.charAt(number));
//        }
//        return sb.toString();

        String uuid = UUID.randomUUID().toString().replaceAll("-","");
        System.out.println(uuid);
        return  uuid;

    }
}
