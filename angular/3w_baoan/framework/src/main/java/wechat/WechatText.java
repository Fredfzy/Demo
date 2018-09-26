package wechat;

public class WechatText implements WechatMessage {
	private String content;
	public WechatText(String content){
		this.content = content;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
}
