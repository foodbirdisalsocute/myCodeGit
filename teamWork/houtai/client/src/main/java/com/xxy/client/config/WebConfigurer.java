package com.xxy.client.config;

import com.xxy.client.config.intercepors.LoginInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @ClassName WebConfigurer
 * @Description 拦截器
 * @Author xu_xinyuan
 * @Date 2019/5/22 16:38
 * @Version 1.0
 */

@Configuration
public class WebConfigurer implements WebMvcConfigurer {
    @Autowired
    private LoginInterceptor loginInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //配置所有请求，除去/login /registry
        registry.addInterceptor(loginInterceptor).addPathPatterns("/**").excludePathPatterns("/*/login", "/*/register");

    }


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

    }
}
