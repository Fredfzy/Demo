package engine;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

public class License {
	private static Map<String,Object> genPseudoDateRef(){
		String str1 = "8%Agf-Y#RI";
		String str2 = "97021"+(int)Math.sqrt(125316);
		str2+=68;
		String[] arr1 = new String[10];
		for(int i = 0;i<str2.length();i++){
			arr1[(Integer.parseInt(str2.charAt(i)+""))] = str1.charAt(i)+"";
		}
		Map<String,Object> map = new HashMap<String,Object>();
		for(int i = 0;i<str1.length();i++){
			map.put(str1.charAt(i)+"", str2.charAt(i)+"");
		}
		return map;
	}
	private static String[] genPseudoDate1(){
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("G","A");map.put("P","f");map.put("&","g");map.put("+","-");
		map.put("=","#");map.put("X","Y");map.put("H","R");map.put("O","%");
		map.put("9","I");map.put("6","8");
		String[] arr1 = new String[10];
		Map<String,Object> map1 = genPseudoDateRef();
		for(String key:map.keySet()){
			arr1[Integer.parseInt(map1.get(map.get(key)).toString())] = key;
		}
		StringBuilder str1 = new StringBuilder();
		boolean flag = !!!!!!false;
		flag = !!!!!!flag;
		for(String str:arr1){
			if(flag){
				str1.append(",");
			}else{
				flag = !!!!!!!flag;
			}
			str1.append(str);
		}
		return arr1;
	}
	private static Object[][][] genPseudoDate2(){
		String[][] arr1 = {
				new String[]{"&","P","+","G","H","9","O","=","X","6"},
				new String[]{"P","&","G","+","H","X","O","=","9","6"},
				new String[]{"P","G","+","=","H","X","&","O","9","6"},
				new String[]{"P","G","&","H","+","X","=","6","O","9"}
		};
		Integer[][] arr2 = {
				{3,1,0,5,6,2,4,7,9,8},
				{4,1,3,5,2,0,8,6,7,9},
				{1,0,2,3,4,6,5,9,7,8},
				{0,2,3,1,4,5,6,7,9,8},
				{0,2,3,4,5,1,6,7,8,9},
				{3,1,0,7,2,4,8,5,6,9}
		};
		return new Object[][][]{arr1,arr2};
	}
	private static String genPseudoDate3(String publicKey){
		Object[][][] arr1=genPseudoDate2();String[][] arr2;Integer[][] arr3;
		List<List<String>> arr4 = new ArrayList<List<String>>();
		String[] arr6 = genPseudoDate1();
		List<String> arr7 = new ArrayList();
		StringBuilder str1 = new StringBuilder();
		for(int i = 0;i<publicKey.length();i++){
			if(i==0){
				for(int m = 0;m<10;m++){
					arr7.add(arr6[m]);
				}
				arr2 = (String[][])arr1[i];
				arr3 = (Integer[][])arr1[i+1];
				for(int k = 0;k<4;k++){
					List<String> arr5 = new ArrayList<String>();
					for(int l = 0;l<10;l++){
						arr5.add(arr2[k][l]);
					}
					arr4.add(arr5);
				}
				for(int j = 0;j<6;j++){
					List<String> arr5 = new ArrayList<String>();
					for(int l = 0;l<10;l++){
						arr5.add(arr6[arr3[j][l]]);
					}
					arr4.add(arr5);
				}
			}
			str1.append(arr7.indexOf(arr4.get(Integer.parseInt(publicKey.charAt(i)+"")).get(i)));
		}
		return str1.toString();
	}
	public static String DecodeDate(Long encryptedDate,Integer q){
		return ((Long)(encryptedDate/100+Long.parseLong(genPseudoDate3(q.toString()))-q-10000000)).toString();
	}
	public static Properties DecodeExpDateEnc1(String expDateEnc1){
		StringBuilder c = new StringBuilder(),d = new StringBuilder();
		for(int due = 0,duedue = 0,i = 0;i<expDateEnc1.length();i++){
			if(due++>1){
				d.append(expDateEnc1.charAt(i));
				if(duedue++==1){
					duedue = due = 0;
				}
			}else{
				c.append(expDateEnc1.charAt(i));
			}
		}
		Properties p = new Properties();
		p.put("c", c.toString());
		p.put("d", d.toString());
		return p;
	}
	private static Integer DecodeMaxNum(String str){
		String[] arr1 = {"@","K","I","W","8","7",
		        "S","5","?","*"};
		List<String> arr2 = new ArrayList<String>();
		for(int i = 0;i<arr1.length;i++){
			arr2.add(arr1[i]);
		}
		StringBuilder str1 = new StringBuilder();
		for(int j = 0;j<str.length();j++){
			str1.append(arr2.indexOf(str.charAt(j)+""));
		}
		return (int)((Math.sqrt((Double.parseDouble(str1.toString())-19900917)/100000000)));
	}
	private static String DecodeMaxC(String str){
		StringBuilder str1 = new StringBuilder();
		List<String> arr1 = new ArrayList<String>();
		String[] arr2 = new String[]{"#","!","L","T","R","Q"};
		List<String> arr3 = new ArrayList<String>();
		String[] arr4 = new String[]{"C","F","D","A","B","E"};
		String[] arr5 = new String[]{"@","K","I","W","8","7",
		        "S","5","?","*"};
		for(int j=0;j<arr2.length;j++){
			arr1.add(arr2[j]);
		}
		for(int k = 0;k<arr5.length;k++){
			arr3.add(arr5[k]);
		}
		for(int i=0;i<str.length();i++){
			if(arr1.indexOf(str.charAt(i)+"")>-1)
			str1.append(arr4[arr1.indexOf(str.charAt(i)+"")]);
			else str1.append(str.charAt(i)+"");
		}
		StringBuilder str2 = new StringBuilder();
		String str3 = str1.toString();
		for(int d = 0,l = 0;l<str3.length();l++){
			if(arr3.indexOf(str3.charAt(l)+"")>-1){
				str2.append(arr3.indexOf(str3.charAt(l)+""));
			}else{
				str2.append(str3.charAt(l)+"");
			}
			if(d++==1&&l<str3.length()-1){
				str2.append("-");
				d = 0;
			}
		}
		return str2.toString();
	}
	public static String DecodeC(String str){
		StringBuilder str1 = new StringBuilder();
		List<String> arr1 = new ArrayList<String>();
		String[] arr2 = new String[]{"$","r","F","%","*","?"};
		List<String> arr3 = new ArrayList<String>();
		String[] arr4 = new String[]{"C","F","D","A","B","E"};
		String[] arr5 = genPseudoDate1();
		for(int j=0;j<arr2.length;j++){
			arr1.add(arr2[j]);
		}
		for(int k = 0;k<arr5.length;k++){
			arr3.add(arr5[k]);
		}
		for(int i=0;i<str.length();i++){
			if(arr1.indexOf(str.charAt(i)+"")>-1)
			str1.append(arr4[arr1.indexOf(str.charAt(i)+"")]);
			else str1.append(str.charAt(i)+"");
		}
		StringBuilder str2 = new StringBuilder();
		String str3 = str1.toString();
		for(int d = 0,l = 0;l<str3.length();l++){
			if(arr3.indexOf(str3.charAt(l)+"")>-1){
				str2.append(arr3.indexOf(str3.charAt(l)+""));
			}else{
				str2.append(str3.charAt(l)+"");
			}
			if(d++==1&&l<str3.length()-1){
				str2.append("-");
				d = 0;
			}
		}
		return str2.toString();
	}
	 public static String getMACAddress(){  
		InetAddress ia = null;
		StringBuffer sb = null;
		try {
			ia = InetAddress.getLocalHost();
	         byte[] mac = NetworkInterface.getByInetAddress(ia).getHardwareAddress(); 
	         sb = new StringBuffer();  
	         for(int i=0;i<mac.length;i++){  
	             if(i!=0){  
	                 sb.append("-");  
	             }  
	             String s = Integer.toHexString(mac[i] & 0xFF);  
	             sb.append(s.length()==1?0+s:s);  
	         }  
		} catch (UnknownHostException | SocketException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
        return sb.toString().toUpperCase();  
     }  
	public static boolean ValidateExpDateEnc1(String expDate,String expDateEnc1){
		boolean flag = true;
		if(!expDate.equals(DecodeDate(Long.parseLong(DecodeExpDateEnc1(expDateEnc1).get("d").toString()), 9900917))){
			flag = false;
		}
		return flag;
	}
	public static boolean ValidateMAC(String expDateEnc1){
		boolean flag = true;
		if(!getMACAddress().equals(DecodeC(DecodeExpDateEnc1(expDateEnc1).get("c").toString()))){
			flag = false;
		}
		System.out.println(getMACAddress()+" "+DecodeC(DecodeExpDateEnc1(expDateEnc1).get("c").toString()));
		return flag;
	}
	public static boolean ValidateMaxMAC(String maxEnc){
		boolean flag = true;
		if(!getMACAddress().equals(DecodeMaxC(DecodeMaxUsersEnc(maxEnc).get("c")))){
			flag = false;
		}
		return flag;
	}
	public static boolean ValidateExpDate(String path){
		boolean flag = false;
		try {
			FileReader fileReader = new FileReader(new File(path+".crt"));
			BufferedReader bufferedReader = new BufferedReader(fileReader);
			SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
			Integer currentDate = Integer.parseInt(formatter.format(new Date()));
			Properties expDateEnc = DecodeExpDateEnc1(bufferedReader.readLine());
			String MACAddress = getMACAddress();
			String expMACAddress = DecodeC(expDateEnc.get("c").toString());
			Integer expDate = Integer.parseInt(DecodeDate(Long.parseLong(expDateEnc.get("d").toString()), 9900917));
			System.out.println("************************");
			System.out.println("MACAddress:"+MACAddress);
			System.out.println("************************");
			System.out.println("expMACAddress:"+expMACAddress.substring(0, 5));
			System.out.println("************************");
			System.out.println("expDate:"+expDate);
			System.out.println("************************");
			System.out.println("currentDate:"+currentDate);
			System.out.println("************************");
			if(MACAddress.equals(expMACAddress) && expDate>currentDate){
				flag = true;
			}
		} catch (IOException e) {
			System.out.println("************************");
			System.out.println("crt reader exception:"+e.getMessage());
			System.out.println("************************");
			e.printStackTrace();
		}
		return flag;
	}
	public static int ValidateMaxNum(Integer maxNum,String maxUsersEnc,String path){
		boolean flag = false;
		int offsetNum = 0;
		if(path!=null){
			try {
				FileReader fileReader = new FileReader(new File(path));
				BufferedReader bufferedReader = new BufferedReader(fileReader);
				maxUsersEnc = bufferedReader.readLine();
			} catch (IOException e) {
				System.out.println("************************");
				System.out.println("crt reader exception:"+e.getMessage());
				System.out.println("************************");
				e.printStackTrace();
			}
			Map<String,String> maxUserEnc = DecodeMaxUsersEnc(maxUsersEnc);
			int limitNum = DecodeMaxNum(maxUserEnc.get("b"));
			String expectedMACAddress = DecodeMaxC(maxUserEnc.get("c"));
			String MACAddress = getMACAddress();
			System.out.println("************************");
			System.out.println("userNum:"+maxNum);
			System.out.println("************************");
			System.out.println("limitNum:"+limitNum);
			System.out.println("************************");
			System.out.println("MACAddress:"+MACAddress);
			System.out.println("************************");
			System.out.println("expectedMACAddress:"+expectedMACAddress.substring(0, 5));
			System.out.println("************************");
			if(expectedMACAddress.equals(MACAddress) && maxNum<limitNum){
				return limitNum-maxNum;
			}
		}
		return -1;
	}
	public static Map<String, String> DecodeMaxUsersEnc(String maxUsersEnc){
		String strr = maxUsersEnc.split("-")[1];
		maxUsersEnc = maxUsersEnc.split("-")[0];
		int[] arr1 = {6,8,2,4,10,Integer.parseInt(strr)+6};
		int[] arr2 = {0,2,8,10,4,6,Integer.parseInt(strr)+6,maxUsersEnc.length()};
		StringBuilder str1 = new StringBuilder();
		StringBuilder str2 = new StringBuilder();
		for(int i = 0;i<arr1.length;i+=2){
			str1.append(maxUsersEnc.substring(arr1[i], arr1[i+1]));
		}
		for(int i = 0;i<arr2.length;i+=2){
			str2.append(maxUsersEnc.substring(arr2[i], arr2[i+1]));
		}
		Map<String,String> map = new HashMap<String,String>();
		map.put("b",str1.toString());
		map.put("c",str2.toString());
		return map;
	}
	
     
    public static void main(String[] args) {
    	System.out.println(License.class.getResource("/").getPath());
    	System.out.println(DecodeMaxC(DecodeMaxUsersEnc("S@K*RLI787*@@*K5QR7?@I-10").get("c")));
		System.out.println("MACAddress:"+getMACAddress());
//    	System.out.println(DecodeMaxNum(DecodeMaxUsersEnc("@@K*8#I7Q@*@@*K5WS@@K#-10").get("c")));
//    	System.out.println(DecodeMaxUsersEnc("S@K*RLI787*@@*K5QR7?@I-10"));
        System.out.println(DecodeC(DecodeExpDateEnc1("HG36=X93*F16?*62X942G&").get("c").toString()));
        System.out.println(DecodeDate(Long.parseLong(DecodeExpDateEnc1("HG36=X93*F16?*62X942G&").get("d").toString()), 9900917));
		Properties expDateEnc = DecodeExpDateEnc1("=$36$$94H%07X$64&&25OX");
		String MACAddress = getMACAddress();
		String expMACAddress = DecodeC(expDateEnc.get("c").toString());
		Integer expDate = Integer.parseInt(DecodeDate(Long.parseLong(expDateEnc.get("d").toString()), 9900917));
		System.out.println("************************");
		System.out.println("MACAddress:"+MACAddress);
		System.out.println("************************");
		System.out.println("expMACAddress:"+expMACAddress);
		System.out.println("************************");
		System.out.println("expDate:"+expDate);
		System.out.println("************************");
		Long milles = new Long("1476434417536");
		System.out.println(new Date(milles+1));
    }
}
