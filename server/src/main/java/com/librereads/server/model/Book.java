package com.librereads.server.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "books")
public class Book {
    @Id
    private String id;
    private String title;
    private String author;
    private String isbn;
    private String description;
    private String cover;

    private String fileUrl;

    public Book() {
    }   

    public Book(String title, String author, String isbn, String description, String cover, String fileUrl) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.description = description;
        this.cover = cover;
        this.fileUrl = fileUrl;
    }

    @Override
    public String toString() {
    return "Book{" +
           "id='" + id + '\'' +
           ", title='" + title + '\'' +
           ", author='" + author + '\'' +
           ", isbn='" + isbn + '\'' +
           ", description='" + description + '\'' +
           ", cover='" + cover + '\'' +
              ", fileUrl='" + fileUrl + '\'' +
           '}';
    }

    public String getId() {
    return id;
    }

    public void setId(String id) {
    this.id = id;
    }

    public String getTitle() {
    return title;
    }

    public void setTitle(String title) {
    this.title = title;
    }

    public String getAuthor() {
    return author;
    }

    public void setAuthor(String author) {
    this.author = author;
    }

    public String getIsbn() {
    return isbn;
    }

    public void setIsbn(String isbn) {
    this.isbn = isbn;
    }

    public String getDescription() {
    return description;
    }

    public void setDescription(String description) {
    this.description = description;
    }

    public String getCover() {
    return cover;
    }

    public void setCover(String cover) {
    this.cover = cover;
    }

    public String getFileUrl() {
    return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
    this.fileUrl = fileUrl;
    }
}
