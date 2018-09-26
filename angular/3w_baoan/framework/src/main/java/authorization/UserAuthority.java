package authorization;

import org.springframework.security.core.GrantedAuthority;

public class UserAuthority implements GrantedAuthority{

	public String getAuthority() {
		// TODO Auto-generated method stub
		return "USER";
	}

}
