package authorization;

import org.springframework.security.core.context.SecurityContextHolder;

public class UserInfo {
	public static UserModel getCurrentUser(){
		return (UserModel)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	}
}
