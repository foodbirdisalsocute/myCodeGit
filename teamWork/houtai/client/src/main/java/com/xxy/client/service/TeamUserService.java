package com.xxy.client.service;

import com.xxy.client.entity.TeamUser;
import com.xxy.client.mapper.TeamUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @ClassName TeamUserService
 * @Description TODO
 * @Author xu_xinyuan
 * @Date 2019/5/20 13:25
 * @Version 1.0
 */
@Service
public class TeamUserService {
    @Autowired
    private TeamUserMapper teamUserMapper;

    public List<TeamUser> findOneByWechatOpenId(String wetchatOpenId){
        return teamUserMapper.findOneByWechatOpenId(wetchatOpenId);
    }

    //插入数据
    public int insert(TeamUser teamUser){
        return  teamUserMapper.insert(teamUser);
    }

}
