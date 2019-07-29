package com.xxy.client.controller;



import com.xxy.client.common.Contants;
import com.xxy.client.entity.TeamUser;
import com.xxy.client.service.PublicService;
import com.xxy.client.service.RegistryService;
import com.xxy.client.service.TeamUserService;
import com.xxy.client.vo.ResultVo;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 注册中心
 */
@Controller
@RequestMapping(value = "/registryController")
public class RegistryController {

    @Autowired
    private RegistryService registryService;

    @Autowired
    private TeamUserService teamUserService;

    @Autowired
    private PublicService publicService;


    /**
     * 注册
     * */
    @GetMapping(value = "/Registry")
    @ResponseBody
    public ResultVo Registry(@RequestParam("code") String code,
                             @RequestParam("phone") String phone,
                             @RequestParam("mail") String mail,
                             @RequestParam("workNum") String workNum,
                             @RequestParam("picPath") String picPath,
                             @RequestParam("wechatName") String wechatName){

        ResultVo resultVo = new ResultVo();

        //判断参数是否为空
        System.out.println(code+"==="+phone+"===="+mail+"====="+workNum);
        if (code==null||phone==null||mail==null||workNum==null||wechatName==null){
            resultVo.setCode(Contants.FAIL_CODE);
            resultVo.setMessage("参数为空");
            return resultVo;
        }


        //再一次判断是否注册,若已经注册则返回
        String result=publicService.getOpenIdByCode(code);
        JSONObject jsonObject = JSONObject.fromObject(result);
        String wechatOpenId=jsonObject.get("openid").toString();
        if (teamUserService.findOneByWechatOpenId(wechatOpenId).size()==1){
            resultVo.setCode(Contants.EXIT_CODE);
            resultVo.setMessage("该用户已经注册");
            return resultVo;
        }

        //未注册则进行注册
        TeamUser teamUser = new TeamUser();
        teamUser.setPicPath(picPath);
        teamUser.setWechatName(wechatName);
        teamUser.setMail(mail);
        teamUser.setPhone(phone);
        teamUser.setWorkNum(workNum);
        teamUser.setWechatOpenId(wechatOpenId);
        int resultInt=teamUserService.insert(teamUser);
        if (resultInt==1){
            resultVo.setCode(Contants.SUCESSFUL_CODE);


//            //生成3rd_session    --自定义认证token 实际上应该遵循4个规则
//            String sessionKey=jsonObject.get("session_key").toString();
//            String my3rdSession=ThreeRDSsssion.get3rdSession(wechatOpenId,sessionKey);
//            redisTemplate.opsForValue().set(my3rdSession,wechatOpenId,Contants.SESSION_TIME, TimeUnit.SECONDS);
//            resultVo.setSession_token(my3rdSession);

        }else {
            resultVo.setCode(Contants.FAIL_CODE);
        }
        System.out.println(resultInt);
        return  resultVo;

    }


}
