package com.xxy.client.utils;

import java.util.UUID;

/**
 * @ClassName StringUtils
 * @Description TODO
 * @Author xu_xinyuan
 * @Date 2019/5/29 9:57
 * @Version 1.0
 */
public class StringUtils {

    //判断字符串不为空串和null
    public static Boolean isNullAndBlank(String string){
        if (string==null||string.isEmpty())
            return true;
        else
            return false;
    }



}
