package engine;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

public class UpdateDB implements InitializingBean{
	@Autowired
	CircleDAO dao;
	String[] sqls = {
			"alter table _mod_view add column frontScript text"
			};
	@Override
	public void afterPropertiesSet() throws Exception {
		String rootPath = System.getProperty("rootPath")+"\\license\\";
//		if(!License.ValidateExpDate(rootPath+"expiration")){
//			while(true){}
//		}
		JdbcTemplate jt = dao.getJdbcTemplate();
		for(String sql:sqls){
			try{
				jt.execute(sql);
			}catch(Exception e){
				
			}
		}
	}
}
