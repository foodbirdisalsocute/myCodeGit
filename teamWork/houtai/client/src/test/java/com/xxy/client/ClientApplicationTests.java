package com.xxy.client;

import com.xxy.client.service.TableIdService;
import com.xxy.client.utils.TableIdUtis;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.concurrent.TimeUnit;

@RunWith(SpringRunner.class)
@SpringBootTest
@MapperScan(basePackages="com.xxy.client.mapper")
public class ClientApplicationTests {

//    @Autowired
//    private LogInfoMapper logInfoMapper;

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Autowired
    private TableIdService tableIdService;

    @Ignore
    public void contextLoads() {
//        System.out.println(logInfoMapper.findCount());

//        redisTemplate.opsForValue().set("wechatOpenId","asdasd",60*2, TimeUnit.SECONDS);

//        String result = redisTemplate.opsForValue().get("wechatOpenId").toString(),60*10, TimeUnit.SECONDS);
//        System.out.println(result);

        redisTemplate.expire("wechatOpenId",1000 , TimeUnit.MILLISECONDS);
    }

    @Test
    public void test(){

        System.out.println(TableIdUtis.getTableId("teamId",tableIdService));
    }

}
