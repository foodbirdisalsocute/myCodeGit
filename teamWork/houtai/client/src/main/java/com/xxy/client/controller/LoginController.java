package com.xxy.client.controller;

import com.xxy.client.common.Contants;
import com.xxy.client.entity.TeamUser;
import com.xxy.client.service.PublicService;
import com.xxy.client.service.TeamUserService;
import com.xxy.client.utils.ThreeRDSsssion;
import com.xxy.client.vo.ResultVo;
import com.xxy.client.vo.TeamUserVo;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import org.springframework.beans.BeanUtils;

import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * @ClassName LoginController
 * @Description TODO
 * @Author xu_xinyuan
 * @Date 2019/5/22 14:04
 * @Version 1.0
 */
@Controller
@RequestMapping(value = "/loginController")
public class LoginController {

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Autowired
    private TeamUserService teamUserService;

    @Autowired
    private PublicService publicService;

    /**
     * 判断是否已经注册
     * @param code
     * @return
     */
    @GetMapping(value = "/login")
    @ResponseBody
    public TeamUserVo hasRegistry(@RequestParam("code") String code){
        System.out.println(code);
        String result=publicService.getOpenIdByCode(code);
        JSONObject json_result = JSONObject.fromObject(result);
        System.out.println("openId::::::::::::::"+json_result.get("openid"));
        String wechatOpenId=json_result.get("openid").toString();
        //判断用户是否已经注册成功
        List<TeamUser> teamUserList = teamUserService.findOneByWechatOpenId(wechatOpenId);
        TeamUserVo teamUserVo = new TeamUserVo();
        ResultVo resultVo=new ResultVo();
        if (teamUserList.size()==1){
            resultVo.setCode(Contants.EXIT_CODE);
            resultVo.setMessage("该用户已经注册");
            teamUserVo.setResultVo(resultVo);
            //将实体类的值复制给VO类，并传输到前端
            BeanUtils.copyProperties(teamUserVo,teamUserList.get(0));

            //生成3rd_session    --自定义认证token 实际上应该遵循4个规则
            String sessionKey=json_result.get("session_key").toString();
            String my3rdSession=ThreeRDSsssion.get3rdSession(wechatOpenId,sessionKey);
            redisTemplate.opsForValue().set(my3rdSession,wechatOpenId,Contants.SESSION_TIME, TimeUnit.SECONDS);

            resultVo.setSessionToken(my3rdSession);
        }else if (teamUserList.size()==0){
            resultVo.setCode(Contants.NO_FOUND_CODE);
            resultVo.setMessage("该用户未注册");
        }else{
            resultVo.setMessage("该用户记录存在异常");
            resultVo.setCode(Contants.FAIL_CODE);
        }
        teamUserVo.setResultVo(resultVo);
        return  teamUserVo;
    }


    /**
     * 此方法为验证用户在线的时候返回一个成的结果给，只是为了小程序发送一个请求在拦截器中校验登录状态
     * */
    @GetMapping(value = "/checkLoginStatus")
    @ResponseBody
    public ResultVo checkLoginStatus(){
        ResultVo resultVo = new ResultVo();
        resultVo.setMessage("token还未过期");
        resultVo.setCode(Contants.LOGIN_CODE);
        return resultVo;
    }

}
