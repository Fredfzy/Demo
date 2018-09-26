package wechat;

import java.util.List;

public class WechatNews implements WechatMessage {
	private List<WechatArticle> articles;

	public List<WechatArticle> getArticles() {
		return articles;
	}

	public void setArticles(List<WechatArticle> articles) {
		this.articles = articles;
	}
	
}
