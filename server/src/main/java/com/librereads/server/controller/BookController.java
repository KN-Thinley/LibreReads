package com.librereads.server.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import com.librereads.server.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.librereads.server.model.Book;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import com.librereads.server.controller.Ebook;
import com.librereads.server.controller.Ebook.EbookLibrary;


@RestController
@RequestMapping("/api/books")
public class BookController {

    private final EbookLibrary library = new Ebook.EbookLibrary();

    @GetMapping("/{isbn}")
    public Ebook getEbookDetails(@PathVariable String isbn){
        return library.getEbookDetails(isbn);
    }


    @GetMapping("/search")
    public List<String> searchEbooks(@RequestParam String query){
        List<String> isbns = library.search(query);

        if(!isbns.isEmpty()) {
            return isbns;
        }else{
            return List.of("No ebooks found");
        }
    }

    @GetMapping("/books")
    public List<Ebook> getAllBooks() {
        List<Ebook> books = new ArrayList<>(library.ebookDetails.values());
        return books;
    }

    @GetMapping("/random")
    public List<Ebook> getRandomRecommendations(@RequestParam(value = "numberOfBooks", defaultValue = "8") int numberOfBooksToDisplay) {
        Ebook[] randomBooksArray = Ebook.Recommendation.getRandomRecommendations(library, numberOfBooksToDisplay);
        return Arrays.asList(randomBooksArray);
    }

    @GetMapping("/sortByTitleAsc")
    public Ebook[] getBooksSortedByTitleAsc() {
        Ebook[] ebooks = library.ebookDetails.values().toArray(new Ebook[0]);
        library.quickSortByTitleAsc(ebooks, 0, ebooks.length - 1);
        return ebooks;
    }

    @GetMapping("/sortByTitleDesc")
    public Ebook[] sortBooksByTitleDescending() {
        Ebook[] ebooks = library.ebookDetails.values().toArray(new Ebook[0]);
        library.quickSortByTitleDesc(ebooks, 0, ebooks.length - 1);
        return ebooks;
    }

    @GetMapping("/sortByAuthorAsc")
    public Ebook[] getBooksSortedByAuthorAsc() {
        Ebook[] ebooks = library.ebookDetails.values().toArray(new Ebook[0]);
        library.quickSortByAuthorAsc(ebooks, 0, ebooks.length - 1);
        return ebooks;
    }

    @GetMapping("/sortByAuthorDesc")
    public Ebook[] sortBooksByAuthorDescending() {
        Ebook[] ebooks = library.ebookDetails.values().toArray(new Ebook[0]);
        library.quickSortByAuthorDesc(ebooks, 0, ebooks.length - 1);
        return ebooks;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addBook(@RequestBody Ebook ebookRequest) {
        if (ebookRequest.getTitle() == null || ebookRequest.getTitle().isEmpty()
                || ebookRequest.getAuthor() == null || ebookRequest.getAuthor().isEmpty() || ebookRequest.getIsbn() == null || ebookRequest.getIsbn().isEmpty() || ebookRequest.getCoverPage() == null || ebookRequest.getCoverPage().isEmpty() || ebookRequest.getDownloadLink() == null || ebookRequest.getDownloadLink().isEmpty() || ebookRequest.getDescription() == null || ebookRequest.getDescription().isEmpty()
        ) {
            return ResponseEntity.badRequest().body("Incomplete book details. Please provide all required fields.");
        }

        try {
            Ebook ebook = new Ebook(
                    ebookRequest.getTitle(),
                    ebookRequest.getAuthor(),
                    ebookRequest.getIsbn(),
                    ebookRequest.getCoverPage(),
                    ebookRequest.getDownloadLink(),
                    ebookRequest.getDescription()
            );

            library.addEbook(
                    ebook.getTitle(),
                    ebook.getAuthor(),
                    ebook.getIsbn(),
                    ebook.getCoverPage(),
                    ebook.getDownloadLink(),
                    ebook.getDescription()
            );

            return ResponseEntity.status(HttpStatus.CREATED).body("Book added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add book");
        }
    }

    @PutMapping("/{isbn}")
    public ResponseEntity<String> updateEbook(
            @PathVariable String isbn,
            @RequestBody Ebook ebookRequest) {
        // Extract details from the request and update the eBook
        library.updateEbook(
                isbn,
                ebookRequest.getTitle(),
                ebookRequest.getAuthor(),
                ebookRequest.getCoverPage(),
                ebookRequest.getDownloadLink(),
                ebookRequest.getDescription());
        return new ResponseEntity<>("Ebook updated successfully", HttpStatus.OK);
    }

    // API endpoint to remove an eBook
    @DeleteMapping("/{isbn}")
    public ResponseEntity<String> removeEbook(@PathVariable String isbn) {
        library.removeEbook(isbn);
        return new ResponseEntity<>("Ebook removed successfully", HttpStatus.OK);
    }

}
