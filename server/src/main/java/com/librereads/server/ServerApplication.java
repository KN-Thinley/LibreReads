package com.librereads.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import com.librereads.server.controller.Ebook;
import com.librereads.server.controller.Ebook.EbookLibrary;



@SpringBootApplication
public class ServerApplication {
	@Bean
	public Ebook.EbookLibrary ebookLibrary() {
		return new EbookLibrary();
	}
	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}


}
