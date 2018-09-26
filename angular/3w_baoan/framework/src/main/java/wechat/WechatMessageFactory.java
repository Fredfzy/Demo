package wechat;

import java.util.ArrayList;
import java.util.List;

public class WechatMessageFactory implements CustomHttpModel {
	private String touser;
	private String msgtype;
	private String agentid;
	private WechatText text;
	private WechatNews news;
	private WechatMessageFactory(String touser,String agentid) {
		this.touser = touser;
		this.agentid = agentid;
	}
	public static WechatMessageFactory createWechatTextMessage(String touser,String agentid,String content){
		WechatMessageFactory wmm = new WechatMessageFactory(touser,agentid);
		wmm.setMsgtype("text");
		wmm.setText(new WechatText(content));
		return wmm;
	}
	public static WechatMessageFactory createWechatNewsMessage(String touser,String agentid,String title,String content,String url){
		WechatMessageFactory wmm = new WechatMessageFactory(touser,agentid);
		wmm.setMsgtype("news");
		WechatNews wn = new WechatNews();
		List<WechatArticle> articles = new ArrayList<WechatArticle>();
		articles.add(new WechatArticle(title, content, url, null));
		wn.setArticles(articles);
		wmm.setNews(wn);
		return wmm;
	}
	public String getTouser() {
		return touser;
	}
	public void setTouser(String touser) {
		this.touser = touser;
	}
	public String getAgentid() {
		return agentid;
	}
	public void setAgentid(String agentid) {
	}
	public String getMsgtype() {
		return msgtype;
	}
	public void setMsgtype(String msgtype) {
		this.msgtype = msgtype;
	}
	public WechatText getText() {
		return text;
	}
	public void setText(WechatText text) {
		this.text = text;
	}
	public WechatNews getNews() {
		return news;
	}
	public void setNews(WechatNews news) {
		this.news = news;
	}
	
}
