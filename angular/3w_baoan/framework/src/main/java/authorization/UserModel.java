package authorization;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class UserModel extends User {
	private int id;
	private String email;
	private String emailpassword;
	private int groupId;
	private int roleId;
	private String salt;  
	  
    public UserModel(int id,String username, String password, boolean enabled,  
            boolean accountNonExpired, boolean credentialsNonExpired,  
            boolean accountNonLocked,  
            Collection<? extends GrantedAuthority> authorities, String salt, int groupId, int roleId,String email,String emailpassword) {  
        super(username, password, enabled, accountNonExpired,  
                credentialsNonExpired, accountNonLocked, authorities);  
        this.salt = salt;  
        this.id = id;
        this.email = email;  
        this.emailpassword = emailpassword;
        this.groupId = groupId;
        this.roleId = roleId;
    }  
    
    public int getGroupId() {
		return groupId;
	}

	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}

	public int getRoleId() {
		return roleId;
	}

	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getSalt() {  
        return salt;  
    }  
  
    public void setSalt(String salt) {  
        this.salt = salt;  
    }

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getEmailpassword() {
		return emailpassword;
	}

	public void setEmailpassword(String emailpassword) {
		this.emailpassword = emailpassword;
	}
    
}
