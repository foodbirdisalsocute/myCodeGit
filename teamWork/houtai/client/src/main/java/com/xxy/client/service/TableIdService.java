package com.xxy.client.service;

import com.xxy.client.entity.TableId;
import com.xxy.client.mapper.TableIdMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName TableIdService
 * @Description TODO
 * @Author xu_xinyuan
 * @Date 2019/5/31 16:14
 * @Version 1.0
 */

@Service
public class TableIdService {
    @Autowired
    private TableIdMapper tableIdMapper;

    public TableId getMax(String tablename){
        return tableIdMapper.selectByPrimaryKey(tablename);
    }

    public int updateByPrimaryKey(TableId tableId){
        return tableIdMapper.updateByPrimaryKey(tableId);
    }
}
