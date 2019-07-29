package com.xxy.client.vo;

/**
 * @ClassName TeamUserVo
 * @Description TODO
 * @Author xu_xinyuan
 * @Date 2019/5/20 13:22
 * @Version 1.0
 */
public class TeamUserVo {

    private  ResultVo resultVo;

    private Integer id;

    private String wechatName;

    private String phone;

    private String mail;

    private String workNum;

    private String wechatOpenId;

    private String picPath;

    private String deletedStatus;

    private String workMail;

    public ResultVo getResultVo() {
        return resultVo;
    }

    public void setResultVo(ResultVo resultVo) {
        this.resultVo = resultVo;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getWechatName() {
        return wechatName;
    }

    public void setWechatName(String wechatName) {
        this.wechatName = wechatName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getWorkNum() {
        return workNum;
    }

    public void setWorkNum(String workNum) {
        this.workNum = workNum;
    }

    public String getWechatOpenId() {
        return wechatOpenId;
    }

    public void setWechatOpenId(String wechatOpenId) {
        this.wechatOpenId = wechatOpenId;
    }

    public String getPicPath() {
        return picPath;
    }

    public void setPicPath(String picPath) {
        this.picPath = picPath;
    }

    public String getDeletedStatus() {
        return deletedStatus;
    }

    public void setDeletedStatus(String deletedStatus) {
        this.deletedStatus = deletedStatus;
    }

    public String getWorkMail() {
        return workMail;
    }

    public void setWorkMail(String workMail) {
        this.workMail = workMail;
    }
}
