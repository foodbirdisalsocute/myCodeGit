package com.xxy.client.mapper;

import com.xxy.client.entity.TableId;
import org.springframework.stereotype.Component;

@Component
public interface TableIdMapper {
    int deleteByPrimaryKey(String tablename);

    int insert(TableId record);

    int insertSelective(TableId record);

    TableId selectByPrimaryKey(String tablename);

    int updateByPrimaryKeySelective(TableId record);

    int updateByPrimaryKey(TableId record);
}