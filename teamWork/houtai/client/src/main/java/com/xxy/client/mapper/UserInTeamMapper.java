package com.xxy.client.mapper;

import com.xxy.client.entity.UserInTeam;
import com.xxy.client.entity.UserInTeamKey;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface UserInTeamMapper {
    int deleteByPrimaryKey(UserInTeamKey key);

    int insert(UserInTeam record);

    int insertSelective(UserInTeam record);

    UserInTeam selectByPrimaryKey(UserInTeamKey key);

    int updateByPrimaryKeySelective(UserInTeam record);

    int updateByPrimaryKey(UserInTeam record);

    List<String> getTeamListByWechatOpenId(String wechatOpenId);
}