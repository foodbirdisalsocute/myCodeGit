package com.xxy.client.common;

public final class Contants {
    /**主键长度*/
    public static final  int ID_LENGTH=12;

    /**未删除状态*/
    public static  final String NO_DEL="N";

    /**删除状态*/
    public static final String DEL="D";

    public  static final int DEFAULT_PAGE=10;

    /** 3rdsession 长度 */
    public static int SESSION_KEY_LENGTH=9;

    /**自定义token时间 单位秒 5分钟*/
    public static int SESSION_TIME=60*5;

    /**未登录状态码*/
    public static final String NO_LOGIN_CODE="-2";

    /**缺少必要参数*/
    public static final String MISS_FACTOR="11";

    /**登录状态码*/
    public static final String LOGIN_CODE="3";

    /**存在状态码*/
    public static final String EXIT_CODE ="1";

    /**查找不到用户状态码*/
    public static final String NO_FOUND_CODE="0";

    /**用户记录报错*/
    public  static final String FAIL_CODE="-1";

    /**成功状态码*/
    public static final String SUCESSFUL_CODE="2";

    /**注册失败*/
    public  static  final String REGISTRY_FAIL="注册失败";

    /**返回成功状态码*/
    public static  final  String STATUS_SUCESSFUL="sucessful";

    /**返回失败状态码*/
    public static  final  String STATUS_FAIL="fail";

}
