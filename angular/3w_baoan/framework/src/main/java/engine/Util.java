package engine;

import java.awt.image.BufferedImage;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.commons.io.output.ByteArrayOutputStream;
import org.w3c.dom.Document;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

public class Util {
	public static void main(String[] args) {
//		JSONArray jsonArray = new JSONArray();
//		JSONObject jsonObject = new JSONObject();
//		jsonObject.put("key", "value");
//		jsonArray.add(jsonObject);
//		System.out.println(jsonArray.toJSONString());
		JSONArray jsonArray = JSONArray.parseArray("[{\"key\":\"value\"}]");
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("key", "value");
		jsonArray.add(jsonObject);
		System.out.println(jsonArray.toJSONString());
	}
	public static boolean bool(Object object) {
		return object !=null && (Boolean) object;
	}
	public static String l2Ns(Object names){
		String[] groupNames = names.toString().split(",");
		StringBuilder sb = new StringBuilder();  
		for(String groupName:groupNames){
			sb.append("'");sb.append(groupName);sb.append("'");sb.append(",");
		}
		return sb.toString().substring(0,sb.toString().length()-1);
	}
	public static String l2s(List list, char separator) {  
		 StringBuilder sb = new StringBuilder();  
		 for (int i = 0; i < list.size(); i++) {  
		     sb.append(list.get(i)).append(separator);  
		 }  
		 return sb.toString().substring(0,sb.toString().length()-1);  
	}  
	public static String l2s(List list, String separator) {  
		 StringBuilder sb = new StringBuilder(); 
		 for (int i = 0; i < list.size(); i++) {  
		     sb.append(list.get(i)).append(separator);  
		 }  
		 return sb.toString().substring(0,sb.toString().length()-separator.length());  
	}  
	public static String genUpdateSql (Map<String,Object> payload,Object tableKey){
		String sql = null;
		Set<String> keySet = payload.keySet();
		if(keySet.size()>0){
			StringBuilder sb = new StringBuilder(); 
			sb.append("update ");sb.append(tableKey);sb.append(" set ");
			sql = "update "+tableKey+" set ";
			for(String key:keySet){
				sb.append(key);sb.append("=:");
				sb.append(key);sb.append(",");
			}
			sql = sb.substring(0, sb.length()-1);
		}
		return sql;
	}
	public static void compressImage(File file, String compressPath, String filename) {
		ImageInputStream iis = null;
		try {
			iis = ImageIO.createImageInputStream(file);
		} catch (IOException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
		}
		Iterator<ImageReader> iterator = ImageIO.getImageReaders(iis);
		ImageReader reader = (ImageReader) iterator.next();
		reader.setInput(iis, true);
		BufferedImage source = null;
		try {
			source = reader.read(0);
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		int srcW = source.getWidth();
		int srcH = source.getHeight();
		int height = 100;
		int width = 100;
		int edgeW = 0;
		int edgeH = 0;
		if (srcW > srcH) {
			width = srcW * 100 / srcH;
			edgeW = -(width - 100) / 2;
		} else {
			height = srcH * 100 / srcW;
			edgeH = -(height - 100) / 2;
		}
		BufferedImage tag = new BufferedImage(100, 100, source.getType());
		tag.getGraphics().drawImage(source, edgeW, edgeH, width, height, null);
		File dstFile = new File(compressPath + "/" + filename);
		try {
			ImageIO.write(tag, reader.getFormatName(), dstFile);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public static void saveBase64(String base64, String path, String fileName){
		try   
        {  
			byte[] b = Base64.getDecoder().decode(base64);  
			System.out.println(b);
			System.out.println(b.length);
            for(int i=0;i<b.length;++i)  
            {  
                if(b[i]<0)  
                {
                    b[i]+=256;  
                }  
            }  
            OutputStream out = new FileOutputStream(path + fileName);      
            out.write(b);  
            out.flush();  
            out.close();  
        }   
        catch (Exception e)   
        {  
			e.printStackTrace();
        }  
	}
	public static void saveFile(InputStream is, String path, String fileName) {
		byte[] data = new byte[1024];
		int len = 0;
		FileOutputStream fos = null;
		try {
			File file = new File(path);
			if (!file.exists() && !file.isDirectory()) {
				file.mkdir();
			}
			fos = new FileOutputStream(path + fileName);
			while ((len = is.read(data)) != -1) {
				fos.write(data, 0, len);
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (is != null)
					is.close();
				if (fos != null)
					fos.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	public static void writeFile(String content, String path) {
		FileOutputStream fos = null;
		BufferedWriter bw = null;
		try {
			File file = new File(path);
			fos = new FileOutputStream(file);
			bw = new BufferedWriter(new OutputStreamWriter(fos, "UTF-8"));
			bw.write(content);
		} catch (FileNotFoundException fnfe) {
			fnfe.printStackTrace();
		} catch (IOException ioe) {
			ioe.printStackTrace();
		} finally {
			try {
				if (bw != null)
					bw.close();
				if (fos != null)
					fos.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	public static List<Object> convertToUserIdList(List<Map<String, Object>> messedList, CircleDAO dao) {
		String sql = "";
		List<Object> list = new ArrayList<Object>();
		for (Map<String, Object> messedMap : messedList) {
			if (messedMap.get("type").equals(0)) {
				sql = "select user_id from group_user where role_id=?";
				list.addAll(dao.getObjectList(sql, new Object[] { messedMap.get("roleId") }, Integer.class));
			} else if (messedMap.get("type").equals(1)) {
				sql = "select user_id from group_user where role_id=? and group_id=?";
				list.addAll(dao.getObjectList(sql, new Object[] { messedMap.get("roleId"), messedMap.get("groupId") },
						Integer.class));
			} else if (messedMap.get("type").equals(2)) {
				list.add(messedMap.get("userId"));
			}
		}
		for (int i = 0; i < list.size(); i++) {
			Object uId = list.get(i);
			for (int j = list.size() - 1; j > i; j--) {
				if (uId.equals(list.get(j))) {
					list.remove(j);
				}
			}
		}
		return list;
	}
}
