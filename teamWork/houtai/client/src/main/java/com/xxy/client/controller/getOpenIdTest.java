package com.xxy.client.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.sun.javafx.collections.MappingChange.Map;
import com.xxy.client.vo.ResultVo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/test")
public class getOpenIdTest {

    private String appid = "自己的appid";
    private String secretKey = "自己的AppSecret";

    @PostMapping(value="/p")
    public ResultVo getOpenOd(){
        ResultVo resultVo = new ResultVo();
        resultVo.setCode("555");
        return  resultVo;
    }

}
