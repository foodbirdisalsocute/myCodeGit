package com.xxy.client.service;

import com.xxy.client.mapper.UserInTeamMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @ClassName UserInTeamService
 * @Description TODO
 * @Author xu_xinyuan
 * @Date 2019/5/23 9:52
 * @Version 1.0
 */
@Service
public class UserInTeamService {

    @Autowired
    private UserInTeamMapper userInTeamMapper;

    public List<String> getTeamListByWechatOpenId(String wechatOpenId){
        return  userInTeamMapper.getTeamListByWechatOpenId(wechatOpenId);
    }

}
