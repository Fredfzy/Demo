package engine;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.io.StringReader;
import java.io.StringWriter;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLClassLoader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.SimpleFormatter;

import javax.tools.Diagnostic;
import javax.tools.DiagnosticCollector;
import javax.tools.JavaCompiler;
import javax.tools.JavaCompiler.CompilationTask;
import javax.tools.JavaFileObject;
import javax.tools.StandardJavaFileManager;
import javax.tools.ToolProvider;


import authorization.UserService;



public class ScriptResolver {

//	private static String compilePath = ServletContext.class.getClassLoader().getResource("").getPath();
	
	private static Path root;
	
	private static final List<String> options = new ArrayList<String>(Arrays.asList("-verbose"));
	
//	private static  ClassLoader classLoader;
	
	static {
		ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
		URL[] urls = ((URLClassLoader) classLoader).getURLs();
		StringBuilder buf = new StringBuilder(1000);
		buf.append(".");
		String separator = System.getProperty("path.separator");
		for (URL url : urls) {
			buf.append(separator).append(url.getFile());
		}
		options.add("-classpath");
		options.add(buf.toString());

		try {
			root = Files.createTempDirectory("java");
			root = root.getParent();
			options.add("-d");
			options.add(root.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static String compileCode(String JavaName, String JavaCode) {
//		File f = new File(compilePath+"scripts/"+JavaName+".class");
//		System.out.println(compilePath+"scripts/"+JavaName+".class");
//		if(f.exists()){
//			f.delete();
//		}
		if(JavaCode==null){
			return "false";
		}
		Path packagePath = Paths.get(root.toString(), "scripts");
		//System.out.println("*****>>>packagePath:" + packagePath.toString());
	    Path filePath = Paths.get(packagePath.toString(), JavaName + ".java");
	    //System.out.println("*****>>>filePath:" + filePath.toString());
		try {
			Files.createDirectories(packagePath);
			if (!Files.exists(filePath))
				Files.createFile(filePath);
			Files.write(filePath, JavaCode.getBytes());
		} catch (IOException e) {
			e.printStackTrace();
		}
		ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
		URL[] urls = ((URLClassLoader) classLoader).getURLs();
		StringBuilder buf = new StringBuilder(1000);
		buf.append(".");
		String separator = System.getProperty("path.separator");
		for (URL url : urls) {
			buf.append(separator).append(url.getFile());
		}
		options.add("-classpath");
		options.add(buf.toString());
		options.add("-d");
		options.add(root.toString());
		DiagnosticCollector<JavaFileObject> diagnostics = new DiagnosticCollector<JavaFileObject>();
		List<JavaSourceFromString> list = new ArrayList<JavaSourceFromString>();
		list.add((new JavaSourceFromString(JavaName, JavaCode)));
		JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
		StringWriter sw = new StringWriter();
		StandardJavaFileManager fileManager = compiler.getStandardFileManager(null, null, null);
		CompilationTask ct = compiler.getTask(sw, null, diagnostics, options, null, list);
		boolean flag = ct.call();
//		System.out.println(flag);
		if (!flag) {
			StringBuffer error = new StringBuffer();
			for (Diagnostic d : diagnostics.getDiagnostics())
				error.append(d.getLineNumber() + " : " + d+"<br/>");
			//System.out.println("///////////===========**********/////>>>>>" + error.toString());
			return error.toString();
		}
		try {
			fileManager.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "success";
	}

	@SuppressWarnings("unchecked")
	public static Map<String, Object> runCode(String JavaName, CircleDAO dao, Map<String,Object> formData) {
		Map<String,Object> map = null;
//		Path packagePath = Paths.get(root.toString(), "scripts");
//	    Path filePath = Paths.get(packagePath.toString(), JavaName + ".java");
		Class<?> cls= null;
		
//		StringWriter sw = new StringWriter(); 
//        PrintWriter writer = new PrintWriter(sw, true);
		
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
		try {
			URLClassLoader newClassLoader = URLClassLoader.newInstance(new URL[] {root.toUri().toURL()}, classLoader);
			cls = Class.forName("scripts" + "." + JavaName, true, newClassLoader);
		} catch (Exception e) {
			Object code = dao.getObject("select java_code from app_event where java_name=?", 
					new Object[]{JavaName}, String.class);
			if(code==null){
				map.put("errCode", -1);
				map.put("errMsg", "系统找不到脚本指定脚本");
				return map;
			}else{
				if(!compileCode(JavaName,code.toString()).toString().equals("success")){
					map.put("errCode", -1);
					map.put("errMsg", "脚本异常");
					return map;
				}
			}
			//System.out.println(code);
			try {
				URLClassLoader newClassLoader = URLClassLoader.newInstance(new URL[] {root.toUri().toURL()}, classLoader);
				cls = Class.forName("scripts" + "." + JavaName, true, newClassLoader);
			} catch (Exception e1) {
				e1.printStackTrace();
			}
			//e.printStackTrace(writer);
			//e.printStackTrace();
		}
		Object instance = null;
		try {
			Constructor con = cls.getConstructor(Map.class,CircleDAO.class);
			instance = con.newInstance(formData,dao);
//			System.out.println(instance);
		} catch (InstantiationException e) {
//			e.printStackTrace(writer);
			e.printStackTrace();
		} catch (IllegalAccessException e) {
//			e.printStackTrace(writer);
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
//			e.printStackTrace(writer);
			e.printStackTrace();
		} catch (SecurityException e) {
//			e.printStackTrace(writer);
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
//			e.printStackTrace(writer);
			e.printStackTrace();
		} catch (InvocationTargetException e) {
//			e.printStackTrace(writer);
			e.printStackTrace();
		}
		
		for (Method method : cls.getMethods()) {
			if (method.getName().endsWith("execute")) {
				try {
					if (method.getName().startsWith("main")) {
						map = (Map<String, Object>) method.invoke(instance);
					}else{
						method.invoke(instance);
					}
				} catch (IllegalAccessException e) {
//					e.printStackTrace(writer);
					e.printStackTrace();
				} catch (IllegalArgumentException e) {
//					e.printStackTrace(writer);
					e.printStackTrace();
				} catch (InvocationTargetException e) {
//					e.printStackTrace(writer);
					e.printStackTrace();
				} 
			}
		}
		if(map!=null&&map.size()>0){
			if(map.get("errCode")!=null&&(Integer)map.get("errCode")<0){
				Map<String,Object> rmap = new HashMap<String, Object>();
				rmap.put("errMsgs", map.get("errMsgs"));
				rmap.put("created_by", UserService.getCurrentUser().getId());
				rmap.put("created_name", dao.getObject("select name from user where id=?", new Object[]{UserService.getCurrentUser().getId()}, String.class));
				rmap.put("created_date",new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
				rmap.put("className", JavaName);
				rmap.put("name", dao.getObject("select name from app_event where java_name=?", new Object[]{JavaName}, String.class));
				rmap.put("formData", formData);
				try {
					dao.NamedCUDByTableName("app_event_log", rmap);
				} catch (Exception e2) {
					System.out.println("插入脚本错误日志异常");
				}
			}
		}
		return map;
	}
	
	public static String testCode(String JavaName, CircleDAO dao, Map<String,Object> formData){
		PrintStream oldPrintStream = System.out;
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		System.setOut(new PrintStream(bos));
		Map<String,Object> map = runCode(JavaName,dao,formData);
		String exceptions = (map.get("errMsg")==null||map.get("errMsg").toString().equals("success"))?"脚本执行成功":map.get("errMsg").toString();
		System.setOut(oldPrintStream);
		BufferedReader br = new BufferedReader(new StringReader(bos.toString()));
		return bos.toString() + exceptions;
	}
	
	public static String compileTrace(String JavaName, String code){
		PrintStream oldPrintStream = System.out;
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		System.setOut(new PrintStream(bos));
		compileCode(JavaName,code);
		System.setOut(oldPrintStream);
		BufferedReader br = new BufferedReader(new StringReader(bos.toString()));
		return bos.toString();
	}
	
	public static void main(String[] args) throws IOException, Exception {

        StringWriter sw = new StringWriter(); 
        PrintWriter writer = new PrintWriter(sw, true);
		 try { 
	            String aa = ""; 

	            System.out.println(aa.substring(3)); 

	 

	        } catch (Exception e) { 

	            e.printStackTrace(); 

	            e.printStackTrace(writer); 

	            System.out.println("=========="); 

	        } 
		 String str = sw.toString(); 
         System.out.println(str); 
	}
}