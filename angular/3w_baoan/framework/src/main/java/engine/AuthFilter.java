package engine;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component("authFilter")
public class AuthFilter implements Filter {
	@Autowired
	@Qualifier("authManager")
	AuthenticationManager authenticationManager;
	@Autowired
	CircleDAO dao;
	@Override
	public void destroy() {
		// TODO Auto-generated method stub

	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
	    HttpSession session = request.getSession();
	    String token = request.getHeader("token");
		if(token!=null){
			List<GrantedAuthority> grantedAuths = new ArrayList<GrantedAuthority>();
			grantedAuths.add(new SimpleGrantedAuthority("USER"));
			String sql = "select password from user where login_name=?";
			String password = dao.getObject(sql, new Object[]{token}, String.class).toString();
//			System.out.println(password);
			UsernamePasswordAuthenticationToken authRequest = 
					new UsernamePasswordAuthenticationToken(token, password, grantedAuths);
			// Authenticate the user
		    Authentication authentication = authenticationManager.authenticate(authRequest);
			//System.out.println("tokenFilter:身份验证成功!");
		    SecurityContext securityContext = SecurityContextHolder.getContext();
		    securityContext.setAuthentication(authentication);
		    session.setAttribute("SPRING_SECURITY_CONTEXT", securityContext);

		}
		chain.doFilter(req,res);
	}
	
	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub

	}

}
