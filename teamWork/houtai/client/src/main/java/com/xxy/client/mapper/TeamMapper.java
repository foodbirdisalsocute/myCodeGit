package com.xxy.client.mapper;

import com.xxy.client.entity.Team;
import org.springframework.stereotype.Component;

@Component
public interface TeamMapper {
    int deleteByPrimaryKey(String teamName);

    int insert(Team record);

    int insertSelective(Team record);

    Team selectByPrimaryKey(String teamName);

    int updateByPrimaryKeySelective(Team record);

    int updateByPrimaryKey(Team record);

}