package wechat;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;

import com.alibaba.fastjson.JSONObject;

public class HttpUtil {
	private static JSONObject handleResponse(InputStream is){
		JSONObject responseData = null;
        try {
			int size = is.available();
	        byte[] jsonBytes = new byte[size];
	        is.read(jsonBytes);
	        String message = new String(jsonBytes, "UTF-8");
	        responseData = JSONObject.parseObject(message);
			is.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
        return responseData;
	}
	public static JSONObject httpGet(String url){
		JSONObject responseData = null;
		try {
	           URL urlGet = new URL(url);
	           HttpURLConnection http = (HttpURLConnection) urlGet.openConnection();
	           http.setRequestMethod("GET");
	           http.setRequestProperty("Content-Type","application/x-www-form-urlencoded");
	           http.setDoOutput(true);
	           http.setDoInput(true);
	           http.connect();
	           responseData = handleResponse(http.getInputStream());
	       } catch (Exception e) {
	           e.printStackTrace();
	       }
		return responseData;
	}

	public static JSONObject httpHeaderGet(String url,String key,String value){
		JSONObject responseData = null;
		try {
	           URL urlGet = new URL(url);
	           HttpURLConnection http = (HttpURLConnection) urlGet.openConnection();
	           http.setRequestMethod("GET");
	           http.setRequestProperty("Content-Type","application/x-www-form-urlencoded");
	           http.setRequestProperty(key, value);
	           http.setDoOutput(true);
	           http.setDoInput(true);
	           http.connect();
	           responseData = handleResponse(http.getInputStream());
	       } catch (Exception e) {
	           e.printStackTrace();
	       }
		return responseData;
	}
	public static InputStream httpGetInputStream(String url){
		InputStream inputStream = null;
		try {
	           URL urlGet = new URL(url);
	           HttpURLConnection http = (HttpURLConnection) urlGet.openConnection();
	           http.setRequestMethod("GET");
	           http.setRequestProperty("Content-Type","application/x-www-form-urlencoded");
	           http.setDoOutput(true);
	           http.setDoInput(true);
	           http.connect();
	           inputStream = http.getInputStream();
	       } catch (Exception e) {
	           e.printStackTrace();
	       }
		return inputStream;
	}
	public static JSONObject httpPost(String url,CustomHttpModel data){
		JSONObject responseData = null;
		try {
	           URL urlGet = new URL(url);
	           HttpURLConnection http = (HttpURLConnection) urlGet.openConnection();
	           http.setRequestMethod("POST");
	           http.setRequestProperty("Content-Type","application/x-www-form-urlencoded");
	           http.setDoOutput(true);
	           http.setDoInput(true);
//	           http.connect();
	           DataOutputStream out = new DataOutputStream(
	        		   http.getOutputStream());
	           //System.out.println("JSONObject:"+JSONObject.toJSONString(data));
	           out.write(JSONObject.toJSONString(data).getBytes(Charset.forName("UTF-8")));
	           responseData = handleResponse(http.getInputStream());
	       } catch (Exception e) {
	           e.printStackTrace();
	       }
		return responseData;
	}
	public static void main(String[] args) {
		System.out.println(httpHeaderGet("http://apis.baidu.com/sillystudio/service/topy?words=汉字转拼音"
				,"apikey"
				,"9cfe420d2e9c5f63685d1372f6064ea6").get("py").toString().replace(" ", ""));
	}
}
