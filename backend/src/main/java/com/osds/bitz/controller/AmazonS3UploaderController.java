package com.osds.bitz.controller;

import com.osds.bitz.service.AmazonS3UploaderService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
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
    private final AmazonS3UploaderService amazonS3UploaderService;

    @Value("${cloud.aws.s3.bucket}")
    public String bucket;  // S3 버킷 이름

    @PostMapping("/userprofile")
    @ApiOperation(value = "사용자 프로필 이미지 저장", notes = "사용자 프로필 이미지를 AMAZON S3에 저장합니다.")
    public String uploadUserProfile(@RequestParam("images") MultipartFile multipartFile) throws IOException {
        String responseURL = amazonS3UploaderService.upload(multipartFile, "userprofile");
        log.info("{}", responseURL);
        return responseURL;
    }

    @PostMapping("/businessauth")
    @ApiOperation(value = "사업자등록증 이미지 저장", notes = "사용자등록증 이미지를 AMAZON S3에 저장합니다.")
    public String uploadBusinessAuth(@RequestParam("images") MultipartFile multipartFile) throws IOException {
        String responseURL = amazonS3UploaderService.upload(multipartFile, "businessauth");
        log.info("{}", responseURL);
        return responseURL;
    }

    @PostMapping("/businessprofile")
    @ApiOperation(value = "사업자 프로필 이미지 저장", notes = "사업자 프로필 이미지를 AMAZON S3에 저장합니다.")
    public String uploadBusinessProfile(@RequestParam("images") MultipartFile multipartFile) throws IOException {
        String responseURL = amazonS3UploaderService.upload(multipartFile, "businessprofile");
        log.info("{}", responseURL);
        return responseURL;
    }

    @PostMapping("/gym")
    @ApiOperation(value = "체육관 이미지 저장", notes = "체육관 이미지를 AMAZON S3에 저장합니다.")
    public String uploadGym(@RequestParam("images") MultipartFile multipartFile) throws IOException {
        String responseURL = amazonS3UploaderService.upload(multipartFile, "gym");
        log.info("{}", responseURL);
        return responseURL;
    }
}
