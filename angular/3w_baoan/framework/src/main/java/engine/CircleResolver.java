package engine;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.apache.commons.digester.Digester;
import org.xml.sax.SAXException;

public class CircleResolver {
	public static void main(String[] args) {
		CircleResolver.resolve("AdminCircle");
	}
	public static Circles resolve(String configName){
		Digester digester = new Digester();
		digester.addObjectCreate("sql-map", Circles.class);
		digester.addSetProperties("sql-map", "id", "circlesId");
		digester.addCallMethod("sql-map/sql", "addSql", 2);
		digester.addCallParam("sql-map/sql/sql-key", 0);
		digester.addCallParam("sql-map/sql/sql-value", 1);
		BufferedReader bf = null;
		InputStream is = null;
		is = CircleResolver.class.getResourceAsStream("/circles/"+configName+".xml");
		bf = new BufferedReader(new InputStreamReader(is));
		//bf = new BufferedReader(new FileReader((new ClassPathResource("circles/"+configName+".xml")).getFile()));
		Circles circles = null;
		try {
			circles = (Circles) digester.parse(bf);
		} catch (SAXException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return circles;
	}
}
