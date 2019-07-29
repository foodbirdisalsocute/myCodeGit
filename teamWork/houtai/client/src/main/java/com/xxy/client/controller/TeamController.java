package com.xxy.client.controller;

import com.xxy.client.common.Contants;
import com.xxy.client.entity.Team;
import com.xxy.client.service.TableIdService;
import com.xxy.client.service.TeamService;
import com.xxy.client.utils.SessionTokenUtils;
import com.xxy.client.utils.StringUtils;
import com.xxy.client.utils.TableIdUtis;
import com.xxy.client.vo.ResultVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;

/**
 * @ClassName TeamController
 * @Description TODO
 * @Author xu_xinyuan
 * @Date 2019/5/23 9:51
 * @Version 1.0
 */
@Controller
@RequestMapping(value = "/teamController")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Autowired
    private TableIdService tableIdService;

    @GetMapping(value = "/addTeam")
    @ResponseBody
    public ResultVo addTeam(@RequestParam("teamName") String teamName,
                            @RequestParam("sessionToken") String sessionToken){
        ResultVo resultVo = new ResultVo();
        if (StringUtils.isNullAndBlank(teamName)){
            resultVo.setCode(Contants.MISS_FACTOR);
            resultVo.setMessage("缺少参数");
            return  resultVo;
        }else {
            //插入数据
            Team team = new Team();
            team.setTeamName(teamName);
            team.setProjectLeaderOpenid(SessionTokenUtils.getOpenIdBySessionToken(redisTemplate,sessionToken));
            team.setCreateDate(new Date());
            team.setDeletedStatus(Contants.NO_DEL);
            team.setTeamId(TableIdUtis.getTableId("teamId",tableIdService));


            String wetchatOpenId= SessionTokenUtils.getOpenIdBySessionToken(redisTemplate,sessionToken);

            //先查询数据库里面是否存在该项目组，项目组名称不能重复
            Team exitTeam=teamService.selectByPrimaryKey(teamName);

            if (exitTeam!=null){
                resultVo.setMessage("项目名称已经存在");
                resultVo.setCode(Contants.EXIT_CODE);
                return resultVo;
            }

            //不存在，则插入数据
            int result=teamService.addTeam(team);

            if (result==1){
                resultVo.setCode(Contants.SUCESSFUL_CODE);
                resultVo.setMessage("新增项目组成功");
            }else {
                resultVo.setCode(Contants.FAIL_CODE);
                resultVo.setMessage("插入数据失败");
            }

            return resultVo;
        }
    }


}
