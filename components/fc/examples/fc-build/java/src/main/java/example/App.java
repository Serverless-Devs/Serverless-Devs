package example;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import com.aliyun.fc.runtime.Context;
import com.aliyun.fc.runtime.StreamRequestHandler;
import com.aliyun.fc.runtime.FunctionInitializer;

/**
 * Hello world!
 *
 */
public class App implements StreamRequestHandler, FunctionInitializer {

    public void initialize(Context context) throws IOException {
        //TODO
    }

    @Override
    public void handleRequest(
            InputStream inputStream, OutputStream outputStream, Context context) throws IOException {
        outputStream.write(new String("hello world\n").getBytes());
    }
}
