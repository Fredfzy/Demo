package engine;

import java.net.URI;

import javax.tools.SimpleJavaFileObject;
import javax.tools.JavaFileObject.Kind;

public class JavaSourceFromString extends SimpleJavaFileObject {
	final String code;
	JavaSourceFromString(String name, String code) {
		super(URI.create("string:///" + name.replace('.', '/') + Kind.SOURCE.extension), Kind.SOURCE);
		System.out.println("string:///" + name.replace('.', '/') + Kind.SOURCE.extension);
		this.code = code;
	}

	@Override
	public CharSequence getCharContent(boolean ignoreEncodingErrors) {
		return code;
	}
}
