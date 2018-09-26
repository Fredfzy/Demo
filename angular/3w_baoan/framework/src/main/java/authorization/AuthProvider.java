package authorization;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import engine.CircleDAO;

public class AuthProvider extends AbstractUserDetailsAuthenticationProvider{
	@Autowired
	CircleDAO dao;

	@Override
	protected void additionalAuthenticationChecks(UserDetails userDetails,
			UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected UserDetails retrieveUser(String username, UsernamePasswordAuthenticationToken authentication)
			throws AuthenticationException {
        Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();  
		authorities.add((new SimpleGrantedAuthority("USER")));
		String sql = "select u.id,password,salt,userType,gu.group_id,gu.role_id,isfull(u.email,'') email,isfull(u.emailpassword,'') emailpassword  from user u "
				+ "left join group_user gu on u.id = gu.user_id and is_primary=1 "
				+ "where login_name='"+username+"'";
		Map<String, Object> userMap = dao.getMap(sql, null);
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
		UserModel user = new UserModel(id, username, password, true, true, true, true, 
				authorities, salt, groupId, roleId,email,emailpassword);
		return user;
	}
	
}
