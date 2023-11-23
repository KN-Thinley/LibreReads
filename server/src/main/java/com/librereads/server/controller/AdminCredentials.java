package com.librereads.server.controller;

public class AdminCredentials {
    private static final String[] usernames = {"adminUsername1", "adminUsername2"};
    private static final String[] passwords = {"adminPassword1", "adminPassword2"};

    public static boolean isValidCredentials(String username, String password) {
        for (int i = 0; i < usernames.length; i++) {
            if (usernames[i].equals(username) && passwords[i].equals(password)) {
                return true;
            }
        }
        return false;
    }
}

