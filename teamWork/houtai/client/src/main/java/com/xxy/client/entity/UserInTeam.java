package com.xxy.client.entity;

import java.util.Date;

public class UserInTeam extends UserInTeamKey {
    private String id;

    private Date createTime;

    private String nameInProject;

    private String deletedStatus;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getNameInProject() {
        return nameInProject;
    }

    public void setNameInProject(String nameInProject) {
        this.nameInProject = nameInProject == null ? null : nameInProject.trim();
    }

    public String getDeletedStatus() {
        return deletedStatus;
    }

    public void setDeletedStatus(String deletedStatus) {
        this.deletedStatus = deletedStatus == null ? null : deletedStatus.trim();
    }
}