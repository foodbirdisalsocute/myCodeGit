package com.xxy.client.service;

import com.xxy.client.entity.Team;
import com.xxy.client.mapper.TeamMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName TeamService
 * @Description TODO
 * @Author xu_xinyuan
 * @Date 2019/5/23 9:51
 * @Version 1.0
 */
@Service
public class TeamService {
    @Autowired
    private TeamMapper teamMapper;

    public Integer addTeam(Team team){
        return teamMapper.insertSelective(team);
    }

    public Team selectByPrimaryKey(String teamName){
        return  teamMapper.selectByPrimaryKey(teamName);
    }
}
