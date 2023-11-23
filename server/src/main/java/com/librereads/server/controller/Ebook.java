package com.librereads.server.controller;
import java.util.*;
import java.io.*;


public class Ebook {
    private String title;
    private String author;
    private String isbn;
    private String coverPage;
    private String downloadLink;
    private String description;

    public Ebook(String title, String author, String isbn, String coverPage, String downloadLink, String description){
        this.author = author;
        this.title = title;
        this.isbn = isbn;
        this.coverPage = coverPage;
        this.downloadLink = downloadLink;
        this.description = description;
    }

    public String getTitle(){
        return title;
    }
    public String getAuthor(){
        return author;
    }
    public String getIsbn(){
        return isbn;
    }
    public String getCoverPage(){
        return coverPage;
    }
    public String getDownloadLink(){
        return downloadLink;
    }
    public String getDescription(){
        return description;
    }


    public void setTitle(String title){
        this.title = title;
    }
    public void setAuthor(String author){
        this.author = author;
    }
    public void setIsbn(String isbn){
        this.isbn = isbn;
    }
    public void setCoverPage(String coverPage){
        this.coverPage = coverPage;
    }
    public void setDownloadLink(String downloadLink){
        this.downloadLink = downloadLink;
    }
    public void setDescription(String description){
        this.description = description;
    }


    public static class EbookLibrary{
        HashMap<String, Ebook> ebookDetails = new HashMap<>();

        Hashtable eBookDetails = new Hashtable();
        private TrieNode root = new TrieNode();
        public EbookLibrary(){
            readBooksFromCSV("src/main/java/com/librereads/server/controller/books.csv");
        }
        public void readBooksFromCSV(String csvFile) {
            String line = "";
            String csvSplitBy = ",";

            try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
                // Skip the header line if present
                br.readLine();

                while ((line = br.readLine()) != null) {
                    String[] data = line.split(csvSplitBy);
                    addEbook(data[0], data[1], data[2], data[3], data[4], data[5]);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }



        public void addEbook(String title, String author, String isbn, String coverPage, String downloadLink, String description){
            Ebook ebook = new Ebook(title, author, isbn, coverPage, downloadLink, description);
            ebookDetails.put(isbn, ebook);

            insert(title,isbn);
            insert(author,isbn);



            eBookDetails.print();
        }

        public void updateEbook(String isbn, String title, String author, String coverPage, String downloadLink, String description) {
            if (ebookDetails.containsKey(isbn)) {
                Ebook ebook = ebookDetails.get(isbn);
                ebook.setTitle(title);
                ebook.setAuthor(author);
                ebook.setCoverPage(coverPage);
                ebook.setDownloadLink(downloadLink);
                ebook.setDescription(description);
                // Optionally, update the TrieNode if needed
                // For example, if the title or author changes, you might need to update the Trie
            } else {
                // Handle case where the ISBN doesn't exist
                System.out.println("Ebook with ISBN " + isbn + " doesn't exist in the library.");
            }
        }

        // Remove an eBook from the HashMap
        public void removeEbook(String isbn) {
            if (ebookDetails.containsKey(isbn)) {
                ebookDetails.remove(isbn);
                // Optionally, remove references from TrieNode if needed
            } else {
                // Handle case where the ISBN doesn't exist
                System.out.println("Ebook with ISBN " + isbn + " doesn't exist in the library.");
            }
        }

        public Ebook getEbookDetails(String isbn){
            return ebookDetails.get(isbn);
        }


        private void insert(String keyword, String isbn) {
            TrieNode node = root;
            keyword = keyword.toLowerCase();

            for (char c : keyword.toCharArray()) {
                node.children.putIfAbsent(c, new TrieNode());
                node = node.children.get(c);

                // Store the ISBN at the current node, not just at the end of the word
                node.bookId = isbn;
            }
        }


        public List<String> search(String query) {
            query = query.toLowerCase();
            List<String> results = new ArrayList<>();

            TrieNode node = root;
            for (char c : query.toCharArray()) {
                if (!node.children.containsKey(c)) {
                    return results; // No matches found
                }
                node = node.children.get(c);
            }


            findAllISBNs(node, results);
            return results;
        }

        private void findAllISBNs(TrieNode node, List<String> results) {
            if (node.isEndOfWord) {
                results.add(node.bookId);
            }

            for (char c : node.children.keySet()) {
                findAllISBNs(node.children.get(c), results);
            }
        }


        public void sortEbooksByTitleAscending() {
            Ebook[] ebooks = ebookDetails.values().toArray(new Ebook[0]);
            quickSortByTitleAsc(ebooks, 0, ebooks.length - 1);

            for (Ebook ebook : ebooks) {
                System.out.println("Title: " + ebook.getTitle());
                System.out.println("Author: " + ebook.getAuthor());
            }
        }

        void quickSortByTitleAsc(Ebook[] ebooks, int low, int high) {
            if (low < high) {
                int pi = partitionByTitleAsc(ebooks, low, high);
                quickSortByTitleAsc(ebooks, low, pi - 1);
                quickSortByTitleAsc(ebooks, pi + 1, high);
            }
        }

        private int partitionByTitleAsc(Ebook[] ebooks, int low, int high) {
            String pivot = ebooks[high].getTitle();
            int i = low - 1;
            for (int j = low; j < high; j++) {
                if (ebooks[j].getTitle().compareTo(pivot) < 0) {
                    i++;
                    Ebook temp = ebooks[i];
                    ebooks[i] = ebooks[j];
                    ebooks[j] = temp;
                }
            }
            Ebook temp = ebooks[i + 1];
            ebooks[i + 1] = ebooks[high];
            ebooks[high] = temp;
            return i + 1;
        }

        public void sortEbooksByTitleDescending() {
            Ebook[] ebooks = ebookDetails.values().toArray(new Ebook[0]);
            quickSortByTitleDesc(ebooks, 0, ebooks.length - 1);

            for (Ebook ebook : ebooks) {
                System.out.println("Title: " + ebook.getTitle());
                System.out.println("Author: " + ebook.getAuthor());
            }
        }

        void quickSortByTitleDesc(Ebook[] ebooks, int low, int high) {
            if (low < high) {
                int pi = partitionByTitleDesc(ebooks, low, high);
                quickSortByTitleDesc(ebooks, low, pi - 1);
                quickSortByTitleDesc(ebooks, pi + 1, high);
            }
        }

        private int partitionByTitleDesc(Ebook[] ebooks, int low, int high) {
            String pivot = ebooks[high].getTitle();
            int i = low - 1;
            for (int j = low; j < high; j++) {
                if (ebooks[j].getTitle().compareTo(pivot) > 0) {
                    i++;
                    Ebook temp = ebooks[i];
                    ebooks[i] = ebooks[j];
                    ebooks[j] = temp;
                }
            }
            Ebook temp = ebooks[i + 1];
            ebooks[i + 1] = ebooks[high];
            ebooks[high] = temp;
            return i + 1;
        }


        public void sortEbooksByAuthorAscending() {
            Ebook[] ebooks = ebookDetails.values().toArray(new Ebook[0]);
            quickSortByAuthorAsc(ebooks, 0, ebooks.length - 1);

            for (Ebook ebook : ebooks) {
                System.out.println("Title: " + ebook.getTitle());
                System.out.println("Author: " + ebook.getAuthor());
            }
        }

        void quickSortByAuthorAsc(Ebook[] ebooks, int low, int high) {
            if (low < high) {
                int pi = partitionByAuthorAsc(ebooks, low, high);
                quickSortByAuthorAsc(ebooks, low, pi - 1);
                quickSortByAuthorAsc(ebooks, pi + 1, high);
            }
        }

        private int partitionByAuthorAsc(Ebook[] ebooks, int low, int high) {
            String pivot = ebooks[high].getAuthor();
            int i = low - 1;
            for (int j = low; j < high; j++) {
                if (ebooks[j].getAuthor().compareTo(pivot) < 0) {
                    i++;
                    Ebook temp = ebooks[i];
                    ebooks[i] = ebooks[j];
                    ebooks[j] = temp;
                }
            }
            Ebook temp = ebooks[i + 1];
            ebooks[i + 1] = ebooks[high];
            ebooks[high] = temp;
            return i + 1;
        }



        public void sortEbooksByAuthorDescending() {
            Ebook[] ebooks = ebookDetails.values().toArray(new Ebook[0]);
            quickSortByAuthorDesc(ebooks, 0, ebooks.length - 1);

            for (Ebook ebook : ebooks) {
                System.out.println("Title: " + ebook.getTitle());
                System.out.println("Author: " + ebook.getAuthor());
            }
        }

        void quickSortByAuthorDesc(Ebook[] ebooks, int low, int high) {
            if (low < high) {
                int pi = partitionByAuthorDesc(ebooks, low, high);
                quickSortByAuthorDesc(ebooks, low, pi - 1);
                quickSortByAuthorDesc(ebooks, pi + 1, high);
            }
        }

        private int partitionByAuthorDesc(Ebook[] ebooks, int low, int high) {
            String pivot = ebooks[high].getAuthor();
            int i = low - 1;
            for (int j = low; j < high; j++) {
                if (ebooks[j].getAuthor().compareTo(pivot) > 0) {
                    i++;
                    Ebook temp = ebooks[i];
                    ebooks[i] = ebooks[j];
                    ebooks[j] = temp;
                }
            }
            Ebook temp = ebooks[i + 1];
            ebooks[i + 1] = ebooks[high];
            ebooks[high] = temp;
            return i + 1;
        }

        private void findAllISBNs(TrieNode node, String query, List<String> results){
            if (node.isEndOfWord){
                results.add(node.bookId);
            }

            for (char c: node.children.keySet()){
                findAllISBNs(node.children.get(c), query + c, results);
            }
        }
        private static class TrieNode{

            private HashMap<Character, TrieNode> children = new HashMap<>();
            private boolean isEndOfWord;
            private String bookId;
        }

        public class Hashtable {
            private static final int INITIAL_CAPACITY = 1000; // Initial capacity of the hashtable
            private Entry[] table; // Array of Entry objects

            public Hashtable() {
                table = new Entry[INITIAL_CAPACITY];
            }

            public void put(String key, Ebook value) {
                int hash = getHash(key);
                Entry entry = new Entry(key, value);

                // If the slot is empty, assign the entry
                if (table[hash] == null) {
                    table[hash] = entry;
                } else {
                    // If the slot is not empty, handle collision by chaining (using linked list)
                    Entry current = table[hash];
                    while (current.next != null) {
                        current = current.next;
                    }
                    current.next = entry;
                }
            }

            public void print(){
                System.out.println("printing");
            }

            public Ebook get(String key) {
                int hash = getHash(key);

                if (table[hash] != null) {
                    Entry current = table[hash];
                    while (current != null) {
                        if (current.key.equals(key)) {
                            return current.value;
                        }
                        current = current.next;
                    }
                }
                return null; // Key not found
            }

            // Hash function to generate the hash code for a given key
            private int getHash(String key) {
                return key.hashCode() % INITIAL_CAPACITY;
            }

            // Entry class to store key-value pairs
            private static class Entry {
                String key;
                Ebook value;
                Entry next; // For handling collisions using chaining (linked list)

                Entry(String key, Ebook value) {
                    this.key = key;
                    this.value = value;
                }
            }

            public Collection<Ebook> values() {
                // Count the number of values in the table
                int count = 0;
                for (Entry entry : table) {
                    Entry current = entry;
                    while (current != null) {
                        count++;
                        current = current.next;
                    }
                }

                // Create an array of Ebook values
                Ebook[] valuesArray = new Ebook[count];
                int index = 0;
                for (Entry entry : table) {
                    Entry current = entry;
                    while (current != null) {
                        valuesArray[index++] = current.value;
                        current = current.next;
                    }
                }

                // Return an unmodifiable collection using the array
                return java.util.Arrays.asList(valuesArray);
            }
        }

    }

public static class Recommendation {
    public static Ebook[] fisherYatesShuffle(Ebook[] array) {
        Random rand = new Random();
        for (int i = array.length - 1; i > 0; i--) {
            int randomIndex = rand.nextInt(i + 1);
            Ebook temp = array[i];
            array[i] = array[randomIndex];
            array[randomIndex] = temp;
        }
        return array;
    }

    public static Ebook[] selectRandomBooks(Ebook[] values, int numberOfBooksToSelect) {
        Ebook[] duplicateValues = Arrays.copyOf(values, values.length);
        Ebook[] shuffledEbooks = fisherYatesShuffle(duplicateValues);
        Ebook[] selectedBooks = Arrays.copyOfRange(shuffledEbooks, 0, Math.min(numberOfBooksToSelect, shuffledEbooks.length));
        return selectedBooks;
    }

    public static Ebook[] getRandomRecommendations(EbookLibrary library, int numberOfBooksToDisplay) {
        Ebook[] ebookArray = library.ebookDetails.values().toArray(new Ebook[0]);
        return selectRandomBooks(ebookArray, numberOfBooksToDisplay);
    }

    public static void main(String[] args) {
        EbookLibrary library = new EbookLibrary();
        int numberOfBooksToDisplay = 2;
        Ebook[] homepageBooks = getRandomRecommendations(library, numberOfBooksToDisplay);

        System.out.println("Books on the Homepage:");
        for (Ebook ebook : homepageBooks) {
            System.out.println("Title: " + ebook.getTitle());
            System.out.println("Author: " + ebook.getAuthor());
        }
    }
}

}
