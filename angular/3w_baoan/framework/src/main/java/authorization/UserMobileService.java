package authorization;

import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.codec.Utf8;

import engine.CircleDAO;

public class UserMobileService implements UserDetailsService {
	@Autowired
	CircleDAO dao;
	private boolean getExist(String username){
		String sql = "select count(1) from user where login_name='"+username+"'";
		return dao.getCount(sql, null)>0;
	}
	public Map<String, Object> getUser(String username){
		String sql = "select u.id,password,salt,userType,gu.group_id,gu.role_id,isfull(u.email,'') email,isfull(u.emailpassword,'') emailpassword from user u "
				+ "left join group_user gu on u.id = gu.user_id and is_primary=1 "
				+ "where login_name='"+username+"'";
		return dao.getMap(sql, null);
	}
	public UserDetails loadUserByUsername(String username){
		UserModel user = null;  
        try {  
            if (getExist(username)){
    			Map<String, Object> userMap = getUser(username);
    	        Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();  
    			authorities.add((new SimpleGrantedAuthority(userMap.get("userType").toString())));
    			String password = userMap.get("password").toString();
    			String salt = userMap.get("salt").toString();
    			int groupId = userMap.get("group_id")==null?0:(Integer)userMap.get("group_id");
    			int roleId = userMap.get("role_id")==null?0:(Integer)userMap.get("role_id");
    			int id = (Integer)userMap.get("id");
    			String email = "";
    			if(userMap.get("email")==null){
    				email = "";
    			}else{
    				email = userMap.get("email").toString();
    			}
    			String emailpassword = "";
    			if(userMap.get("emailpassword")==null){
    				emailpassword = "";
    			}else{
    				emailpassword = userMap.get("emailpassword").toString();
    			}
    			user = new UserModel(id, username, password, true, true, true, true, 
    					authorities, salt, groupId, roleId,email,emailpassword);
            }
            else{
                throw new UsernameNotFoundException("�û�" + username + "������!"); 
            }
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
		return user;
	}
	public static UserModel getCurrentUser(){
		return (UserModel)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	}
	public CircleDAO getDao() {
		return dao;
	}
	public void setDao(CircleDAO dao) {
		this.dao = dao;
	}
	
}
