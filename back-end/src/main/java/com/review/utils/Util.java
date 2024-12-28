package com.review.utils;

public class Util {
    final static public String getPath(String fileName) {
        String basePath = "classpath:reportsFile/";
        if (System.getenv("BASEREPORT") != null) basePath = System.getenv("BASEREPORT");
        if (!basePath.endsWith("/")) basePath += "/";
        return basePath + fileName;
    }

}
