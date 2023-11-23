package com.librereads.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.librereads.server.model.Book;
import java.util.List;

public interface BookRepository extends MongoRepository<Book, String> {
       List<Book> findByTitleOrAuthor(String title, String author);
       Book findByIsbn(String isbn);
       List<Book> findByAuthorOrderByTitleAsc(String author);
       List<Book> findByTitleContaining(String title);

}

