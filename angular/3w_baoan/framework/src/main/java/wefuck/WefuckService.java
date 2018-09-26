package wefuck;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.HttpClients;
import org.springframework.beans.factory.annotation.Value;

import com.alibaba.fastjson.JSONObject;

public class WefuckService {
	@Value("${wefuck.brothelName}")
	String brothelName;
	@Value("${wefuck.brothelId}")
	String brothelId;
	@Value("${wefuck.brothelSecret}")
	String brothelSecret;
	String authToken = null;
	Long lastTokenTime;
	private final String apiURL = "https://a1.easemob.com/33oa/";
	private Map<String,Object> post(HttpPost httpPost){
		Map<String,Object> ret = null;
		try {
			String str = (new BasicResponseHandler()).
					handleResponse(HttpClients.createDefault().execute(httpPost));
			System.out.println(str);
			ret = JSONObject.parseObject(str);
		} catch (IOException e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
		}
		return ret;
	}
	private Map<String,Object> get(HttpGet httpGet){
		Map<String,Object> ret = null;
		try {
			String str = (new BasicResponseHandler()).
					handleResponse(HttpClients.createDefault().execute(httpGet));
			System.out.println(str);
			ret = JSONObject.parseObject(str);
		} catch (IOException e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
		}
		return ret;
	}
	public String getAuthToken() {
		if(authToken==null || (new Date()).getTime()-lastTokenTime>4183999){
			HttpPost httpPost = new HttpPost(apiURL+brothelName+"/token");
			httpPost.setHeader("Content-Type","application/json");
			JSONObject payload = new JSONObject();
			payload.put("grant_type", "client_credentials");
			payload.put("client_id", brothelId);
			payload.put("client_secret", brothelSecret);
			httpPost.setEntity(new StringEntity(payload.toJSONString(), "UTF-8"));
			lastTokenTime = (new Date()).getTime();
			System.out.println("access_token: "+authToken);
			authToken = "Bearer "+(String) post(httpPost).get("access_token");
		}
		return authToken;
	}
	public Map<String,Object> send(String path,JSONObject payload) {
		HttpPost httpPost = new HttpPost(apiURL+brothelName+path);
		System.out.println(apiURL+brothelName+path);
		httpPost.setHeader("Content-Type","application/json");
		getAuthToken();
		httpPost.setHeader("Authorization",authToken);
		System.out.println(authToken);
		System.out.println(payload.toJSONString());
		httpPost.setEntity(new StringEntity(payload.toJSONString(), "UTF-8"));
		return post(httpPost);
    }
	public Map<String,Object> getOnly(String path) {
		HttpGet httpGet = new HttpGet(apiURL+brothelName+path);
		getAuthToken();
		httpGet.setHeader("Authorization",authToken);
		return get(httpGet);
    }
	public Map<String,Object> sendMessage(JSONObject payload) {
		HttpPost httpPost = new HttpPost(apiURL+brothelName+"/messages");
		httpPost.setHeader("Content-Type","application/json");
		getAuthToken();
		httpPost.setHeader("Authorization",authToken);
		httpPost.setEntity(new StringEntity(payload.toJSONString(), "UTF-8"));
		return post(httpPost);
    }
	public void pushMessage(List<Object> fuckers,String action,Map<String,Object> condom){
		JSONObject oralCum = new JSONObject();
		oralCum.put("target_type", "users");
		oralCum.put("target", fuckers);
		Map<String,Object> cum = new HashMap<String,Object>();
		cum.put("type", "cmd");
		cum.put("action", action);
		oralCum.put("msg", cum);
		oralCum.put("from", "admin");
		oralCum.put("ext", condom);
		sendMessage(oralCum);
	}
	public Map<String,Object> getMessages() {
		HttpGet httpGet = new HttpGet(apiURL+brothelName+"/chatmessages");
		httpGet.setHeader("Content-Type","application/json");
		getAuthToken();
		httpGet.setHeader("Authorization",authToken);
		return get(httpGet);
    }
}
