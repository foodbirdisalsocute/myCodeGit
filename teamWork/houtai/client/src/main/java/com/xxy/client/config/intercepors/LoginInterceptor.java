package com.xxy.client.config.intercepors;

import com.xxy.client.common.Contants;
import com.xxy.client.entity.TeamUser;
import com.xxy.client.vo.ResultVo;

import com.xxy.client.vo.TeamUserVo;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.concurrent.TimeUnit;

/**
 * @ClassName LoginInterceptor
 * @Description 拦截器配置
 * @Author xu_xinyuan
 * @Date 2019/5/22 16:40
 * @Version 1.0
 */
@Component
public class LoginInterceptor implements HandlerInterceptor {

    @Autowired
    private StringRedisTemplate redisTemplate;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String sessionToken=request.getParameter("sessionToken");

        String reqURL = request.getRequestURL().toString();


        logger.info("#############################################");
        logger.info("请求"+reqURL+"进入拦截器，正在检测是否携带token，以及是否过期");
        logger.info("session::::::::"+sessionToken);

        //与redis中缓存比较，若命中则通过
        if(redisTemplate.opsForValue().get(sessionToken)!=null){
            logger.info("验证通过，正在放行。。。。。。");
            String wechatOpenId = redisTemplate.opsForValue().get(sessionToken).toString();
            //更新过期时间
            redisTemplate.expire("wechatOpenId",Contants.SESSION_TIME , TimeUnit.MILLISECONDS);
            return true;
        }else {

            TeamUserVo teamUserVo = new TeamUserVo();

            //不给通过
            ResultVo resultVo = new ResultVo();
            resultVo.setCode(Contants.NO_LOGIN_CODE);
            resultVo.setMessage("登录过期，请重新登录");

//            teamUserVo.setResultVo(resultVo);
//            JSONObject json = JSONObject.fromObject(teamUserVo);

            JSONObject json = JSONObject.fromObject(resultVo);


            String strJson=json.toString();

            System.out.println(strJson);
            returnJson(response,strJson);
            return false;
        }


    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }



    /**返回json数组*/
    private void returnJson(HttpServletResponse response, String json) throws Exception{
        PrintWriter writer = null;
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html; charset=utf-8");
        try {
            writer = response.getWriter();
            writer.print(json);

        } catch (IOException e) {
            logger.error("response error",e);
        } finally {
            if (writer != null)
                writer.close();
        }
    }


}
