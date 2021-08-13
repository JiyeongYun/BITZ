package com.osds.bitz.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;

import com.osds.bitz.model.entity.account.business.BusinessAuth;
import com.osds.bitz.model.entity.account.business.BusinessProfile;
import com.osds.bitz.model.entity.account.user.UserAuth;
import com.osds.bitz.model.entity.account.user.UserProfile;
import com.osds.bitz.model.entity.gym.Gym;
import com.osds.bitz.model.entity.img.BusinessProfileImage;
import com.osds.bitz.model.entity.img.BusinessRegistrationImage;
import com.osds.bitz.model.entity.img.GymImage;
import com.osds.bitz.model.entity.img.UserProfileImage;
import com.osds.bitz.repository.account.business.BusinessAuthRepository;
import com.osds.bitz.repository.account.business.BusinessProfileRepository;
import com.osds.bitz.repository.account.user.UserAuthRepository;
import com.osds.bitz.repository.gym.GymRepository;
import com.osds.bitz.repository.img.BusinessProfileImageRepository;
import com.osds.bitz.repository.img.BusinessRegistrationImageRepository;
import com.osds.bitz.repository.img.GymImageRepository;
import com.osds.bitz.repository.img.UserProfileImageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class AmazonS3Service {

    private final AmazonS3Client amazonS3Client;

    @Autowired
    private BusinessProfileImageRepository businessProfileImageRepository;

    @Autowired
    private BusinessRegistrationImageRepository businessRegistrationImageRepository;

    @Autowired
    private GymImageRepository gymImageRepository;

    @Autowired
    private UserProfileImageRepository userProfileImageRepository;

    @Autowired
    private UserAuthRepository userAuthRepository;

    @Autowired
    private BusinessAuthRepository businessAuthRepository;

    @Autowired
    private GymRepository gymRepository;

    @Autowired
    private BusinessProfileRepository businessProfileRepository;

    @Value("${cloud.aws.s3.bucket}")
    public String bucket;  // S3 버킷 이름

    /**
     * 파일 업로드
     */
    // MultipartFile을 File객체로 변환
    public void upload(String idxKey, MultipartFile multipartFile, String dirName) throws IOException {
        File uploadFile = convert(multipartFile)  // 파일 변환할 수 없으면 에러
                .orElseThrow(() -> new IllegalArgumentException("error: MultipartFile -> File convert fail"));

        upload(idxKey, uploadFile, dirName);
    }

    // 로컬에 파일 업로드 하기
    private Optional<File> convert(MultipartFile file) throws IOException {
        File convertFile = new File(System.getProperty("user.dir") + "/" + file.getOriginalFilename());
        if (convertFile.createNewFile()) { // 바로 위에서 지정한 경로에 File이 생성됨 (경로가 잘못되었다면 생성 불가능)
            try (FileOutputStream fos = new FileOutputStream(convertFile)) { // FileOutputStream 데이터를 파일에 바이트 스트림으로 저장하기 위함
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }

    // S3로 파일 업로드
    private void upload(String idxKey, File uploadFile, String dirName) {
        String dbFileName = UUID.randomUUID() + uploadFile.getName();
        String fileName = dirName + "/" + dbFileName;   // S3에 저장된 파일 이름
        putS3(uploadFile, fileName); // s3로 업로드
        removeNewFile(uploadFile);

        // DB에 이미지 경로 저장
        createImage(dirName, idxKey, dbFileName);
    }

    // S3로 업로드
    private String putS3(File uploadFile, String fileName) {
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    // 로컬에 저장된 이미지 지우기
    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            log.info("File delete success");
            return;
        }
        log.info("File delete fail");
    }


    // userprofileimage db에 내용 채우기
    private void createImage(String dirName, String idxKey, String dbFileName) {

        if (dirName.equals("userprofile")) { // 유저 프로필 이미지
            // 이메일로 유저 객체 찾아오기
            UserAuth userAuth = this.userAuthRepository.getUserAuthByEmail(idxKey);

            // userprofileimage에 내용 채우기
            UserProfileImage userProfileImage = UserProfileImage.builder()
                    .userAuth(userAuth)
                    .url(dbFileName)
                    .build();
            this.userProfileImageRepository.save(userProfileImage);

        } else if (dirName.equals("businessauth")) { // 사업자등록증  이미지
            // 이메일로 사업자 객체 찾아오기
            BusinessAuth businessAuth = businessAuthRepository.getBusinessAuthByEmail(idxKey);

            // businessregistrationimage에 내용 채우기
            BusinessRegistrationImage businessRegistrationImage = BusinessRegistrationImage.builder()
                    .businessAuth(businessAuth)
                    .url(dbFileName)
                    .build();
            this.businessRegistrationImageRepository.save(businessRegistrationImage);
        } else if (dirName.equals("businessprofile")) { // 사업자 프로필 이미지
            // 이메일로 사업자 객체 찾아오기
            BusinessAuth businessAuth = businessAuthRepository.getBusinessAuthByEmail(idxKey);

            // businessprofileimage에 내용 채우기
            BusinessProfileImage businessProfileImage = BusinessProfileImage.builder()
                    .businessAuth(businessAuth)
                    .url(dbFileName)
                    .build();
            this.businessProfileImageRepository.save(businessProfileImage);
        } else { // 체육관 이미지
            // 체육관 아이디로 체육관 객체 찾아오기
            Gym gym = gymRepository.getGymById(Long.parseLong(idxKey));

            // gymimage에 내용 채우기
            GymImage gymImage = GymImage.builder()
                    .gym(gym)
                    .url(dbFileName)
                    .build();
            this.gymImageRepository.save(gymImage);
        }
    }

    /**
     * 파일 출력
     */
    public ResponseEntity<byte[]> get(String dirName, String idxKey) throws IOException {
        String fileName = "";

        if (dirName.equals("userprofile")) { // 유저 프로필 이미지
            // 이메일로 유저 정보 얻어오기
            UserAuth userAuth = this.userAuthRepository.getUserAuthByEmail(idxKey);

            // 유저 객체를 통해 파일 url 받아오기
            fileName = userProfileImageRepository.getUserProfileImageByUserAuth(userAuth).getUrl();

        } else if (dirName.equals("businessauth")) { // 사업자등록증  이미지
            // 이메일로 사업자 정보 얻어오기
            BusinessAuth businessAuth = this.businessAuthRepository.getBusinessAuthByEmail(idxKey);

            // 사업자 객체를 통해 파일 url 받아오기
            fileName = businessRegistrationImageRepository.getBusinessRegistrationImageByBusinessAuth(businessAuth).getUrl();
        } else if (dirName.equals("businessprofile")) { // 사업자 프로필 이미지
            // 이메일로 사업자 객체 얻어오기
            BusinessAuth businessAuth = this.businessAuthRepository.getBusinessAuthByEmail(idxKey);

            // 사업자 객체를 통해 파일 url 받아오기
            fileName = businessProfileImageRepository.getBusinessProfileImageByBusinessAuth(businessAuth).getUrl();
        } else { // 체육관 이미지
            // 체육관 아이디로 체육관 정보 얻어오기
            Gym gym = gymRepository.getGymById(Long.parseLong(idxKey));

            // 체육관 객체를 통해 파일 url 받아오기
            fileName = gymImageRepository.getGymImageByGym(gym).getUrl();
        }

        S3Object s3Object = amazonS3Client.getObject(new GetObjectRequest(bucket + "/" + dirName, fileName));
        S3ObjectInputStream s3ObjectInputStream = s3Object.getObjectContent();
        byte[] bytes = IOUtils.toByteArray(s3ObjectInputStream);

        String setfileName = URLEncoder.encode(fileName, "UTF-8").replaceAll("\\+", "%20");
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        httpHeaders.setContentLength(bytes.length);
        httpHeaders.setContentDispositionFormData("attachment", setfileName);

        return new ResponseEntity<>(bytes, httpHeaders, HttpStatus.OK);
    }

    /**
     파일 수정
     */

    /**
     * 파일 삭제
     */
//    public void delete(String dirName, String fileName) throws AmazonServiceException {
//        amazonS3Client.deleteObject(new DeleteObjectRequest(bucket + "/" + dirName, fileName));
//    }
}
