package com.springdemo.pojo;

public class Data {
	
	private String code;
	private String encryptedData;
	private String iv;
	private String openid;
	private String session_key;
	
	
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getEncryptedData() {
		return encryptedData;
	}
	public void setEncryptedData(String encryptedData) {
		this.encryptedData = encryptedData;
	}
	public String getIv() {
		return iv;
	}
	public void setIv(String iv) {
		this.iv = iv;
	}
	public String getOpenid() {
		return openid;
	}
	public void setOpenid(String openid) {
		this.openid = openid;
	}
	public String getSession_key() {
		return session_key;
	}
	public void setSession_key(String session_key) {
		this.session_key = session_key;
	}
	
}
