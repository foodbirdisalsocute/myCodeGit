package com.xxy.client.entity;

import java.util.Date;

public class Team {
    private String teamName;

    private String teamId;

    private Date createDate;

    private String deletedStatus;

    private String projectLeaderOpenid;

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName == null ? null : teamName.trim();
    }

    public String getTeamId() {
        return teamId;
    }

    public void setTeamId(String teamId) {
        this.teamId = teamId == null ? null : teamId.trim();
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getDeletedStatus() {
        return deletedStatus;
    }

    public void setDeletedStatus(String deletedStatus) {
        this.deletedStatus = deletedStatus == null ? null : deletedStatus.trim();
    }

    public String getProjectLeaderOpenid() {
        return projectLeaderOpenid;
    }

    public void setProjectLeaderOpenid(String projectLeaderOpenid) {
        this.projectLeaderOpenid = projectLeaderOpenid == null ? null : projectLeaderOpenid.trim();
    }
}