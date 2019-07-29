package com.xxy.client.controller;

import com.xxy.client.service.UserInTeamService;
import com.xxy.client.utils.SessionTokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @ClassName UserInTeamController
 * @Description TODO
 * @Author xu_xinyuan
 * @Date 2019/5/23 9:51
 * @Version 1.0
 */
@Controller
@RequestMapping(value = "/userInTeamController")
public class UserInTeamController {

    @Autowired
    private UserInTeamService userInTeamService;

    @Autowired
    private StringRedisTemplate redisTemplate;


    @GetMapping(value = "/getTeamListByWechatOpenId")
    @ResponseBody
    public List<String> getTeamListByWechatOpenId(@RequestParam("sessionToken") String sessionToken){


        String wechatOpenId= SessionTokenUtils.getOpenIdBySessionToken(redisTemplate,sessionToken);

        return userInTeamService.getTeamListByWechatOpenId(wechatOpenId);
    }

}
