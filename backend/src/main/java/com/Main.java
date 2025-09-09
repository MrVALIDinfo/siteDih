package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.context.WebServerInitializedEvent;
import org.springframework.context.event.EventListener;

import java.net.InetAddress;

@SpringBootApplication
public class Main {

    private int port;

    @EventListener
    public void onWebServerReady(WebServerInitializedEvent event) {
        this.port = event.getWebServer().getPort();
        try {
            String ip = InetAddress.getLocalHost().getHostAddress();
            System.out.println("Application is running at http://" + ip + ":" + port);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}
