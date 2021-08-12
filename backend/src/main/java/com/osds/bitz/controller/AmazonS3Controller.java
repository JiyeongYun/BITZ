package com.osds.bitz.controller;

import com.osds.bitz.service.AmazonS3Service;
import com.sun.mail.iap.Response;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
@Api("Amazon S3 컨트롤러 API V1")
@RequestMapping("/amazons3")
@Slf4j
public class AmazonS3Controller {
    private final AmazonS3Service amazonS3Service;

    @Value("${cloud.aws.s3.bucket}")
    public String bucket;  // S3 버킷 이름

    /**
     파일 업로드
     */
    @PostMapping("/userprofile/upload")
    @ApiOperation(value = "사용자 프로필 이미지 저장", notes = "사용자 프로필 이미지를 AMAZON S3에 저장합니다.")
    public String uploadUserProfile(@RequestParam("images") MultipartFile multipartFile) throws IOException {
        String responseURL = amazonS3Service.upload(multipartFile, "userprofile");
        log.info("{}", responseURL);
        return responseURL;
    }

    @PostMapping("/businessauth/upload")
    @ApiOperation(value = "사업자등록증 이미지 저장", notes = "사용자등록증 이미지를 AMAZON S3에 저장합니다.")
    public String uploadBusinessAuth(@RequestParam("images") MultipartFile multipartFile) throws IOException {
        String responseURL = amazonS3Service.upload(multipartFile, "businessauth");
        log.info("{}", responseURL);
        return responseURL;
    }

    @PostMapping("/businessprofile/upload")
    @ApiOperation(value = "사업자 프로필 이미지 저장", notes = "사업자 프로필 이미지를 AMAZON S3에 저장합니다.")
    public String uploadBusinessProfile(@RequestParam("images") MultipartFile multipartFile) throws IOException {
        String responseURL = amazonS3Service.upload(multipartFile, "businessprofile");
        log.info("{}", responseURL);
        return responseURL;
    }

    @PostMapping("/gym/upload")
    @ApiOperation(value = "체육관 이미지 저장", notes = "체육관 이미지를 AMAZON S3에 저장합니다.")
    public String uploadGym(@RequestParam("images") MultipartFile multipartFile) throws IOException {
        String responseURL = amazonS3Service.upload(multipartFile, "gym");
        log.info("{}", responseURL);
        return responseURL;
    }

    /**
     파일 출력
     */
    @PostMapping("/userprofile/get")
    @ApiOperation(value = "사용자 프로필 이미지 출력", notes = "사용자 프로필 이미지를 AMAZON S3에서 출력합니다.")
    public ResponseEntity getGym(@RequestParam("email") String email) throws IOException {
        String url ="7caff654-69b7-47b1-a3e9-89c0693f3d35emogi_se.jpg"; // 테이블 구축 전 임시로
        log.info("url{}:",url);
        ResponseEntity response = amazonS3Service.get("userprofile", url);
        log.info("response{}:", response);
        return response;
    }

    /**
     파일 수정
     */
    @PutMapping("/userprofile")

    /**
     파일 삭제
     */
    @DeleteMapping("/userprofile")
    @ApiOperation(value = "사용자 프로필 이미지 삭제", notes = "사용자 프로필 이미지를 AMAZON S3에서 삭제합니다.")
    public String deleteUserProfile(@RequestParam("email") String email) throws IOException {
        String url ="2a6bb495-3984-40d5-9ff5-75775a727e11emogi_se.jpg"; // 테이블 구축 전 임시로
        log.info("url{}:",url);
        amazonS3Service.delete("userprofile", url);
        return "삭제 성공";
    }
}
