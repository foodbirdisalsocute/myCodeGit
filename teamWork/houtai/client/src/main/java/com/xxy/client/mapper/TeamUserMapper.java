package com.xxy.client.mapper;

import com.xxy.client.entity.TeamUser;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public interface TeamUserMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(TeamUser record);

    int insertSelective(TeamUser record);

    TeamUser selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TeamUser record);

    int updateByPrimaryKey(TeamUser record);

    /**根据openid判断用户是否注册*/
    List<TeamUser> findOneByWechatOpenId(String wechatOpenId);
}