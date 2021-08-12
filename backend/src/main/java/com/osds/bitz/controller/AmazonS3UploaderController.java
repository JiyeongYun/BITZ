package com.osds.bitz.controller;

import com.osds.bitz.service.AmazonS3UploaderService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
@Api("Amazon S3 컨트롤러 API V1")
@RequestMapping("amazons3/upload")
@Slf4j
public class AmazonS3UploaderController {
    private final AmazonS3UploaderService amazonS3UploaderService3Uploader;

    @PostMapping("/userprofile")
    public String uploadUserProfile(@RequestParam("images") MultipartFile multipartFile) throws IOException {
        amazonS3UploaderService3Uploader.upload(multipartFile, "userprofile");
        return "사용자 프로필 이미지 업로드 완료";
    }

    @PostMapping("/businessauth")
    public String uploadBusinessAuth(@RequestParam("images") MultipartFile multipartFile) throws IOException {
        amazonS3UploaderService3Uploader.upload(multipartFile, "businessauth");
        return "사업자등록증 이미지 업로드 완료";
    }

    @PostMapping("/businessprofile")
    public String uploadBusinessProfile(@RequestParam("images") MultipartFile multipartFile) throws IOException {
        amazonS3UploaderService3Uploader.upload(multipartFile, "businessprofile");
        return "사업자 프로필 이미지 업로드 완료";
    }

    @PostMapping("/gym")
    public String uploadGym(@RequestParam("images") MultipartFile multipartFile) throws IOException {
        amazonS3UploaderService3Uploader.upload(multipartFile, "gym");
        return "체육관 이미지 업로드 완료";
    }
}
