package engine;

import java.util.HashMap;
import java.util.Map;

public class Circles {
	protected String circlesId;
	protected Map<String,String> sqlMap = new HashMap<String, String>();
	public Map<String, String> getSqlMap() {
		return sqlMap;
	}
	public void setSqlMap(Map<String, String> sqlMap) {
		this.sqlMap = sqlMap;
	}
	public String getSqlBySqlKey(String key){
		return sqlMap.get(key);
	}
	public String get(String key){
		return sqlMap.get(key);
	}
	public String getId(){
		return circlesId;
	}
	public void setCirclesId(String circlesId) {
		this.circlesId = circlesId;
	}
	public void addSql(String id,String sql){
		sqlMap.put(id,sql);
	}
}
