package com.osds.bitz.controller;

import com.osds.bitz.service.AmazonS3Service;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
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
     * 파일 업로드
     */
    @PostMapping("/userprofile/upload")
    @ApiOperation(value = "사용자 프로필 이미지 저장", notes = "사용자 프로필 이미지를 AMAZON S3에 저장합니다.")
    public ResponseEntity uploadUserProfile(@RequestParam(value = "email") String email, @RequestParam("images") MultipartFile multipartFile) throws IOException {
        amazonS3Service.upload(email, multipartFile, "userprofile");
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/businessauth/upload")
    @ApiOperation(value = "사업자등록증 이미지 저장", notes = "사용자등록증 이미지를 AMAZON S3에 저장합니다.")
    public ResponseEntity uploadBusinessAuth(@RequestParam(value = "email") String email, @RequestParam("images") MultipartFile multipartFile) throws IOException {
        amazonS3Service.upload(email, multipartFile, "businessauth");
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/businessprofile/upload")
    @ApiOperation(value = "사업자 프로필 이미지 저장", notes = "사업자 프로필 이미지를 AMAZON S3에 저장합니다.")
    public ResponseEntity uploadBusinessProfile(@RequestParam(value = "email") String email,@RequestParam("images") MultipartFile multipartFile) throws IOException {
        amazonS3Service.upload(email, multipartFile, "businessprofile");
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/gym/upload")
    @ApiOperation(value = "체육관 이미지 저장", notes = "체육관 이미지를 AMAZON S3에 저장합니다.")
    public ResponseEntity uploadGym(@RequestParam(value = "gymId") String gymId, @RequestParam("images") MultipartFile multipartFile) throws IOException {
        amazonS3Service.upload(gymId, multipartFile, "gym");
        return new ResponseEntity(HttpStatus.OK);
    }

    /**
     * 파일 출력
     */
    @PostMapping("/userprofile/get")
    @ApiOperation(value = "사용자 프로필 이미지 출력", notes = "사용자 프로필 이미지를 AMAZON S3에서 출력합니다.")
    public ResponseEntity getGym(@RequestParam("email") String email) throws IOException {
        return amazonS3Service.get("userprofile", email);
    }

    @PostMapping("/businessauth/get")
    @ApiOperation(value ="사업자등록증 이미지 출력", notes ="사업자등록증 이미지를 AMAZON S3에서 출력합니다.")
    public ResponseEntity getBusinessAuth(@RequestParam("email") String email) throws IOException{
        return amazonS3Service.get("businessauth", email);
    }

    @PostMapping("/businessprofile/get")
    @ApiOperation(value = "사업자 프로필 이미지 출력", notes = "사업자 프로필 이미지를 AMAZON S3에서 출력합니다.")
    public ResponseEntity getBusinessProfile(@RequestParam("email") String email) throws IOException {
        return amazonS3Service.get("businessprofile", email);
    }

    @PostMapping("/gym/get")
    @ApiOperation(value = "체육관 이미지 출력", notes = "체육관 이미지를 AMAZON S3에서 출력합니다.")
    public ResponseEntity getGym(@RequestParam(value = "gymId") String gymId, @RequestParam("images") MultipartFile multipartFile) throws IOException {
        return amazonS3Service.get("gym", gymId);
    }

    /**
     * 파일 수정
     */
    //@PutMapping("/userprofile")

    /**
     파일 삭제
     */
//    @DeleteMapping("/userprofile")
//    @ApiOperation(value = "사용자 프로필 이미지 삭제", notes = "사용자 프로필 이미지를 AMAZON S3에서 삭제합니다.")
//    public String deleteUserProfile(@RequestParam("email") String email) throws IOException {
//        String url = "2a6bb495-3984-40d5-9ff5-75775a727e11emogi_se.jpg"; // 테이블 구축 전 임시로
//        log.info("url{}:", url);
//        amazonS3Service.delete("userprofile", url);
//        return "삭제 성공";
//    }
}
