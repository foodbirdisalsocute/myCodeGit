package com.xxy.client.utils;

import com.xxy.client.common.Contants;
import com.xxy.client.entity.TableId;
import com.xxy.client.mapper.TableIdMapper;
import com.xxy.client.service.TableIdService;

import java.util.List;

/**
 * @ClassName TableIdUtis
 * @Description TODO
 * @Author xu_xinyuan
 * @Date 2019/5/30 13:57
 * @Version 1.0
 */
public class TableIdUtis {



    public static String getTableId(String tableName, TableIdService tableIdService){

        TableId tableId =tableIdService.getMax(tableName);

        int max = tableId.getMax();

        max++;
        tableId.setMax(max);

        System.out.println(max);

        tableIdService.updateByPrimaryKey(tableId);

        //填充0，总共为8位
        String tableIdReturn=tableName;
        String maxString=String.valueOf(max);
        System.out.println("+++++++++++"+(Contants.ID_LENGTH -maxString.length()));
        for (int i=0;i<Contants.ID_LENGTH-maxString.length();i++){
            tableIdReturn=tableIdReturn+"0";
            System.out.println(tableIdReturn+"????????"+i);
        }
        tableIdReturn=tableIdReturn+maxString;
        System.out.println(tableIdReturn);
        return tableIdReturn;
    }
}
