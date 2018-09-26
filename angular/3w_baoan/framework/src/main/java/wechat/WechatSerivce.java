package wechat;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSONObject;

import engine.Util;

public class WechatSerivce {
	@Value("#{configProperties['wechat.corpid']}")
	public String corpid;

	@Value("#{configProperties['wechat.corpsecret']}")
	public String corpsecret;

	@Value("#{configProperties['wechat.agentid']}")
	public String agentid;
	
	@Value("${wechat.config}")
	public String config;
	
	public String getAccessToken(){
		String url = "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid="+this.corpid
				+"&corpsecret="+this.corpsecret;
		String accessToken = HttpUtil.httpGet(url).getString("access_token");
        //System.out.println("accessToken:"+accessToken);
	    return accessToken;
	}
	public String pushText(String touser,String content){
		String url = "https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token="+this.getAccessToken();
		String errmsg = HttpUtil.httpPost(url, WechatMessageFactory.createWechatTextMessage(touser,this.agentid,content)).getString("errmsg");
        System.out.println("errmsg:"+errmsg);
		return errmsg;
	}
	public String pushNews(String touser,String title,String content,String mobileUrl){
		String url = "https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token="+this.getAccessToken();
		mobileUrl += "&corpid="+corpid;
		String errmsg = HttpUtil.httpPost(url, WechatMessageFactory.createWechatNewsMessage(touser, this.agentid, title, content, mobileUrl)).getString("errmsg");
        System.out.println("errmsg:"+errmsg);
		return errmsg;
	}
	public void downloadMedia(String mediaId,String path){
		String url = "https://qyapi.weixin.qq.com/cgi-bin/media/get?access_token="+this.getAccessToken()
		+"&media_id="+mediaId;
		Util.saveFile(HttpUtil.httpGetInputStream(url), path,mediaId+".png");
	}
	public String getCorpid() {
		return corpid;
	}

	public void setCorpid(String corpid) {
		this.corpid = corpid;
	}

	public String getCorpsecret() {
		return corpsecret;
	}

	public void setCorpsecret(String corpsecret) {
		this.corpsecret = corpsecret;
	}
	public String getAgentid() {
		return agentid;
	}
	public void setAgentid(String agentid) {
		this.agentid = agentid;
	}
	
}	
