package authorization;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class UserAuthenticationFilter extends UsernamePasswordAuthenticationFilter{
    public static final String SPRING_SECURITY_FORM_USERNAME_KEY = "j_username";  
    public static final String SPRING_SECURITY_FORM_PASSWORD_KEY = "j_password";  
    public static final String SPRING_SECURITY_FORM_REDERICT_KEY = "spring-security-redirect";  
    /**  
     * @deprecated If you want to retain the username, cache it in a customized {@code AuthenticationFailureHandler}  
     */  
    @Deprecated  
    public static final String SPRING_SECURITY_LAST_USERNAME_KEY = "SPRING_SECURITY_LAST_USERNAME";  

    private String usernameParameter = SPRING_SECURITY_FORM_USERNAME_KEY;  
    private String passwordParameter = SPRING_SECURITY_FORM_PASSWORD_KEY;  
    private String redirectParameter = SPRING_SECURITY_FORM_REDERICT_KEY;  
    private boolean postOnly = true;  
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {  
        if (postOnly && !request.getMethod().equals("POST")) {  
            throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());  
        }  
        String username = obtainUsername(request);  
        String password = obtainPassword(request);   
        if (username == null) {  
            username = "";  
        }  
        if (password == null) {  
            password = "";  
        }  
        username = username.trim();  
        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username, password);  
        // Allow subclasses to set the "details" property  
        setDetails(request, authRequest);  
        return this.getAuthenticationManager().authenticate(authRequest);  
    }  
    protected String obtainUsername(HttpServletRequest request) {  
        return request.getParameter(usernameParameter);  
    }  
    protected String obtainPassword(HttpServletRequest request) {  
        return request.getParameter(passwordParameter);  
    }   
    protected void setDetails(HttpServletRequest request, UsernamePasswordAuthenticationToken authRequest) {  
        authRequest.setDetails(authenticationDetailsSource.buildDetails(request));  
    }  
    
}
