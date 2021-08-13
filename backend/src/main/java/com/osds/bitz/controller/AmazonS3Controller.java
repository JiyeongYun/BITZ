package com.osds.bitz.controller;

import com.osds.bitz.model.enumclass.DirectoryName;
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
    @PostMapping("/upload/userprofile")
    @ApiOperation(value = "사용자 프로필 이미지 저장", notes = "사용자 프로필 이미지를 AMAZON S3에 저장합니다.")
    public ResponseEntity uploadUserProfile(@RequestParam(value = "email") String email, @RequestParam("images") MultipartFile multipartFile) throws IOException {
        amazonS3Service.upload(email, multipartFile, DirectoryName.userprofile);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/upload/businessauth")
    @ApiOperation(value = "사업자등록증 이미지 저장", notes = "사용자등록증 이미지를 AMAZON S3에 저장합니다.")
    public ResponseEntity uploadBusinessAuth(@RequestParam(value = "email") String email, @RequestParam("images") MultipartFile multipartFile) throws IOException {
        amazonS3Service.upload(email, multipartFile, DirectoryName.businessauth);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/upload/businessprofile")
    @ApiOperation(value = "사업자 프로필 이미지 저장", notes = "사업자 프로필 이미지를 AMAZON S3에 저장합니다.")
    public ResponseEntity uploadBusinessProfile(@RequestParam(value = "email") String email, @RequestParam("images") MultipartFile multipartFile) throws IOException {
        amazonS3Service.upload(email, multipartFile, DirectoryName.businessprofile);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/upload/gym")
    @ApiOperation(value = "체육관 이미지 저장", notes = "체육관 이미지를 AMAZON S3에 저장합니다.")
    public ResponseEntity uploadGym(@RequestParam(value = "gymId") String gymId, @RequestParam("images") MultipartFile multipartFile) throws IOException {
        amazonS3Service.upload(gymId, multipartFile, DirectoryName.gym);
        return new ResponseEntity(HttpStatus.OK);
    }

    /**
     * 파일 출력
     */
    @PostMapping("/get/userprofile")
    @ApiOperation(value = "사용자 프로필 이미지 출력", notes = "사용자 프로필 이미지를 AMAZON S3에서 출력합니다.")
    public ResponseEntity getUserProfile(@RequestParam("email") String email) throws IOException {
        return amazonS3Service.get(DirectoryName.userprofile, email);
    }

    @PostMapping("/get/businessauth")
    @ApiOperation(value = "사업자등록증 이미지 출력", notes = "사업자등록증 이미지를 AMAZON S3에서 출력합니다.")
    public ResponseEntity getBusinessAuth(@RequestParam("email") String email) throws IOException {
        return amazonS3Service.get(DirectoryName.businessauth, email);
    }

    @PostMapping("/get/businessprofile")
    @ApiOperation(value = "사업자 프로필 이미지 출력", notes = "사업자 프로필 이미지를 AMAZON S3에서 출력합니다.")
    public ResponseEntity getBusinessProfile(@RequestParam("email") String email) throws IOException {
        return amazonS3Service.get(DirectoryName.businessprofile, email);
    }

    @PostMapping("/get/gym")
    @ApiOperation(value = "체육관 이미지 출력", notes = "체육관 이미지를 AMAZON S3에서 출력합니다.")
    public ResponseEntity getGym(@RequestParam(value = "gymId") String gymId) throws IOException {
        return amazonS3Service.get(DirectoryName.gym, gymId);
    }

    /**
     * 파일 수정
     */
    @PutMapping("/update/userprofile")
    @ApiOperation(value = "사용자 프로필 이미지 수정", notes = "사용자 프로필 이미지를 AMAZON S3에서 수정합니다.")
    public ResponseEntity updateUserProfile(@RequestParam(value = "email") String email, @RequestParam("images") MultipartFile multipartFile) throws IOException {
        amazonS3Service.update(DirectoryName.userprofile, multipartFile, email);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/update/businessauth")
    @ApiOperation(value = "사업자등록증 이미지 수정", notes = "사업자등록증 이미지를 AMAZON S3에서 수정합니다.")
    public ResponseEntity updateBusinessAuth(@RequestParam(value = "email") String email, @RequestParam("images") MultipartFile multipartFile) throws IOException {
        amazonS3Service.update(DirectoryName.businessauth, multipartFile, email);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/update/businessprofile")
    @ApiOperation(value = "사업자 프로필 이미지 수정", notes = "사업자 프로필 이미지를 AMAZON S3에서 수정합니다.")
    public ResponseEntity updateBusinessProfile(@RequestParam(value = "email") String email, @RequestParam("images") MultipartFile multipartFile) throws IOException {
        amazonS3Service.update(DirectoryName.businessprofile, multipartFile, email);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/update/gym")
    @ApiOperation(value = "체육관 이미지 수정", notes = "체육관 이미지를 AMAZON S3에서 수정합니다.")
    public ResponseEntity updateGym(@RequestParam(value = "gymId") String gymId, @RequestParam("images") MultipartFile multipartFile) throws IOException {
        amazonS3Service.update(DirectoryName.gym, multipartFile, gymId);
        return new ResponseEntity(HttpStatus.OK);
    }

    /**
     * 파일 삭제
     */
    @DeleteMapping("/delete/userprofile")
    @ApiOperation(value = "사용자 프로필 이미지 삭제", notes = "사용자 프로필 이미지를 AMAZON S3에서 삭제합니다.")
    public ResponseEntity deleteUserProfile(@RequestParam("email") String email) {
        amazonS3Service.delete(DirectoryName.userprofile, email);
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/delete/businessauth")
    @ApiOperation(value = "사업자등록증 이미지 삭제", notes = "사용자등록증 이미지를 AMAZON S3에서 삭제합니다.")
    public ResponseEntity deleteBusinessAuth(@RequestParam("email") String email) {
        amazonS3Service.delete(DirectoryName.businessauth, email);
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/delete/businessprofile")
    @ApiOperation(value = "사업자 프로필 이미지 삭제", notes = "사업자 프로필 이미지를 AMAZON S3에서 삭제합니다.")
    public ResponseEntity deleteBusinessProfile(@RequestParam("email") String email) {
        amazonS3Service.delete(DirectoryName.businessprofile, email);
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/delete/gym")
    @ApiOperation(value = "체육관 이미지 삭제", notes = "체육관 이미지를 AMAZON S3에서 삭제합니다.")
    public ResponseEntity deleteGym(@RequestParam("gymId") String gymId) {
        amazonS3Service.delete(DirectoryName.gym, gymId);
        return new ResponseEntity(HttpStatus.OK);
    }
}
